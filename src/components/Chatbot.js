import React, { useState, useEffect } from 'react';

const Chatbot = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.from === 'user' ? 'user' : 'assistant',
            content: m.text,
          }))
        })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(msgs => [...msgs, { from: 'bot', text: data.reply }]);
      } else {
        setMessages(msgs => [...msgs, { from: 'bot', text: 'Sorry, no reply from AI.' }]);
      }
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Error talking to AI.' }]);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      zIndex: 1000,
      width: open ? 320 : 56,
      height: open ? 400 : 56,
      background: '#fff',
      borderRadius: 28,
      boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    }}>
      {open ? (
        <>
          <div style={{
            background: '#222',
            color: '#fff',
            padding: '12px 16px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            Chatbot
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>&times;</button>
          </div>
          <div style={{ flex: 1, padding: 16, overflowY: 'auto', background: '#f9f9f9' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                textAlign: msg.from === 'bot' ? 'left' : 'right',
                margin: '8px 0',
              }}>
                <span style={{
                  display: 'inline-block',
                  background: msg.from === 'bot' ? '#eee' : '#0070f3',
                  color: msg.from === 'bot' ? '#222' : '#fff',
                  borderRadius: 16,
                  padding: '8px 14px',
                  maxWidth: '80%',
                  wordBreak: 'break-word',
                }}>{msg.text}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid #eee', padding: 8, background: '#fff' }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              style={{ flex: 1, border: '1px solid #ccc', outline: 'none', padding: 8, borderRadius: 8, color: '#222', background: '#fff', fontSize: 16 }}
              autoFocus
            />
            <button onClick={handleSend} style={{ marginLeft: 8, background: '#0070f3', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer' }}>Send</button>
          </div>
        </>
      ) : (
        <button onClick={() => setOpen(true)} style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#0070f3',
          color: '#fff',
          border: 'none',
          fontSize: 28,
          cursor: 'pointer',
        }}>
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
