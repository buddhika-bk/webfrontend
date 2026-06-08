import React, { useState, useEffect, useRef, useCallback } from 'react';
import { chatAPI } from '../../services/api';
import { useAuth } from '../../../context/AuthContext';
import './Message.css';

const POLL_MS = 3000;

export default function Message() {
  const { user }                = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(true);
  const [sending, setSending]   = useState(false);
  const [lastTime, setLastTime] = useState(new Date().toISOString());
  const bottomRef               = useRef(null);
  const pollRef                 = useRef(null);
  const inputRef                = useRef(null);
  const textareaRef             = useRef(null);

  const scrollBottom = () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' });

  const load = useCallback(async () => {
    try {
      const res = await chatAPI.getMessages();
      setMessages(res.data.messages || []);
      setLastTime(res.data.serverTime || new Date().toISOString());
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const poll = useCallback(async () => {
    try {
      const res = await chatAPI.poll(lastTime);
      if (res.data.messages?.length > 0) {
        setMessages(prev => {
          const ids = new Set(prev.map(m => m._id));
          const fresh = res.data.messages.filter(m => !ids.has(m._id));
          return fresh.length > 0 ? [...prev, ...fresh] : prev;
        });
        setLastTime(res.data.serverTime);
      }
    } catch {}
  }, [lastTime]);

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (!loading) {
      pollRef.current = setInterval(poll, POLL_MS);
      return () => clearInterval(pollRef.current);
    }
  }, [loading, poll]);

  useEffect(() => { scrollBottom(); }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'; }
  }, [input]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const opt = { _id: `tmp-${Date.now()}`, content: text, senderType: 'user', createdAt: new Date().toISOString(), _temp: true };
    setMessages(prev => [...prev, opt]);
    setInput('');
    setSending(true);

    try {
      const res = await chatAPI.sendMessage(text);
      setMessages(prev => prev.map(m => m._id === opt._id ? res.data.message : m));
      setLastTime(new Date().toISOString());
    } catch {
      setMessages(prev => prev.filter(m => m._id !== opt._id));
      setInput(text);
    } finally {
      setSending(false);
      inputRef.current?.focus();
    }
  };

  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } };

  const fmtTime = d => new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const fmtDate = d => {
    const dt = new Date(d), now = new Date();
    const yd = new Date(now); yd.setDate(now.getDate() - 1);
    if (dt.toDateString() === now.toDateString()) return 'Today';
    if (dt.toDateString() === yd.toDateString())  return 'Yesterday';
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const grouped = messages.reduce((g, m) => {
    const key = new Date(m.createdAt).toDateString();
    if (!g[key]) g[key] = [];
    g[key].push(m);
    return g;
  }, {});

  return (
    <div className="ch-shell">
      {/* Header */}
      <div className="ch-head">
        <div className="ch-head-av">W</div>
        <div className="ch-head-info">
          <span className="ch-head-name">WebPoint Support</span>
          <span className="ch-head-status"><span className="ch-online"/>Online · Replies quickly</span>
        </div>
      </div>

      {/* Messages */}
      <div className="ch-msgs">
        {loading ? (
          <div className="ch-center"><div className="ch-spinner"/><p>Loading…</p></div>
        ) : messages.length === 0 ? (
          <div className="ch-center ch-empty">
            <span>💬</span>
            <h3>Start a conversation</h3>
            <p>Send a message to WebPoint Support. We'll reply as soon as possible.</p>
          </div>
        ) : (
          Object.entries(grouped).map(([key, msgs]) => (
            <div key={key}>
              <div className="ch-date-bar"><span>{fmtDate(msgs[0].createdAt)}</span></div>
              {msgs.map(m => {
                const isMe = m.senderType === 'user';
                return (
                  <div key={m._id} className={`ch-row ${isMe ? 'ch-row--me' : 'ch-row--them'}`}>
                    {!isMe && <div className="ch-av ch-av--them">W</div>}
                    <div className={`ch-bubble ${isMe ? 'ch-bubble--me' : 'ch-bubble--them'} ${m._temp ? 'ch-bubble--temp' : ''}`}>
                      <p>{m.content}</p>
                      <div className="ch-meta">
                        <span>{fmtTime(m.createdAt)}</span>
                        {isMe && <span className="ch-tick">{m._temp ? '○' : m.isRead ? '✓✓' : '✓'}</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Input */}
      <div className="ch-input-area">
        <div className="ch-input-wrap">
          <textarea ref={ta => { textareaRef.current = ta; inputRef.current = ta; }}
            className="ch-input" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={onKey} placeholder="Type a message…" rows={1} disabled={loading}/>
          <button className={`ch-send ${input.trim() && !sending ? 'ch-send--active' : ''}`}
            onClick={send} disabled={!input.trim() || sending || loading}>
            {sending ? <span className="ch-send-spin"/> : '➤'}
          </button>
        </div>
        <p className="ch-hint">Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}