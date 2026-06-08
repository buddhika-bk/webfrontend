import React, { useState, useEffect, useRef } from 'react';
import { packagesAPI, getServerUrl } from '../../services/api';
import './Agreement.css';

export default function Agreement() {
  const [packages,   setPackages]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [selected,   setSelected]   = useState(null); // { pkg, ag }
  const [modal,      setModal]      = useState(null); // 'view' | 'sign'
  const [agAction,   setAgAction]   = useState('confirm');
  const [sigType,    setSigType]    = useState('digital');
  const [sigFile,    setSigFile]    = useState(null);
  const [rejectNote, setRejectNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast,      setToast]      = useState(null);
  const canvasRef                   = useRef(null);
  const [drawing,    setDrawing]    = useState(false);
  const [hasSig,     setHasSig]     = useState(false);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const load = async () => {
    try {
      setLoading(true);
      const res = await packagesAPI.getMyPackages();
      setPackages(res.data.packages || []);
    } catch {
      showToast('Failed to load agreements', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // Collect all agreements across packages
  const allAgreements = packages.flatMap(pkg =>
    (pkg.agreements || []).map(ag => ({ pkg, ag }))
  );

  const counts = {
    total:     allAgreements.length,
    pending:   allAgreements.filter(x => x.ag.status === 'pending').length,
    confirmed: allAgreements.filter(x => x.ag.status === 'confirmed').length,
    rejected:  allAgreements.filter(x => x.ag.status === 'rejected').length,
  };

  // Canvas drawing
  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const startDraw = e => {
    e.preventDefault();
    setDrawing(true);
    const c = canvasRef.current;
    const { x, y } = getPos(e, c);
    c.getContext('2d').beginPath();
    c.getContext('2d').moveTo(x, y);
  };

  const draw = e => {
    e.preventDefault();
    if (!drawing) return;
    const c = canvasRef.current;
    const ctx = c.getContext('2d');
    const { x, y } = getPos(e, c);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#0f172a';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSig(true);
  };

  const endDraw = e => { e.preventDefault(); setDrawing(false); };

  const clearCanvas = () => {
    const c = canvasRef.current;
    if (c) { c.getContext('2d').clearRect(0, 0, c.width, c.height); setHasSig(false); }
  };

  const openSign = (pkg, ag) => {
    setSelected({ pkg, ag });
    setAgAction('confirm');
    setSigType('digital');
    setSigFile(null);
    setRejectNote('');
    setHasSig(false);
    setModal('sign');
    // Clear canvas after render
    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }, 100);
  };

  const handleSubmit = async () => {
    if (!selected) return;
    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append('agreementId', selected.ag._id);
      fd.append('action', agAction);

      if (agAction === 'reject') {
        if (!rejectNote.trim()) { showToast('Please provide a reason', 'error'); setSubmitting(false); return; }
        fd.append('rejectionReason', rejectNote);
      } else {
        fd.append('signatureType', sigType);
        if (sigType === 'digital') {
          if (!hasSig) { showToast('Please draw your signature', 'error'); setSubmitting(false); return; }
          fd.append('signatureData', canvasRef.current.toDataURL());
        } else {
          if (!sigFile) { showToast('Please upload a signature image', 'error'); setSubmitting(false); return; }
          fd.append('signature', sigFile);
        }
      }

      await packagesAPI.respondAgreement(selected.pkg._id, fd);
      showToast(agAction === 'reject' ? 'Agreement rejected' : 'Agreement signed successfully!');
      setModal(null);
      load();
    } catch {
      showToast('Action failed. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const downloadAgreement = (pkg, ag) => {
    const text = `AGREEMENT\n=========\nTitle: ${ag.title}\nPackage: ${pkg.title}\nStatus: ${ag.status}\nSigned: ${ag.signedAt ? new Date(ag.signedAt).toLocaleDateString() : 'Pending'}\nExpiry: ${ag.expiryDate ? new Date(ag.expiryDate).toLocaleDateString() : 'N/A'}\n\nDescription:\n${ag.description || ''}\n\nTerms:\n${(ag.terms || []).map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\nWebPoint POS — webpoint.lk\nsupport@webpoint.lk`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `${(ag.title || 'agreement').replace(/\s/g, '_')}.txt`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  const statusMap = {
    pending:   { label: 'Pending Signature', color: '#f59e0b', bg: '#fffbeb' },
    confirmed: { label: 'Confirmed',         color: '#10b981', bg: '#ecfdf5' },
    rejected:  { label: 'Rejected',          color: '#ef4444', bg: '#fef2f2' },
  };

  if (loading) return (
    <div className="ag-loading"><div className="ag-spinner" /><p>Loading agreements…</p></div>
  );

  return (
    <div className="ag-root">
      {toast && (
        <div className={`ag-toast ag-toast--${toast.type}`}>
          <span>{toast.type === 'success' ? '✓' : '✕'}</span>{toast.msg}
        </div>
      )}

      <div className="ag-page-head">
        <div>
          <h1 className="ag-page-title">Agreements & Contracts</h1>
          <p className="ag-page-sub">Review, sign or reject your legal agreements</p>
        </div>
      </div>

      {/* Stats */}
      <div className="ag-stats">
        {[
          { label: 'Total',     val: counts.total,     icon: '📋', color: '#0ea5e9', bg: '#f0f9ff' },
          { label: 'Pending',   val: counts.pending,   icon: '⏳', color: '#f59e0b', bg: '#fffbeb' },
          { label: 'Confirmed', val: counts.confirmed, icon: '✓',  color: '#10b981', bg: '#ecfdf5' },
          { label: 'Rejected',  val: counts.rejected,  icon: '✕',  color: '#ef4444', bg: '#fef2f2' },
        ].map((s, i) => (
          <div className="ag-stat" key={i} style={{ '--acc': s.color, '--sbg': s.bg }}>
            <div className="ag-stat-icon">{s.icon}</div>
            <div>
              <p className="ag-stat-label">{s.label}</p>
              <p className="ag-stat-value">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      {allAgreements.length === 0 ? (
        <div className="ag-empty">
          <span>📋</span>
          <h3>No agreements yet</h3>
          <p>Agreements assigned to you by WebPoint will appear here.</p>
        </div>
      ) : (
        <div className="ag-list">
          {allAgreements.map(({ pkg, ag }, i) => {
            const s = statusMap[ag.status] || statusMap.pending;
            return (
              <div className="ag-card" key={ag._id} style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="ag-card-top">
                  <div className="ag-card-left">
                    <div className="ag-doc-icon">📋</div>
                    <div>
                      <h3 className="ag-card-title">{ag.title}</h3>
                      <p className="ag-card-pkg">Package: {pkg.title}</p>
                      {ag.description && <p className="ag-card-desc">{ag.description}</p>}
                    </div>
                  </div>
                  <span className="ag-badge" style={{ color: s.color, background: s.bg }}>{s.label}</span>
                </div>

                <div className="ag-meta">
                  {ag.expiryDate && (
                    <div className="ag-meta-item">
                      <span className="ag-meta-label">Expires</span>
                      <span className="ag-meta-val">{new Date(ag.expiryDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  )}
                  {ag.signedAt && (
                    <div className="ag-meta-item">
                      <span className="ag-meta-label">Signed</span>
                      <span className="ag-meta-val">{new Date(ag.signedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  )}
                  {ag.signatureType && (
                    <div className="ag-meta-item">
                      <span className="ag-meta-label">Signature</span>
                      <span className="ag-meta-val" style={{ textTransform: 'capitalize' }}>{ag.signatureType}</span>
                    </div>
                  )}
                </div>

                {ag.rejectionReason && (
                  <div className="ag-rejection-note">
                    <span>Rejection reason:</span> {ag.rejectionReason}
                  </div>
                )}

                <div className="ag-actions">
                  <button className="ag-btn ag-btn--outline" onClick={() => { setSelected({ pkg, ag }); setModal('view'); }}>
                    View Details
                  </button>
                  <button className="ag-btn ag-btn--ghost" onClick={() => downloadAgreement(pkg, ag)}>
                    Download
                  </button>
                  {ag.fileUrl && (
                    <a href={`${getServerUrl()}${ag.fileUrl}`} target="_blank" rel="noreferrer" className="ag-btn ag-btn--ghost">
                      View Document
                    </a>
                  )}
                  {ag.status === 'pending' && (
                    <button className="ag-btn ag-btn--primary" onClick={() => openSign(pkg, ag)}>
                      Sign / Respond
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* View Modal */}
      {modal === 'view' && selected && (
        <div className="ag-overlay" onClick={() => setModal(null)}>
          <div className="ag-modal" onClick={e => e.stopPropagation()}>
            <div className="ag-modal-head">
              <div className="ag-modal-title-wrap">
                <span>📋</span>
                <h2 className="ag-modal-title">{selected.ag.title}</h2>
              </div>
              <button className="ag-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="ag-modal-body">
              <div className="ag-modal-section">
                <h3 className="ag-modal-section-title">Agreement Information</h3>
                <div className="ag-info-grid">
                  {[
                    { label: 'Status',  val: <span className="ag-badge" style={{ color: statusMap[selected.ag.status]?.color, background: statusMap[selected.ag.status]?.bg }}>{statusMap[selected.ag.status]?.label}</span> },
                    { label: 'Package', val: selected.pkg.title },
                    selected.ag.expiryDate && { label: 'Expires', val: new Date(selected.ag.expiryDate).toLocaleDateString() },
                    selected.ag.signedAt   && { label: 'Signed',  val: new Date(selected.ag.signedAt).toLocaleDateString() },
                  ].filter(Boolean).map((r, i) => (
                    <div className="ag-info-row" key={i}>
                      <span className="ag-info-label">{r.label}</span>
                      <span className="ag-info-val">{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selected.ag.description && (
                <div className="ag-modal-section">
                  <h3 className="ag-modal-section-title">Description</h3>
                  <p className="ag-modal-text">{selected.ag.description}</p>
                </div>
              )}

              {selected.ag.terms?.length > 0 && (
                <div className="ag-modal-section">
                  <h3 className="ag-modal-section-title">Terms & Conditions</h3>
                  <div className="ag-terms">
                    {selected.ag.terms.map((t, i) => (
                      <div className="ag-term-item" key={i}>
                        <span className="ag-term-check">✓</span><span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selected.ag.rejectionReason && (
                <div className="ag-modal-section">
                  <h3 className="ag-modal-section-title">Rejection Reason</h3>
                  <p className="ag-modal-text">{selected.ag.rejectionReason}</p>
                </div>
              )}

              <div className="ag-modal-section ag-legal-section">
                <p className="ag-legal-text">This agreement is legally binding between WebPoint POS and the client.</p>
              </div>
            </div>
            <div className="ag-modal-foot">
              <button className="ag-btn ag-btn--outline" onClick={() => setModal(null)}>Close</button>
              <button className="ag-btn ag-btn--ghost" onClick={() => downloadAgreement(selected.pkg, selected.ag)}>Download</button>
              {selected.ag.status === 'pending' && (
                <button className="ag-btn ag-btn--primary" onClick={() => { setModal(null); setTimeout(() => openSign(selected.pkg, selected.ag), 100); }}>
                  Sign / Respond
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sign Modal */}
      {modal === 'sign' && selected && (
        <div className="ag-overlay" onClick={() => setModal(null)}>
          <div className="ag-modal ag-modal--lg" onClick={e => e.stopPropagation()}>
            <div className="ag-modal-head">
              <h2 className="ag-modal-title">Respond to: {selected.ag.title}</h2>
              <button className="ag-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="ag-modal-body">
              {/* Terms summary */}
              {selected.ag.terms?.length > 0 && (
                <div className="ag-modal-section">
                  <h3 className="ag-modal-section-title">Terms Summary</h3>
                  <div className="ag-terms">
                    {selected.ag.terms.map((t, i) => (
                      <div className="ag-term-item" key={i}><span className="ag-term-check">✓</span><span>{t}</span></div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action */}
              <div className="ag-modal-section">
                <h3 className="ag-modal-section-title">Your Response</h3>
                <div className="ag-action-tabs">
                  <button className={`ag-action-tab ${agAction === 'confirm' ? 'active' : ''}`} onClick={() => setAgAction('confirm')}>
                    ✓ Confirm & Sign
                  </button>
                  <button className={`ag-action-tab ag-action-tab--reject ${agAction === 'reject' ? 'active' : ''}`} onClick={() => setAgAction('reject')}>
                    ✕ Reject
                  </button>
                </div>
              </div>

              {agAction === 'confirm' && (
                <div className="ag-modal-section">
                  <h3 className="ag-modal-section-title">Your Signature</h3>
                  <div className="ag-sig-tabs">
                    <button className={`ag-sig-tab ${sigType === 'digital' ? 'active' : ''}`} onClick={() => setSigType('digital')}>Draw Signature</button>
                    <button className={`ag-sig-tab ${sigType === 'image' ? 'active' : ''}`} onClick={() => setSigType('image')}>Upload Image</button>
                  </div>

                  {sigType === 'digital' && (
                    <div className="ag-canvas-wrap">
                      <p className="ag-canvas-hint">Draw your signature in the box below</p>
                      <canvas ref={canvasRef} width={480} height={160} className="ag-canvas"
                        onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
                        onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw} />
                      <button className="ag-clear-btn" onClick={clearCanvas}>Clear</button>
                    </div>
                  )}

                  {sigType === 'image' && (
                    <div className="ag-upload-wrap">
                      <label className="ag-file-label">
                        📎 {sigFile ? sigFile.name : 'Upload Signature Image (PNG/JPG)'}
                        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => setSigFile(e.target.files[0])} />
                      </label>
                      {sigFile && <img src={URL.createObjectURL(sigFile)} alt="preview" className="ag-sig-preview" />}
                    </div>
                  )}
                </div>
              )}

              {agAction === 'reject' && (
                <div className="ag-modal-section">
                  <h3 className="ag-modal-section-title">Reason for Rejection *</h3>
                  <textarea className="ag-textarea" value={rejectNote} onChange={e => setRejectNote(e.target.value)}
                    placeholder="Please provide a detailed reason for rejecting this agreement…" rows={4} />
                </div>
              )}
            </div>
            <div className="ag-modal-foot">
              <button className="ag-btn ag-btn--outline" onClick={() => setModal(null)}>Cancel</button>
              <button
                className={`ag-btn ${agAction === 'reject' ? 'ag-btn--danger' : 'ag-btn--primary'}`}
                onClick={handleSubmit} disabled={submitting}>
                {submitting ? <span className="ag-spinner-sm" /> : agAction === 'reject' ? 'Submit Rejection' : 'Submit Signature'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}