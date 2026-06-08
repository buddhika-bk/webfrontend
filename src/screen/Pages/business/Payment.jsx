import React, { useState, useEffect } from 'react';
import { packagesAPI } from '../../services/api';
import './Payment.css';

const fmt = n => new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', minimumFractionDigits: 0 }).format(n);

export default function Payment() {
  const [packages,   setPackages]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [payModal,   setPayModal]   = useState({ open: false, pkg: null, inv: null });
  const [txnId,      setTxnId]      = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast,      setToast]      = useState(null);

  const showToast = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 4000); };

  const load = async () => {
    try {
      setLoading(true);
      const res = await packagesAPI.getMyPackages();
      setPackages(res.data.packages || []);
    } catch {
      showToast('Failed to load invoices', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // Flatten all invoices from all packages
  const allInvoices = packages.flatMap(pkg =>
    (pkg.invoices || []).map(inv => ({ pkg, inv }))
  ).sort((a, b) => new Date(b.inv.createdAt || 0) - new Date(a.inv.createdAt || 0));

  const totalPaid    = allInvoices.filter(x => x.inv.status === 'paid').reduce((s, x) => s + (x.inv.amount || 0), 0);
  const totalPending = allInvoices.filter(x => x.inv.status === 'pending').reduce((s, x) => s + (x.inv.amount || 0), 0);
  const totalOverdue = allInvoices.filter(x => x.inv.status === 'overdue').reduce((s, x) => s + (x.inv.amount || 0), 0);

  const handleSubmitPayment = async () => {
    if (!txnId.trim()) { showToast('Please enter your transaction reference number', 'error'); return; }
    try {
      setSubmitting(true);
      await packagesAPI.submitPayRef(payModal.pkg._id, {
        invoiceId: payModal.inv._id,
        transactionId: txnId
      });
      showToast('Payment reference submitted! Our team will verify and confirm within 24 hours.');
      setPayModal({ open: false, pkg: null, inv: null });
      setTxnId('');
      load();
    } catch {
      showToast('Submission failed. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const statusMap = {
    paid:    { label: 'Paid',    color: '#10b981', bg: '#ecfdf5' },
    pending: { label: 'Pending', color: '#f59e0b', bg: '#fffbeb' },
    overdue: { label: 'Overdue', color: '#ef4444', bg: '#fef2f2' },
  };

  if (loading) return (
    <div className="pay-loading"><div className="pay-spinner" /><p>Loading invoices…</p></div>
  );

  return (
    <div className="pay-root">
      {toast && (
        <div className={`pay-toast pay-toast--${toast.type}`}>
          <span>{toast.type === 'success' ? '✓' : '✕'}</span>{toast.msg}
        </div>
      )}

      <div className="pay-page-head">
        <h1 className="pay-title">Payments & Invoices</h1>
        <p className="pay-sub">Manage your payments and view transaction history</p>
      </div>

      {/* Stats */}
      <div className="pay-stats">
        {[
          { label: 'Total Paid',    val: fmt(totalPaid),    color: '#10b981', bg: '#ecfdf5', icon: '✓' },
          { label: 'Pending',       val: fmt(totalPending), color: '#f59e0b', bg: '#fffbeb', icon: '⏳' },
          { label: 'Overdue',       val: fmt(totalOverdue), color: '#ef4444', bg: '#fef2f2', icon: '⚠' },
          { label: 'Total Invoices',val: allInvoices.length, color: '#0ea5e9', bg: '#f0f9ff', icon: '📋' },
        ].map((s, i) => (
          <div className="pay-stat" key={i} style={{ '--acc': s.color, '--sbg': s.bg }}>
            <div className="pay-stat-icon">{s.icon}</div>
            <div>
              <p className="pay-stat-label">{s.label}</p>
              <p className="pay-stat-val">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      {allInvoices.length === 0 ? (
        <div className="pay-empty">
          <span>💳</span>
          <h3>No invoices yet</h3>
          <p>Invoices from your service packages will appear here.</p>
        </div>
      ) : (
        <div className="pay-table-wrap">
          <table className="pay-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Package</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allInvoices.map(({ pkg, inv }) => {
                const s = statusMap[inv.status] || statusMap.pending;
                return (
                  <tr key={inv._id}>
                    <td className="pay-td-em">{inv.invoiceNo}</td>
                    <td style={{ fontSize: '.82rem', color: '#64748b' }}>{pkg.title}</td>
                    <td>{inv.description || '—'}</td>
                    <td style={{ fontWeight: 700, color: '#0ea5e9' }}>{fmt(inv.amount)}</td>
                    <td style={{ fontSize: '.82rem' }}>{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : '—'}</td>
                    <td>
                      <span className="pay-status-badge" style={{ color: s.color, background: s.bg }}>{s.label}</span>
                      {inv.transactionId && inv.status !== 'paid' && (
                        <div style={{ fontSize: '.72rem', color: '#94a3b8', marginTop: 2 }}>Ref submitted</div>
                      )}
                    </td>
                    <td>
                      {(inv.status === 'pending' || inv.status === 'overdue') && !inv.transactionId && (
                        <button className="pay-now-btn" onClick={() => setPayModal({ open: true, pkg, inv })}>
                          Pay Now
                        </button>
                      )}
                      {inv.status === 'paid' && (
                        <span style={{ fontSize: '.78rem', color: '#10b981', fontWeight: 600 }}>
                          {inv.transactionId ? `TXN: ${inv.transactionId}` : 'Confirmed'}
                        </span>
                      )}
                      {inv.transactionId && inv.status !== 'paid' && (
                        <span style={{ fontSize: '.78rem', color: '#f59e0b', fontWeight: 600 }}>Pending Verification</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Pay Modal */}
      {payModal.open && payModal.inv && (
        <div className="pay-overlay" onClick={() => setPayModal({ open: false, pkg: null, inv: null })}>
          <div className="pay-modal" onClick={e => e.stopPropagation()}>
            <div className="pay-modal-head">
              <h2>Make Payment</h2>
              <button onClick={() => setPayModal({ open: false, pkg: null, inv: null })}>✕</button>
            </div>
            <div className="pay-modal-body">
              {/* Invoice summary */}
              <div className="pay-summary">
                <div className="pay-sum-row"><span>Invoice</span><strong>{payModal.inv.invoiceNo}</strong></div>
                <div className="pay-sum-row"><span>Package</span><strong>{payModal.pkg.title}</strong></div>
                {payModal.inv.description && <div className="pay-sum-row"><span>Description</span><strong>{payModal.inv.description}</strong></div>}
                <div className="pay-sum-row"><span>Amount</span><strong style={{ color: '#0ea5e9', fontSize: '1.1rem' }}>{fmt(payModal.inv.amount)}</strong></div>
                {payModal.inv.dueDate && <div className="pay-sum-row"><span>Due Date</span><strong>{new Date(payModal.inv.dueDate).toLocaleDateString()}</strong></div>}
              </div>

              {/* Bank details */}
              <div className="pay-method-label">
                <span>🏦</span> Bank Transfer Details
              </div>
              <div className="pay-bank-box">
                <div className="pay-bank-row"><span>Bank</span><strong>Commercial Bank of Ceylon</strong></div>
                <div className="pay-bank-row"><span>Account Name</span><strong>WebPoint Solutions (Pvt) Ltd</strong></div>
                <div className="pay-bank-row"><span>Account No.</span><strong>1234567890</strong></div>
                <div className="pay-bank-row"><span>Branch</span><strong>Colombo Main</strong></div>
                <div className="pay-bank-row"><span>Reference</span><strong style={{ color: '#0ea5e9' }}>{payModal.inv.invoiceNo}</strong></div>
              </div>

              <div className="pay-info-note">
                💡 Please use <strong>{payModal.inv.invoiceNo}</strong> as the transfer reference. After completing the transfer, enter your transaction reference below.
              </div>

              {/* TXN input */}
              <div className="pay-txn-field">
                <label>Transaction Reference / Receipt Number *</label>
                <input type="text" value={txnId} onChange={e => setTxnId(e.target.value)}
                  placeholder="e.g. TRX123456789 or online transfer reference" />
                <p className="pay-txn-hint">Enter the reference from your bank transfer slip or online banking</p>
              </div>
            </div>
            <div className="pay-modal-foot">
              <button className="pay-cancel-btn" onClick={() => setPayModal({ open: false, pkg: null, inv: null })}>Cancel</button>
              <button className="pay-confirm-btn" onClick={handleSubmitPayment} disabled={submitting}>
                {submitting ? <span className="pay-spinner-sm" /> : 'Submit Payment Reference'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}