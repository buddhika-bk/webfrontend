import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { userAPI, chatAPI, packagesAPI } from '../../services/api';
import './AdminDashboard.css';

const POLL_MS = 3000;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats,  setStats]  = useState(null);
  const [recent, setRecent] = useState([]);
  const [convs,  setConvs]  = useState([]);
  const [pkgs,   setPkgs]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const [sR, uR, cR] = await Promise.all([
        userAPI.getUserStats(),
        userAPI.getAllUsers({ limit: 8 }),
        chatAPI.adminGetConversations().catch(() => ({ data: { conversations: [] } }))
      ]);
      setStats(sR.data.stats);
      setRecent(uR.data.users);
      setConvs(cR.data.conversations);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const fetchPackages = async () => {
    try {
      const res = await packagesAPI.adminGetAll();
      setPkgs(res.data.packages);
    } catch {}
  };

  useEffect(() => { if (tab === 'packages') fetchPackages(); }, [tab]);

  const statCards = stats ? [
    { label:'Total Users',   val:stats.totalUsers,         color:'#0ea5e9', bg:'#f0f9ff', icon:'👥' },
    { label:'Personal',      val:stats.personalUsers,      color:'#8b5cf6', bg:'#f5f3ff', icon:'👤' },
    { label:'Business',      val:stats.businessUsers,      color:'#f59e0b', bg:'#fffbeb', icon:'🏢' },
    { label:'Active',        val:stats.activeUsers,        color:'#10b981', bg:'#ecfdf5', icon:'✓'  },
    { label:'Verified',      val:stats.verifiedUsers,      color:'#0369a1', bg:'#e0f2fe', icon:'✉'  },
    { label:'New (30d)',     val:stats.newUsersLast30Days, color:'#ef4444', bg:'#fef2f2', icon:'📅' },
  ] : [];

  const navItems = [
    { id:'overview',  icon:'▦', label:'Overview'  },
    { id:'messages',  icon:'✉', label:'Messages'  },
    { id:'packages',  icon:'❐', label:'Packages'  },
    { id:'users',     icon:'👥', label:'Users'     },
  ];

  if (loading) return (
    <div className="adm-loading"><div className="adm-spinner"/><p>Loading…</p></div>
  );

  return (
    <div className="adm-shell">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-brand">
          <span className="adm-brand-icon">⚡</span>
          <div><span className="adm-brand-name">WebPoint</span><span className="adm-brand-tag">Admin</span></div>
        </div>
        <nav className="adm-nav">
          {navItems.map(n => (
            <button key={n.id}
              className={`adm-nav-btn ${tab===n.id?'active':''}`}
              onClick={() => { if(n.id==='users') navigate('/admin/users'); else setTab(n.id); }}>
              <span className="adm-nav-icon">{n.icon}</span>
              <span>{n.label}</span>
              {tab===n.id && <span className="adm-nav-dot"/>}
            </button>
          ))}
        </nav>
        <div className="adm-sidebar-foot">
          <div className="adm-user-chip">
            <div className="adm-user-av">A</div>
            <div>
              <span className="adm-user-email">{user?.email}</span>
              <span className="adm-user-role">Administrator</span>
            </div>
          </div>
          <button className="adm-logout" onClick={()=>{logout();navigate('/admin/login');}}>Logout</button>
        </div>
      </aside>

      {/* Main */}
      <main className="adm-main">
        <div className="adm-topbar">
          <h1>{navItems.find(n=>n.id===tab)?.label || 'Overview'}</h1>
          <span className="adm-topbar-date">{new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}</span>
        </div>

        <div className="adm-content">
          {/* Stats always visible */}
          <div className="adm-stats-grid">
            {statCards.map((s,i) => (
              <div className="adm-stat-card" key={i} style={{'--acc':s.color,'--sbg':s.bg,animationDelay:`${i*.06}s`}}>
                <div className="adm-stat-icon-box">{s.icon}</div>
                <div><p className="adm-stat-label">{s.label}</p><p className="adm-stat-val">{s.val}</p></div>
              </div>
            ))}
          </div>

          {tab==='overview' && <AdminOverview recent={recent} navigate={navigate} onRefresh={fetchAll}/>}
          {tab==='messages' && <AdminMessages convs={convs} onRefresh={fetchAll}/>}
          {tab==='packages' && <AdminPackages pkgs={pkgs} onRefresh={fetchPackages}/>}
        </div>
      </main>
    </div>
  );
}

/* ── Overview ─────────────────────────────────────── */
function AdminOverview({ recent, navigate, onRefresh }) {
  return (
    <div className="adm-overview">
      <div className="adm-section-card">
        <div className="adm-section-head">
          <h2>Recent Users</h2>
          <button className="adm-link-btn" onClick={()=>navigate('/admin/users')}>View All →</button>
        </div>
        <div className="adm-table-scroll">
          <table className="adm-table">
            <thead>
              <tr>{['Email','Type','Name / Company','Status','Joined',''].map(h=><th key={h}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {recent.map(u => (
                <tr key={u._id}>
                  <td className="adm-td-em">{u.email}</td>
                  <td><span className={`adm-type-badge adm-type-${u.userType}`}>{u.userType}</span></td>
                  <td>{u.userType==='personal'?`${u.personalDetails?.firstName||''} ${u.personalDetails?.lastName||''}`.trim()||'—':u.businessDetails?.companyName||'—'}</td>
                  <td><span className={`adm-status-badge ${u.isActive?'adm-s-active':'adm-s-inactive'}`}>{u.isActive?'Active':'Inactive'}</span></td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td><button className="adm-view-btn" onClick={()=>navigate(`/admin/users/${u._id}`)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="adm-section-card">
        <div className="adm-section-head"><h2>Quick Actions</h2></div>
        <div className="adm-quick-grid">
          {[
            {icon:'👥',label:'All Users',       fn:()=>navigate('/admin/users')},
            {icon:'👤',label:'Personal Users',  fn:()=>navigate('/admin/users?userType=personal')},
            {icon:'🏢',label:'Business Users',  fn:()=>navigate('/admin/users?userType=business')},
            {icon:'🔄',label:'Refresh Data',    fn:onRefresh},
          ].map((a,i)=>(
            <button key={i} className="adm-quick-btn" onClick={a.fn}>
              <span className="adm-quick-icon">{a.icon}</span><span>{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Messages ─────────────────────────────────────── */
function AdminMessages({ convs, onRefresh }) {
  const [sel, setSel]         = useState(null);
  const [msgs, setMsgs]       = useState([]);
  const [input, setInput]     = useState('');
  const [sending, setSending] = useState(false);
  const [lastTime, setLastTime] = useState(new Date().toISOString());
  const bottomRef             = useRef(null);
  const pollRef               = useRef(null);

  const loadMsgs = async (conv) => {
    try {
      const res = await chatAPI.adminGetMessages(conv.userId._id);
      setMsgs(res.data.messages || []);
      setLastTime(res.data.serverTime || new Date().toISOString());
    } catch {}
  };

  useEffect(() => {
    if (!sel) return;
    loadMsgs(sel);
    pollRef.current = setInterval(async () => {
      try {
        const res = await chatAPI.adminPoll(sel.userId._id, lastTime);
        if (res.data.messages?.length > 0) {
          setMsgs(prev => {
            const ids = new Set(prev.map(m=>m._id));
            const fresh = res.data.messages.filter(m=>!ids.has(m._id));
            return fresh.length>0 ? [...prev,...fresh] : prev;
          });
          setLastTime(res.data.serverTime);
        }
      } catch {}
    }, POLL_MS);
    return () => clearInterval(pollRef.current);
  }, [sel?._id]);

  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:'smooth'}); }, [msgs]);

  const send = async () => {
    const text = input.trim();
    if (!text || !sel || sending) return;
    setSending(true); setInput('');
    try {
      const res = await chatAPI.adminSendMessage(sel.userId._id, text);
      setMsgs(prev => [...prev, res.data.message]);
      setLastTime(new Date().toISOString());
    } catch { setInput(text); }
    finally { setSending(false); }
  };

  const getName = (conv) => {
    const u = conv.userId;
    if (!u) return 'Unknown';
    return u.userType==='personal'
      ? `${u.personalDetails?.firstName||''} ${u.personalDetails?.lastName||''}`.trim()||u.email
      : u.businessDetails?.companyName||u.email;
  };

  const fmtTime = d => new Date(d).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});

  return (
    <div className="adm-msg-shell">
      {/* Conv list */}
      <div className="adm-conv-panel">
        <div className="adm-conv-head">
          <h3>Conversations</h3>
          <span className="adm-conv-count">{convs.length}</span>
        </div>
        <div className="adm-conv-list">
          {convs.length===0 && <div className="adm-conv-empty">No conversations yet</div>}
          {convs.map(c => (
            <div key={c._id} className={`adm-conv-item ${sel?._id===c._id?'active':''}`} onClick={()=>setSel(c)}>
              <div className="adm-conv-av">{getName(c).charAt(0).toUpperCase()}</div>
              <div className="adm-conv-info">
                <span className="adm-conv-name">{getName(c)}</span>
                <span className={`adm-conv-type adm-type-${c.userId?.userType}`}>{c.userId?.userType}</span>
                {c.lastMessage && <span className="adm-conv-preview">{c.lastMessage.content?.slice(0,38)}{c.lastMessage.content?.length>38?'…':''}</span>}
              </div>
              {c.unreadByAdmin>0 && <span className="adm-conv-unread">{c.unreadByAdmin}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="adm-chat-pane">
        {!sel ? (
          <div className="adm-chat-empty"><span>💬</span><p>Select a conversation</p></div>
        ) : (
          <>
            <div className="adm-chat-head">
              <div className="adm-chat-av">{getName(sel).charAt(0).toUpperCase()}</div>
              <div>
                <span className="adm-chat-name">{getName(sel)}</span>
                <span className="adm-chat-email">{sel.userId?.email}</span>
              </div>
              <a href={`/admin/users/${sel.userId?._id}`} className="adm-view-profile">View Profile →</a>
            </div>

            <div className="adm-chat-msgs">
              {msgs.map(m => {
                const isAdmin = m.senderType==='admin';
                return (
                  <div key={m._id} className={`adm-msg-row ${isAdmin?'adm-msg-row--me':'adm-msg-row--them'}`}>
                    <div className={`adm-bubble ${isAdmin?'adm-bubble--me':'adm-bubble--them'}`}>
                      <p>{m.content}</p>
                      <span className="adm-bubble-time">{fmtTime(m.createdAt)}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef}/>
            </div>

            <div className="adm-chat-input-row">
              <input className="adm-chat-input" value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&&!e.shiftKey&&send()} placeholder={`Reply to ${getName(sel)}…`} disabled={sending}/>
              <button className="adm-chat-send" onClick={send} disabled={!input.trim()||sending}>
                {sending?'…':'➤'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Packages ─────────────────────────────────────── */
function AdminPackages({ pkgs, onRefresh }) {
  const [selPkg,    setSelPkg]    = useState(null);
  const [view,      setView]      = useState('list'); // list | detail
  const [modal,     setModal]     = useState(null);   // null | 'progress' | 'invoice' | 'agreement' | 'hold' | 'create'
  const [users,     setUsers]     = useState([]);
  const [toast,     setToast]     = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [search,    setSearch]    = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const showToast = (msg, type='success') => { setToast({msg,type}); setTimeout(()=>setToast(null),3500); };

  useEffect(() => {
    userAPI.getAllUsers({ limit: 100 }).then(r => setUsers(r.data.users || [])).catch(()=>{});
  }, []);

  // Form states
  const [progressForm, setProgressForm] = useState({ progress:0, status:'', note:'', tasks:[], recentUpdates:[] });
  const [invoiceForm,  setInvoiceForm]  = useState({ description:'', amount:'', dueDate:'' });
  const [agForm,       setAgForm]       = useState({ title:'', description:'', terms:'', expiryDate:'', file:null });
  const [holdForm,     setHoldForm]     = useState({ isOnHold:false, reason:'', holdDate:'', expectedResumeDate:'', priority:'medium', status:'on-hold', adminNotes:'' });
  const [createForm,   setCreateForm]   = useState({ userId:'', title:'', description:'', category:'other', status:'pending', price:{amount:'',currency:'LKR',billingCycle:'one-time'}, features:'', startDate:'', expiryDate:'' });

  const openDetail = (pkg) => {
    setSelPkg(pkg);
    setProgressForm({ progress: pkg.progress||0, status: pkg.status||'', note:'', tasks: pkg.tasks||[], recentUpdates: pkg.recentUpdates||[] });
    setHoldForm({ isOnHold: pkg.holdInfo?.isOnHold||false, reason: pkg.holdInfo?.reason||'', holdDate: pkg.holdInfo?.holdDate?.slice?.(0,10)||'', expectedResumeDate: pkg.holdInfo?.expectedResumeDate?.slice?.(0,10)||'', priority: pkg.holdInfo?.priority||'medium', status: pkg.holdInfo?.status||'on-hold', adminNotes: pkg.holdInfo?.adminNotes||'' });
    setView('detail');
  };

  const submitProgress = async () => {
    try { setLoading(true);
      const updates = [...(progressForm.recentUpdates||[])];
      if (progressForm.note) updates.unshift(progressForm.note);
      await packagesAPI.adminUpdateProgress(selPkg._id, { progress: progressForm.progress, status: progressForm.status||undefined, note: progressForm.note||undefined, tasks: progressForm.tasks, recentUpdates: updates.slice(0,5) });
      showToast('Progress updated!'); setModal(null); onRefresh();
    } catch { showToast('Failed','error'); } finally { setLoading(false); }
  };

  const submitInvoice = async () => {
    if (!invoiceForm.amount || !invoiceForm.description) { showToast('Fill all fields','error'); return; }
    try { setLoading(true);
      await packagesAPI.adminAddInvoice(selPkg._id, { description: invoiceForm.description, amount: Number(invoiceForm.amount), dueDate: invoiceForm.dueDate||undefined });
      showToast('Invoice created & email sent!'); setModal(null); setInvoiceForm({description:'',amount:'',dueDate:''}); onRefresh();
    } catch { showToast('Failed','error'); } finally { setLoading(false); }
  };

  const confirmPayment = async (invoiceId) => {
    try { await packagesAPI.adminConfirmPayment(selPkg._id, { invoiceId }); showToast('Payment confirmed & email sent!'); onRefresh();
    } catch { showToast('Failed','error'); }
  };

  const submitAgreement = async () => {
    if (!agForm.title) { showToast('Title required','error'); return; }
    try { setLoading(true);
      const fd = new FormData();
      fd.append('title', agForm.title);
      fd.append('description', agForm.description);
      if (agForm.terms) fd.append('terms', JSON.stringify(agForm.terms.split('\n').filter(Boolean)));
      if (agForm.expiryDate) fd.append('expiryDate', agForm.expiryDate);
      if (agForm.file) fd.append('file', agForm.file);
      await packagesAPI.adminAddAgreement(selPkg._id, fd);
      showToast('Agreement added & email sent!'); setModal(null); setAgForm({title:'',description:'',terms:'',expiryDate:'',file:null}); onRefresh();
    } catch { showToast('Failed','error'); } finally { setLoading(false); }
  };

  const submitHold = async () => {
    try { setLoading(true);
      await packagesAPI.adminUpdateHold(selPkg._id, holdForm);
      showToast('Hold info updated!'); setModal(null); onRefresh();
    } catch { showToast('Failed','error'); } finally { setLoading(false); }
  };

  const submitCreate = async () => {
    if (!createForm.userId||!createForm.title||!createForm.price.amount) { showToast('Fill required fields','error'); return; }
    try { setLoading(true);
      await packagesAPI.adminCreate({ ...createForm, price:{...createForm.price,amount:Number(createForm.price.amount)}, features: createForm.features.split('\n').filter(Boolean) });
      showToast('Package created & email sent!'); setModal(null); setCreateForm({userId:'',title:'',description:'',category:'other',status:'pending',price:{amount:'',currency:'LKR',billingCycle:'one-time'},features:'',startDate:'',expiryDate:''}); onRefresh();
    } catch { showToast('Failed','error'); } finally { setLoading(false); }
  };

  const deletePackage = async (id) => {
    if (!window.confirm('Delete this package?')) return;
    try { await packagesAPI.adminDelete(id); showToast('Deleted'); onRefresh(); if(view==='detail') setView('list');
    } catch { showToast('Failed','error'); }
  };

  const filtered = pkgs.filter(p => {
    const name = p.userId?.userType==='personal'
      ? `${p.userId?.personalDetails?.firstName||''} ${p.userId?.personalDetails?.lastName||''}` : p.userId?.businessDetails?.companyName||'';
    const match = !search || p.title.toLowerCase().includes(search.toLowerCase()) || name.toLowerCase().includes(search.toLowerCase()) || p.userId?.email?.toLowerCase().includes(search.toLowerCase());
    const statusMatch = !filterStatus || p.status===filterStatus;
    return match && statusMatch;
  });

  const STATUS_COLORS = { active:'#10b981', 'in-progress':'#0ea5e9', pending:'#f59e0b', completed:'#8b5cf6', expired:'#ef4444', cancelled:'#64748b' };

  return (
    <div className="adm-pkgs">
      {toast && <div className={`adm-toast adm-toast--${toast.type}`}><span>{toast.type==='success'?'✓':'✕'}</span>{toast.msg}</div>}

      {view==='list' ? (
        <>
          <div className="adm-pkgs-toolbar">
            <div className="adm-pkgs-filters">
              <input className="adm-search" placeholder="Search packages, users…" value={search} onChange={e=>setSearch(e.target.value)}/>
              <select className="adm-filter-sel" value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
                <option value="">All Status</option>
                {['pending','active','in-progress','completed','expired','cancelled'].map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <button className="adm-create-btn" onClick={()=>setModal('create')}>+ New Package</button>
          </div>

          <div className="adm-pkgs-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>{['Package','User','Status','Progress','Price','Created','Actions'].map(h=><th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {filtered.length===0 && <tr><td colSpan={7} style={{textAlign:'center',padding:'40px',color:'#94a3b8'}}>No packages found</td></tr>}
                {filtered.map(p => {
                  const uName = p.userId?.userType==='personal'
                    ? `${p.userId?.personalDetails?.firstName||''} ${p.userId?.personalDetails?.lastName||''}`.trim()||p.userId?.email
                    : p.userId?.businessDetails?.companyName||p.userId?.email;
                  return (
                    <tr key={p._id}>
                      <td className="adm-td-em">{p.title}</td>
                      <td>
                        <div><span style={{fontSize:'.82rem',color:'#0f172a',fontWeight:500}}>{uName}</span></div>
                        <span style={{fontSize:'.72rem',color:'#94a3b8'}}>{p.userId?.email}</span>
                      </td>
                      <td><span className="adm-pkg-status" style={{color:STATUS_COLORS[p.status]||'#64748b',background:STATUS_COLORS[p.status]+'18'}}>{p.status}</span></td>
                      <td>
                        <div className="adm-progress-cell">
                          <div className="adm-progress-mini"><div style={{width:`${p.progress}%`,height:'100%',background:STATUS_COLORS[p.status]||'#0ea5e9',borderRadius:4,transition:'width .5s'}}/></div>
                          <span>{p.progress}%</span>
                        </div>
                      </td>
                      <td style={{fontWeight:600,color:'#0ea5e9'}}>{p.price?.currency} {p.price?.amount?.toLocaleString()}</td>
                      <td style={{color:'#64748b',fontSize:'.82rem'}}>{new Date(p.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div style={{display:'flex',gap:6}}>
                          <button className="adm-view-btn" onClick={()=>openDetail(p)}>Manage</button>
                          <button className="adm-del-btn" onClick={()=>deletePackage(p._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* Detail view */
        selPkg && (
          <div className="adm-pkg-detail">
            <div className="adm-detail-head">
              <button className="adm-back-btn" onClick={()=>setView('list')}>← Back</button>
              <div>
                <h2 className="adm-detail-title">{selPkg.title}</h2>
                <span style={{fontSize:'.82rem',color:'#64748b'}}>{selPkg.userId?.email} · {selPkg.userId?.userType}</span>
              </div>
              <span className="adm-pkg-status" style={{color:STATUS_COLORS[selPkg.status]||'#64748b',background:(STATUS_COLORS[selPkg.status]||'#64748b')+'18'}}>{selPkg.status}</span>
            </div>

            <div className="adm-detail-grid">
              {/* Progress card */}
              <div className="adm-detail-card">
                <div className="adm-dc-head">
                  <h3>Progress</h3>
                  <button className="adm-dc-btn" onClick={()=>setModal('progress')}>Update</button>
                </div>
                <div className="adm-dc-progress-bar"><div style={{width:`${selPkg.progress}%`,height:'100%',background:'#0ea5e9',borderRadius:8,transition:'width .6s'}}/></div>
                <div style={{display:'flex',justifyContent:'space-between',fontSize:'.82rem',color:'#64748b',marginBottom:14}}>
                  <span>Overall Completion</span><strong style={{color:'#0ea5e9'}}>{selPkg.progress}%</strong>
                </div>
                {selPkg.tasks?.map((t,i)=>(
                  <div key={i} className="adm-task-row">
                    <div style={{display:'flex',justifyContent:'space-between',fontSize:'.82rem',marginBottom:4}}>
                      <span>{t.name}</span><span style={{color:'#0ea5e9',fontWeight:600}}>{t.completed}%</span>
                    </div>
                    <div className="adm-task-bar"><div style={{width:`${t.completed}%`,height:'100%',background:'linear-gradient(90deg,#0ea5e9,#0369a1)',borderRadius:4}}/></div>
                  </div>
                ))}
                {selPkg.progressNotes?.slice(-3).map((n,i)=>(
                  <div key={i} className="adm-note-item"><span>✓</span><div><p>{n.note}</p><small>{new Date(n.updatedAt).toLocaleDateString()}</small></div></div>
                ))}
              </div>

              {/* Invoices card */}
              <div className="adm-detail-card">
                <div className="adm-dc-head">
                  <h3>Invoices</h3>
                  <button className="adm-dc-btn" onClick={()=>setModal('invoice')}>Add Invoice</button>
                </div>
                {selPkg.invoices?.length===0 && <p className="adm-dc-empty">No invoices yet</p>}
                {selPkg.invoices?.map((inv,i)=>(
                  <div key={i} className="adm-inv-item">
                    <div>
                      <span className="adm-inv-no">{inv.invoiceNo}</span>
                      {inv.description && <span className="adm-inv-desc">{inv.description}</span>}
                      {inv.dueDate && <span className="adm-inv-due">Due {new Date(inv.dueDate).toLocaleDateString()}</span>}
                      {inv.transactionId && <span className="adm-inv-txn">TXN: {inv.transactionId}</span>}
                    </div>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <span style={{fontWeight:700,color:'#0ea5e9'}}>LKR {inv.amount?.toLocaleString()}</span>
                      <span className={`adm-inv-status adm-inv-${inv.status}`}>{inv.status}</span>
                      {inv.status!=='paid' && <button className="adm-dc-btn adm-dc-btn--green" onClick={()=>confirmPayment(inv._id)}>Confirm Paid</button>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Agreements card */}
              <div className="adm-detail-card">
                <div className="adm-dc-head">
                  <h3>Agreements</h3>
                  <button className="adm-dc-btn" onClick={()=>setModal('agreement')}>Add Agreement</button>
                </div>
                {selPkg.agreements?.length===0 && <p className="adm-dc-empty">No agreements yet</p>}
                {selPkg.agreements?.map((ag,i)=>(
                  <div key={i} className="adm-ag-item">
                    <div>
                      <span className="adm-inv-no">{ag.title}</span>
                      <span className={`adm-inv-status adm-inv-${ag.status}`}>{ag.status}</span>
                      {ag.signatureType && <span className="adm-inv-txn">Signed via: {ag.signatureType}</span>}
                      {ag.signedAt && <span className="adm-inv-due">Signed: {new Date(ag.signedAt).toLocaleDateString()}</span>}
                      {ag.rejectionReason && <span className="adm-inv-txn" style={{color:'#ef4444'}}>Reason: {ag.rejectionReason}</span>}
                    </div>
                    <div style={{display:'flex',gap:6}}>
                      {ag.fileUrl && <a href={`${import.meta.env.VITE_API_URL?.replace('/api','')||'http://localhost:3000'}${ag.fileUrl}`} target="_blank" rel="noreferrer" className="adm-dc-btn">View</a>}
                      {ag.signatureData && ag.signatureType==='digital' && (
                        <button className="adm-dc-btn" onClick={()=>{const w=window.open();w.document.write(`<img src="${ag.signatureData}" style="max-width:100%;border:1px solid #ccc;padding:20px;"/>`)}}>View Sig</button>
                      )}
                      {ag.signatureData && ag.signatureType==='image' && (
                        <a href={`${import.meta.env.VITE_API_URL?.replace('/api','')||'http://localhost:3000'}${ag.signatureData}`} target="_blank" rel="noreferrer" className="adm-dc-btn">View Sig</a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Hold card */}
              <div className="adm-detail-card">
                <div className="adm-dc-head">
                  <h3>Hold Status</h3>
                  <button className="adm-dc-btn" onClick={()=>setModal('hold')}>Update Hold</button>
                </div>
                <div className="adm-hold-info">
                  <div className="adm-hold-row"><span>On Hold</span><span className={selPkg.holdInfo?.isOnHold?'adm-hold-yes':'adm-hold-no'}>{selPkg.holdInfo?.isOnHold?'Yes':'No'}</span></div>
                  {selPkg.holdInfo?.status && <div className="adm-hold-row"><span>Status</span><span>{selPkg.holdInfo.status}</span></div>}
                  {selPkg.holdInfo?.priority && <div className="adm-hold-row"><span>Priority</span><span>{selPkg.holdInfo.priority}</span></div>}
                  {selPkg.holdInfo?.reason && <div className="adm-hold-row"><span>Reason</span><span>{selPkg.holdInfo.reason}</span></div>}
                  {selPkg.holdInfo?.expectedResumeDate && <div className="adm-hold-row"><span>Resume By</span><span>{new Date(selPkg.holdInfo.expectedResumeDate).toLocaleDateString()}</span></div>}
                  {selPkg.holdInfo?.adminNotes && <div style={{marginTop:10,padding:'10px 12px',background:'#f8fafc',borderRadius:8,fontSize:'.82rem',color:'#475569'}}>{selPkg.holdInfo.adminNotes}</div>}
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* ── Modals ── */}
      {modal && (
        <div className="adm-overlay" onClick={()=>setModal(null)}>
          <div className="adm-modal" onClick={e=>e.stopPropagation()}>

            {/* Progress modal */}
            {modal==='progress' && (
              <>
                <div className="adm-modal-head"><h2>Update Progress</h2><button onClick={()=>setModal(null)}>✕</button></div>
                <div className="adm-modal-body">
                  <AdmField label="Overall Progress (%)">
                    <input type="number" min={0} max={100} value={progressForm.progress} onChange={e=>setProgressForm(p=>({...p,progress:Number(e.target.value)}))}/>
                    <input type="range" min={0} max={100} value={progressForm.progress} onChange={e=>setProgressForm(p=>({...p,progress:Number(e.target.value)}))} style={{width:'100%',marginTop:8}}/>
                  </AdmField>
                  <AdmField label="Update Status">
                    <select value={progressForm.status} onChange={e=>setProgressForm(p=>({...p,status:e.target.value}))}>
                      <option value="">Keep current</option>
                      {['pending','active','in-progress','completed','expired','cancelled'].map(s=><option key={s} value={s}>{s}</option>)}
                    </select>
                  </AdmField>
                  <AdmField label="Progress Note (will be emailed to user)">
                    <textarea rows={3} value={progressForm.note} onChange={e=>setProgressForm(p=>({...p,note:e.target.value}))} placeholder="Describe the latest update…"/>
                  </AdmField>
                  <AdmField label="Task Updates">
                    {progressForm.tasks.map((t,i)=>(
                      <div key={i} className="adm-task-edit-row">
                        <span style={{fontSize:'.82rem',flex:1}}>{t.name}</span>
                        <input type="number" min={0} max={100} value={t.completed} style={{width:70}}
                          onChange={e=>{const tasks=[...progressForm.tasks];tasks[i]={...tasks[i],completed:Number(e.target.value)};setProgressForm(p=>({...p,tasks}));}}/>
                        <span style={{fontSize:'.78rem',color:'#64748b'}}>%</span>
                      </div>
                    ))}
                    <button className="adm-dc-btn" style={{marginTop:8}} onClick={()=>{const name=window.prompt('Task name:');if(name)setProgressForm(p=>({...p,tasks:[...p.tasks,{name,completed:0,status:'pending'}]}));}}>+ Add Task</button>
                  </AdmField>
                </div>
                <div className="adm-modal-foot">
                  <button className="adm-modal-cancel" onClick={()=>setModal(null)}>Cancel</button>
                  <button className="adm-modal-save" onClick={submitProgress} disabled={loading}>{loading?'…':'Save & Notify User'}</button>
                </div>
              </>
            )}

            {/* Invoice modal */}
            {modal==='invoice' && (
              <>
                <div className="adm-modal-head"><h2>Add Invoice</h2><button onClick={()=>setModal(null)}>✕</button></div>
                <div className="adm-modal-body">
                  <AdmField label="Description *"><input value={invoiceForm.description} onChange={e=>setInvoiceForm(p=>({...p,description:e.target.value}))} placeholder="e.g. Initial payment for website development"/></AdmField>
                  <AdmField label="Amount (LKR) *"><input type="number" value={invoiceForm.amount} onChange={e=>setInvoiceForm(p=>({...p,amount:e.target.value}))} placeholder="50000"/></AdmField>
                  <AdmField label="Due Date"><input type="date" value={invoiceForm.dueDate} onChange={e=>setInvoiceForm(p=>({...p,dueDate:e.target.value}))}/></AdmField>
                  <div className="adm-modal-note">📧 An invoice email will be sent to the user automatically.</div>
                </div>
                <div className="adm-modal-foot">
                  <button className="adm-modal-cancel" onClick={()=>setModal(null)}>Cancel</button>
                  <button className="adm-modal-save" onClick={submitInvoice} disabled={loading}>{loading?'…':'Create & Send Email'}</button>
                </div>
              </>
            )}

            {/* Agreement modal */}
            {modal==='agreement' && (
              <>
                <div className="adm-modal-head"><h2>Add Agreement</h2><button onClick={()=>setModal(null)}>✕</button></div>
                <div className="adm-modal-body">
                  <AdmField label="Agreement Title *"><input value={agForm.title} onChange={e=>setAgForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Website Development Agreement"/></AdmField>
                  <AdmField label="Description"><textarea rows={2} value={agForm.description} onChange={e=>setAgForm(p=>({...p,description:e.target.value}))} placeholder="Brief description…"/></AdmField>
                  <AdmField label="Terms (one per line)"><textarea rows={4} value={agForm.terms} onChange={e=>setAgForm(p=>({...p,terms:e.target.value}))} placeholder={"3 rounds of revisions\n1 year support\nSEO included"}/></AdmField>
                  <AdmField label="Expiry Date"><input type="date" value={agForm.expiryDate} onChange={e=>setAgForm(p=>({...p,expiryDate:e.target.value}))}/></AdmField>
                  <AdmField label="Upload Agreement Document (PDF/DOC/Image)">
                    <input type="file" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={e=>setAgForm(p=>({...p,file:e.target.files[0]}))}/>
                    {agForm.file && <span style={{fontSize:'.78rem',color:'#0ea5e9'}}>📎 {agForm.file.name}</span>}
                  </AdmField>
                  <div className="adm-modal-note">📧 The user will receive an email notification to review and sign.</div>
                </div>
                <div className="adm-modal-foot">
                  <button className="adm-modal-cancel" onClick={()=>setModal(null)}>Cancel</button>
                  <button className="adm-modal-save" onClick={submitAgreement} disabled={loading}>{loading?'…':'Add & Notify User'}</button>
                </div>
              </>
            )}

            {/* Hold modal */}
            {modal==='hold' && (
              <>
                <div className="adm-modal-head"><h2>Update Hold Status</h2><button onClick={()=>setModal(null)}>✕</button></div>
                <div className="adm-modal-body">
                  <div className="adm-toggle-row">
                    <span>On Hold</span>
                    <label className="adm-switch">
                      <input type="checkbox" checked={holdForm.isOnHold} onChange={e=>setHoldForm(p=>({...p,isOnHold:e.target.checked}))}/>
                      <span className="adm-switch-track"/>
                    </label>
                  </div>
                  <AdmField label="Hold Status">
                    <select value={holdForm.status} onChange={e=>setHoldForm(p=>({...p,status:e.target.value}))}>
                      <option value="on-hold">On Hold</option>
                      <option value="pending-approval">Pending Approval</option>
                      <option value="client-review">Client Review</option>
                      <option value="resumed">Resumed</option>
                    </select>
                  </AdmField>
                  <AdmField label="Priority">
                    <select value={holdForm.priority} onChange={e=>setHoldForm(p=>({...p,priority:e.target.value}))}>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </AdmField>
                  <AdmField label="Reason"><textarea rows={2} value={holdForm.reason} onChange={e=>setHoldForm(p=>({...p,reason:e.target.value}))} placeholder="Reason for hold…"/></AdmField>
                  <AdmField label="Hold Date"><input type="date" value={holdForm.holdDate} onChange={e=>setHoldForm(p=>({...p,holdDate:e.target.value}))}/></AdmField>
                  <AdmField label="Expected Resume Date"><input type="date" value={holdForm.expectedResumeDate} onChange={e=>setHoldForm(p=>({...p,expectedResumeDate:e.target.value}))}/></AdmField>
                  <AdmField label="Admin Notes"><textarea rows={2} value={holdForm.adminNotes} onChange={e=>setHoldForm(p=>({...p,adminNotes:e.target.value}))} placeholder="Internal notes…"/></AdmField>
                </div>
                <div className="adm-modal-foot">
                  <button className="adm-modal-cancel" onClick={()=>setModal(null)}>Cancel</button>
                  <button className="adm-modal-save" onClick={submitHold} disabled={loading}>{loading?'…':'Update Hold'}</button>
                </div>
              </>
            )}

            {/* Create package modal */}
            {modal==='create' && (
              <>
                <div className="adm-modal-head"><h2>Create Package</h2><button onClick={()=>setModal(null)}>✕</button></div>
                <div className="adm-modal-body">
                  <AdmField label="Assign To (User) *">
                    <select value={createForm.userId} onChange={e=>setCreateForm(p=>({...p,userId:e.target.value}))}>
                      <option value="">Select a user…</option>
                      {users.filter(u=>u.userType!=='admin').map(u=>(
                        <option key={u._id} value={u._id}>
                          {u.userType==='personal'?`${u.personalDetails?.firstName||''} ${u.personalDetails?.lastName||''}`.trim():u.businessDetails?.companyName||''} — {u.email}
                        </option>
                      ))}
                    </select>
                  </AdmField>
                  <AdmField label="Package Title *"><input value={createForm.title} onChange={e=>setCreateForm(p=>({...p,title:e.target.value}))} placeholder="e.g. Enterprise POS System"/></AdmField>
                  <AdmField label="Description"><textarea rows={2} value={createForm.description} onChange={e=>setCreateForm(p=>({...p,description:e.target.value}))} placeholder="Brief description…"/></AdmField>
                  <div className="adm-field-row">
                    <AdmField label="Category">
                      <select value={createForm.category} onChange={e=>setCreateForm(p=>({...p,category:e.target.value}))}>
                        {['pos','website','software','marketing','financial','design','cloud','consulting','other'].map(c=><option key={c} value={c}>{c}</option>)}
                      </select>
                    </AdmField>
                    <AdmField label="Status">
                      <select value={createForm.status} onChange={e=>setCreateForm(p=>({...p,status:e.target.value}))}>
                        {['pending','active','in-progress'].map(s=><option key={s} value={s}>{s}</option>)}
                      </select>
                    </AdmField>
                  </div>
                  <div className="adm-field-row">
                    <AdmField label="Price (LKR) *"><input type="number" value={createForm.price.amount} onChange={e=>setCreateForm(p=>({...p,price:{...p.price,amount:e.target.value}}))}/></AdmField>
                    <AdmField label="Billing">
                      <select value={createForm.price.billingCycle} onChange={e=>setCreateForm(p=>({...p,price:{...p.price,billingCycle:e.target.value}}))}>
                        <option value="one-time">One-time</option>
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual</option>
                      </select>
                    </AdmField>
                  </div>
                  <div className="adm-field-row">
                    <AdmField label="Start Date"><input type="date" value={createForm.startDate} onChange={e=>setCreateForm(p=>({...p,startDate:e.target.value}))}/></AdmField>
                    <AdmField label="Expiry Date"><input type="date" value={createForm.expiryDate} onChange={e=>setCreateForm(p=>({...p,expiryDate:e.target.value}))}/></AdmField>
                  </div>
                  <AdmField label="Features (one per line)">
                    <textarea rows={3} value={createForm.features} onChange={e=>setCreateForm(p=>({...p,features:e.target.value}))} placeholder={"Inventory Management\nSales Tracking\nCustomer Management"}/>
                  </AdmField>
                  <div className="adm-modal-note">📧 An email notification will be sent to the user.</div>
                </div>
                <div className="adm-modal-foot">
                  <button className="adm-modal-cancel" onClick={()=>setModal(null)}>Cancel</button>
                  <button className="adm-modal-save" onClick={submitCreate} disabled={loading}>{loading?'…':'Create & Notify'}</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* Helper field component */
function AdmField({ label, children }) {
  return (
    <div className="adm-field">
      <label className="adm-field-label">{label}</label>
      {children}
    </div>
  );
}