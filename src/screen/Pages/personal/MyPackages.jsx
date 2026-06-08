import React, { useState, useEffect, useRef } from 'react';
import { packagesAPI } from '../../services/api';
import './MyPackages.css';

const STATUS_MAP = {
  active:       { label: 'Active',       color: '#10b981', bg: '#ecfdf5' },
  'in-progress':{ label: 'In Progress',  color: '#0ea5e9', bg: '#e0f2fe' },
  pending:      { label: 'Pending',      color: '#f59e0b', bg: '#fffbeb' },
  completed:    { label: 'Completed',    color: '#8b5cf6', bg: '#f5f3ff' },
  expired:      { label: 'Expired',      color: '#ef4444', bg: '#fef2f2' },
  cancelled:    { label: 'Cancelled',    color: '#64748b', bg: '#f1f5f9' },
};

const CAT_ICONS = {
  pos:'🛒', website:'🌐', software:'💻', marketing:'📱',
  financial:'💰', design:'🎨', cloud:'☁️', consulting:'🎯', other:'📦'
};

export default function MyPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState(null);
  const [payModal, setPayModal] = useState({ open: false, pkg: null, inv: null });
  const [agModal, setAgModal]   = useState({ open: false, pkg: null, ag: null });
  const [toast, setToast]       = useState(null);
  const [txnId, setTxnId]       = useState('');
  const [sigType, setSigType]   = useState('digital');
  const [digitalSig, setDigitalSig] = useState('');
  const [sigFile, setSigFile]   = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [agAction, setAgAction] = useState('confirm');
  const canvasRef               = useRef(null);
  const [drawing, setDrawing]   = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      setLoading(true);
      const res = await packagesAPI.getMyPackages();
      setPackages(res.data.packages || []);
    } catch {
      showToast('Failed to load packages', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Canvas drawing for digital signature
  const startDraw = (e) => {
    setDrawing(true);
    const c = canvasRef.current;
    const rect = c.getBoundingClientRect();
    const ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!drawing) return;
    const c = canvasRef.current;
    const rect = c.getBoundingClientRect();
    const ctx = c.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#0f172a';
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const endDraw = () => {
    setDrawing(false);
    if (canvasRef.current) setDigitalSig(canvasRef.current.toDataURL());
  };

  const clearCanvas = () => {
    const c = canvasRef.current;
    if (c) { c.getContext('2d').clearRect(0, 0, c.width, c.height); setDigitalSig(''); }
  };

  const handleAgreementSubmit = async () => {
    if (!agModal.ag || !agModal.pkg) return;
    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append('agreementId', agModal.ag._id);
      fd.append('action', agAction);

      if (agAction === 'reject') {
        fd.append('rejectionReason', rejectReason);
      } else {
        fd.append('signatureType', sigType);
        if (sigType === 'digital') {
          if (!digitalSig) { showToast('Please draw your signature', 'error'); setSubmitting(false); return; }
          fd.append('signatureData', digitalSig);
        } else {
          if (!sigFile) { showToast('Please upload a signature image', 'error'); setSubmitting(false); return; }
          fd.append('signature', sigFile);
        }
      }

      await packagesAPI.signAgreement(agModal.pkg._id, fd);
      showToast(agAction === 'reject' ? 'Agreement rejected' : 'Agreement signed successfully!');
      setAgModal({ open: false, pkg: null, ag: null });
      load();
    } catch {
      showToast('Action failed. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePaymentSubmit = async () => {
    if (!txnId.trim()) { showToast('Please enter your transaction reference', 'error'); return; }
    try {
      setSubmitting(true);
      await packagesAPI.confirmPayment(payModal.pkg._id, {
        invoiceId: payModal.inv._id,
        transactionId: txnId,
        paymentMethod: 'bank_transfer'
      });
      showToast('Payment details submitted. Our team will verify and confirm.');
      setPayModal({ open: false, pkg: null, inv: null });
      setTxnId('');
      load();
    } catch {
      showToast('Submission failed. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="mp-loading">
      <div className="mp-spinner" />
      <p>Loading your packages…</p>
    </div>
  );

  return (
    <div className="mp-root">
      {/* Toast */}
      {toast && (
        <div className={`mp-toast mp-toast--${toast.type}`}>
          <span>{toast.type === 'success' ? '✓' : '✕'}</span>
          {toast.msg}
        </div>
      )}

      <div className="mp-page-head">
        <div>
          <h1 className="mp-title">My Packages</h1>
          <p className="mp-sub">Track and manage your service packages</p>
        </div>
        <span className="mp-count-badge">{packages.filter(p=>['active','in-progress'].includes(p.status)).length} active</span>
      </div>

      {packages.length === 0 ? (
        <div className="mp-empty">
          <span className="mp-empty-icon">📦</span>
          <h3>No packages yet</h3>
          <p>Contact WebPoint Support to subscribe to a service package.</p>
        </div>
      ) : (
        <div className="mp-list">
          {packages.map((pkg, i) => {
            const s = STATUS_MAP[pkg.status] || STATUS_MAP.pending;
            const pendingInv = pkg.invoices?.filter(iv=>iv.status==='pending'||iv.status==='overdue') || [];
            const pendingAg  = pkg.agreements?.filter(ag=>ag.status==='pending') || [];
            return (
              <div className="mp-card" key={pkg._id} style={{ animationDelay:`${i*.07}s` }}>
                {/* Header */}
                <div className="mp-card-top">
                  <div className="mp-cat-icon">{CAT_ICONS[pkg.category]||'📦'}</div>
                  <div className="mp-card-info">
                    <h3 className="mp-card-name">{pkg.title}</h3>
                    {pkg.description && <p className="mp-card-desc">{pkg.description}</p>}
                    <span className="mp-status-badge" style={{color:s.color,background:s.bg}}>{s.label}</span>
                  </div>
                  <div className="mp-circle-wrap">
                    <svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.9" fill="none" stroke="#f1f5f9" strokeWidth="3"/>
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke={s.color} strokeWidth="3"
                        strokeDasharray={`${pkg.progress} ${100-pkg.progress}`} strokeDashoffset="25" strokeLinecap="round"/>
                    </svg>
                    <span className="mp-circle-pct">{pkg.progress}%</span>
                  </div>
                </div>

                {/* Alerts */}
                {pendingInv.length > 0 && (
                  <div className="mp-strip mp-strip--warn">⚠️ {pendingInv.length} unpaid invoice{pendingInv.length>1?'s':''}</div>
                )}
                {pendingAg.length > 0 && (
                  <div className="mp-strip mp-strip--info">📋 {pendingAg.length} agreement{pendingAg.length>1?'s':''} awaiting your signature</div>
                )}

                {/* Dates / Price */}
                <div className="mp-meta-row">
                  <div className="mp-meta-item">
                    <span className="mp-meta-label">Price</span>
                    <span className="mp-meta-val" style={{color:'#0ea5e9',fontWeight:700}}>
                      {pkg.price?.currency||'LKR'} {(pkg.price?.amount||0).toLocaleString()}
                    </span>
                  </div>
                  {pkg.startDate && (
                    <div className="mp-meta-item">
                      <span className="mp-meta-label">Start</span>
                      <span className="mp-meta-val">{new Date(pkg.startDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
                    </div>
                  )}
                  {pkg.expiryDate && (
                    <div className="mp-meta-item">
                      <span className="mp-meta-label">Expires</span>
                      <span className="mp-meta-val">{new Date(pkg.expiryDate).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="mp-bar-row">
                  <div className="mp-bar-track"><div className="mp-bar-fill" style={{width:`${pkg.progress}%`,background:s.color}}/></div>
                  <span className="mp-bar-label">{pkg.progress}%</span>
                </div>

                {/* Features */}
                {pkg.features?.length > 0 && (
                  <div className="mp-features-wrap">
                    {pkg.features.slice(0,3).map((f,j)=><span key={j} className="mp-feat-tag">✓ {f}</span>)}
                    {pkg.features.length>3 && <span className="mp-feat-more">+{pkg.features.length-3}</span>}
                  </div>
                )}

                {/* Actions */}
                <div className="mp-actions">
                  <button className="mp-btn mp-btn--outline" onClick={()=>setSelected(pkg)}>View Details</button>
                  {pendingInv.length>0 && (
                    <button className="mp-btn mp-btn--pay" onClick={()=>setPayModal({open:true,pkg,inv:pendingInv[0]})}>Pay Invoice</button>
                  )}
                  {pendingAg.length>0 && (
                    <button className="mp-btn mp-btn--sign" onClick={()=>{setAgModal({open:true,pkg,ag:pendingAg[0]});setAgAction('confirm');setSigType('digital');setDigitalSig('');setSigFile(null);}}>
                      Sign Agreement
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="mp-overlay" onClick={()=>setSelected(null)}>
          <div className="mp-modal" onClick={e=>e.stopPropagation()}>
            <div className="mp-modal-head">
              <h2>{selected.title}</h2>
              <button className="mp-modal-close" onClick={()=>setSelected(null)}>✕</button>
            </div>
            <div className="mp-modal-body">
              {/* Progress */}
              <div className="mp-ms"><h3>Progress</h3>
                <div className="mp-modal-bar-wrap">
                  <div className="mp-modal-bar"><div style={{width:`${selected.progress}%`,height:'100%',background:'#0ea5e9',borderRadius:8,transition:'width .6s'}}/></div>
                  <span style={{fontWeight:700,color:'#0ea5e9'}}>{selected.progress}%</span>
                </div>
                {selected.progressNotes?.slice(-3).map((n,i)=>(
                  <div key={i} className="mp-update-item">
                    <span className="mp-update-dot">✓</span>
                    <div><p className="mp-update-text">{n.note}</p><span className="mp-update-time">{new Date(n.updatedAt).toLocaleDateString()}</span></div>
                  </div>
                ))}
              </div>

              {/* Tasks */}
              {selected.tasks?.length>0 && (
                <div className="mp-ms"><h3>Tasks</h3>
                  {selected.tasks.map((t,i)=>(
                    <div key={i} className="mp-task-item">
                      <div className="mp-task-row"><span>{t.name}</span><span style={{color:'#0ea5e9',fontWeight:600}}>{t.completed}%</span></div>
                      <div className="mp-task-bar"><div style={{width:`${t.completed}%`,height:'100%',background:'linear-gradient(90deg,#0ea5e9,#0369a1)',borderRadius:4}}/></div>
                    </div>
                  ))}
                </div>
              )}

              {/* Invoices */}
              {selected.invoices?.length>0 && (
                <div className="mp-ms"><h3>Invoices</h3>
                  {selected.invoices.map((inv,i)=>(
                    <div key={i} className="mp-inv-row">
                      <div><span className="mp-inv-no">{inv.invoiceNo}</span>{inv.dueDate&&<span className="mp-inv-due">Due {new Date(inv.dueDate).toLocaleDateString()}</span>}</div>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <span style={{fontWeight:700,color:'#0ea5e9'}}>LKR {inv.amount?.toLocaleString()}</span>
                        <span className={`mp-inv-status mp-inv-status--${inv.status}`}>{inv.status}</span>
                        {(inv.status==='pending'||inv.status==='overdue')&&(
                          <button className="mp-btn-sm" onClick={()=>setPayModal({open:true,pkg:selected,inv})}>Pay</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Agreements */}
              {selected.agreements?.length>0 && (
                <div className="mp-ms"><h3>Agreements</h3>
                  {selected.agreements.map((ag,i)=>(
                    <div key={i} className="mp-ag-row">
                      <div><span className="mp-ag-title">{ag.title}</span><span className={`mp-ag-status mp-ag-status--${ag.status}`}>{ag.status}</span></div>
                      <div style={{display:'flex',gap:8}}>
                        {ag.fileUrl && <a href={`${import.meta.env.VITE_API_URL?.replace('/api','')||'http://localhost:3000'}${ag.fileUrl}`} target="_blank" rel="noreferrer" className="mp-btn-sm">View</a>}
                        {ag.status==='pending' && (
                          <button className="mp-btn-sm mp-btn-sm--primary" onClick={()=>{setAgModal({open:true,pkg:selected,ag});setAgAction('confirm');setSigType('digital');setDigitalSig('');setSigFile(null);}}>
                            Sign / Respond
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Recent Updates */}
              {selected.recentUpdates?.length>0 && (
                <div className="mp-ms"><h3>Recent Updates</h3>
                  {selected.recentUpdates.map((u,i)=><div key={i} className="mp-update-item"><span className="mp-update-dot">✓</span><p className="mp-update-text">{u}</p></div>)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Agreement Modal */}
      {agModal.open && agModal.ag && (
        <div className="mp-overlay" onClick={()=>setAgModal({open:false,pkg:null,ag:null})}>
          <div className="mp-modal mp-modal--lg" onClick={e=>e.stopPropagation()}>
            <div className="mp-modal-head">
              <h2>Agreement: {agModal.ag.title}</h2>
              <button className="mp-modal-close" onClick={()=>setAgModal({open:false,pkg:null,ag:null})}>✕</button>
            </div>
            <div className="mp-modal-body">
              {agModal.ag.description && <p className="mp-ag-desc">{agModal.ag.description}</p>}

              {agModal.ag.terms?.length>0 && (
                <div className="mp-ms"><h3>Terms & Conditions</h3>
                  {agModal.ag.terms.map((t,i)=><div key={i} className="mp-term-item"><span className="mp-update-dot">✓</span><span>{t}</span></div>)}
                </div>
              )}

              {agModal.ag.fileUrl && (
                <div className="mp-ms">
                  <a href={`${import.meta.env.VITE_API_URL?.replace('/api','')||'http://localhost:3000'}${agModal.ag.fileUrl}`} target="_blank" rel="noreferrer" className="mp-btn mp-btn--outline" style={{display:'inline-block',marginBottom:0}}>
                    📄 View Agreement Document
                  </a>
                </div>
              )}

              {/* Action selector */}
              <div className="mp-ms">
                <h3>Your Response</h3>
                <div className="mp-action-tabs">
                  <button className={`mp-action-tab ${agAction==='confirm'?'active':''}`} onClick={()=>setAgAction('confirm')}>✓ Confirm & Sign</button>
                  <button className={`mp-action-tab mp-action-tab--reject ${agAction==='reject'?'active':''}`} onClick={()=>setAgAction('reject')}>✕ Reject</button>
                </div>
              </div>

              {agAction==='confirm' && (
                <div className="mp-ms">
                  <h3>Your Signature</h3>
                  <div className="mp-sig-tabs">
                    <button className={`mp-sig-tab ${sigType==='digital'?'active':''}`} onClick={()=>setSigType('digital')}>Draw Signature</button>
                    <button className={`mp-sig-tab ${sigType==='image'?'active':''}`} onClick={()=>setSigType('image')}>Upload Image</button>
                  </div>

                  {sigType==='digital' && (
                    <div className="mp-canvas-wrap">
                      <p className="mp-canvas-hint">Draw your signature in the box below</p>
                      <canvas ref={canvasRef} width={480} height={160} className="mp-canvas"
                        onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
                        onTouchStart={e=>{e.preventDefault();const t=e.touches[0];startDraw(t);}}
                        onTouchMove={e=>{e.preventDefault();const t=e.touches[0];draw(t);}}
                        onTouchEnd={endDraw}
                      />
                      <button className="mp-btn-sm" onClick={clearCanvas}>Clear</button>
                    </div>
                  )}

                  {sigType==='image' && (
                    <div className="mp-upload-wrap">
                      <label className="mp-file-label">
                        📎 {sigFile?sigFile.name:'Upload Signature Image (PNG/JPG)'}
                        <input type="file" accept="image/*" style={{display:'none'}} onChange={e=>setSigFile(e.target.files[0])}/>
                      </label>
                    </div>
                  )}
                </div>
              )}

              {agAction==='reject' && (
                <div className="mp-ms">
                  <h3>Reason for Rejection</h3>
                  <textarea className="mp-textarea" value={rejectReason} onChange={e=>setRejectReason(e.target.value)}
                    placeholder="Please provide a reason for rejecting this agreement…" rows={4}/>
                </div>
              )}
            </div>
            <div className="mp-modal-foot">
              <button className="mp-btn mp-btn--outline" onClick={()=>setAgModal({open:false,pkg:null,ag:null})}>Cancel</button>
              <button
                className={`mp-btn ${agAction==='reject'?'mp-btn--danger':'mp-btn--primary'}`}
                onClick={handleAgreementSubmit} disabled={submitting}
              >
                {submitting ? <span className="mp-spinner-sm"/> : agAction==='reject' ? 'Reject Agreement' : 'Submit Signature'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pay Modal */}
      {payModal.open && payModal.inv && (
        <div className="mp-overlay" onClick={()=>setPayModal({open:false,pkg:null,inv:null})}>
          <div className="mp-modal mp-modal--sm" onClick={e=>e.stopPropagation()}>
            <div className="mp-modal-head">
              <h2>Make Payment</h2>
              <button className="mp-modal-close" onClick={()=>setPayModal({open:false,pkg:null,inv:null})}>✕</button>
            </div>
            <div className="mp-modal-body">
              <div className="mp-pay-summary">
                <div className="mp-pay-row"><span>Invoice</span><strong>{payModal.inv.invoiceNo}</strong></div>
                <div className="mp-pay-row"><span>Description</span><strong>{payModal.inv.description||payModal.pkg.title}</strong></div>
                <div className="mp-pay-row"><span>Amount</span><strong style={{color:'#0ea5e9',fontSize:'1.1rem'}}>LKR {payModal.inv.amount?.toLocaleString()}</strong></div>
                {payModal.inv.dueDate && <div className="mp-pay-row"><span>Due Date</span><strong>{new Date(payModal.inv.dueDate).toLocaleDateString()}</strong></div>}
              </div>

              <div className="mp-bank-box">
                <p className="mp-bank-title">🏦 Bank Transfer Details</p>
                <div className="mp-bank-row"><span>Bank</span><strong>Commercial Bank of Ceylon</strong></div>
                <div className="mp-bank-row"><span>Account Name</span><strong>WebPoint Solutions (Pvt) Ltd</strong></div>
                <div className="mp-bank-row"><span>Account No.</span><strong>1234567890</strong></div>
                <div className="mp-bank-row"><span>Reference</span><strong style={{color:'#0ea5e9'}}>{payModal.inv.invoiceNo}</strong></div>
              </div>

              <div className="mp-txn-field">
                <label>Transaction Reference / Receipt Number *</label>
                <input type="text" value={txnId} onChange={e=>setTxnId(e.target.value)} placeholder="e.g. TRX123456789"/>
                <p className="mp-txn-hint">Enter the reference number from your bank transfer receipt</p>
              </div>
            </div>
            <div className="mp-modal-foot">
              <button className="mp-btn mp-btn--outline" onClick={()=>setPayModal({open:false,pkg:null,inv:null})}>Cancel</button>
              <button className="mp-btn mp-btn--primary" onClick={handlePaymentSubmit} disabled={submitting}>
                {submitting?<span className="mp-spinner-sm"/>:'Confirm Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}