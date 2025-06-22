import React, { useState, useEffect, useRef } from 'react';
import { Icon } from 'components/Icon';
import styles from './Chatbot.module.css';

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
const RESUME_TEXT = `Put your resume text here or fetch it from a public endpoint if needed.`;

const Chatbot = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! This is Charles. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [device, setDevice] = useState('phone');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  if (!mounted) return null;

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    try {
      const systemMessage = {
        role: 'system',
        content: `You are Charles, a senior full stack developer. Answer all questions as if you are Charles, using only the information from the resume below. If the answer is not in the resume, say you don't know.\n\nRESUME:\n${RESUME_TEXT}`
      };
      const apiMessages = newMessages.map(m => ({
        role: m.from === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [systemMessage, ...apiMessages],
        })
      });
      const data = await res.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        setMessages(msgs => [...msgs, { from: 'bot', text: data.choices[0].message.content }]);
      } else {
        setMessages(msgs => [...msgs, { from: 'bot', text: 'Sorry, no reply from AI.' }]);
      }
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Error talking to AI.' }]);
    }
  };

  return (
    <div className={[
      styles.chatbotContainer,
      open ? (device === 'phone' ? styles.openPhone : styles.openTablet) : styles.closed
    ].join(' ')}>
      {open ? (
        <>
          <div className={styles.header}>
            Chatbot
            <div>
              <button
                onClick={() => setDevice(device === 'phone' ? 'tablet' : 'phone')}
                className={styles.toggleButton}
                title={`Switch to ${device === 'phone' ? 'tablet' : 'phone'} mode`}
              >
                {device === 'phone' ? 'Tablet' : 'Phone'}
              </button>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>&times;</button>
            </div>
          </div>
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={msg.from === 'bot' ? styles.botMsg : styles.userMsg}>
                <span className={msg.from === 'bot' ? styles.bubbleBot : styles.bubbleUser}>{msg.text}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.inputRow}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type a message..."
              rows={1}
              className={styles.textarea}
              autoFocus
            />
            <button onClick={handleSend} className={styles.sendButton} aria-label="Send">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 20L21 12L3 4V10L17 12L3 14V20Z" fill="#fff" />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <button onClick={() => setOpen(true)} className={styles.avatarButton}>
          <Icon className={styles.icon} icon="bot" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
