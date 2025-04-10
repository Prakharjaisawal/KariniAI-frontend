import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const ChatBot = ({ onQueryUpdate }) => {
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const res = await fetch(`${API_BASE}/products/chat?message=${encodeURIComponent(message)}`);
      const data = await res.json();
      onQueryUpdate(data); // Send chat results to parent component
    } catch (err) {
      console.error('Chat error:', err);
    }

    setMessage('');
  };

  return (
    <div style={styles.chatContainer}>
      <h3 style={styles.heading}>💬 Ask ProductBot</h3>
      <div style={styles.chatBox}>
        <input
          type="text"
          placeholder="e.g. black shoes under 500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    marginTop: '1rem',
    backgroundColor: '#1f1f1f',
    padding: '1rem',
    borderRadius: '10px',
    color: '#fff',
  },
  heading: {
    marginBottom: '0.5rem',
    fontSize: '1.1rem',
    color: '#fff',
  },
  chatBox: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#2c2c2c',
    color: '#fff',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default ChatBot;
