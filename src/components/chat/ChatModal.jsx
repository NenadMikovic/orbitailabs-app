'use client';

import { useState } from 'react';

import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Grow,
  Modal,
  Paper,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';

export default function ChatModal({ open, onClose, messages, setMessages, pageContext }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/ai-assistant', {
      method: 'POST',
      body: JSON.stringify({ messages: newMessages, pageContext }),
    });

    const data = await res.json();
    const aiMessage = { role: 'assistant', content: data.response };

    setMessages([...newMessages, aiMessage]);
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Grow in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 600,
            bgcolor: '#13141D',
            color: 'white',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" color="#C97CFF">
              OrbitAI Assistant
            </Typography>
            <IconButton onClick={onClose} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              maxHeight: 300,
              overflowY: 'auto',
              bgcolor: '#1B1D2A',
              borderRadius: 2,
              p: 2,
              mb: 2,
            }}
          >
            {messages.map((msg, i) => (
  <Box
    key={i}
    sx={{
      display: 'flex',
      justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
      mb: 1.5,
    }}
  >
    <Box
      sx={{
        maxWidth: '75%',
        px: 2,
        py: 1.5,
        borderRadius: 2,
        borderTopLeftRadius: msg.role === 'user' ? 16 : 0,
        borderTopRightRadius: msg.role === 'user' ? 0 : 16,
        bgcolor: msg.role === 'user' ? '#5EA7FF' : '#C97CFF',
        color: '#fff',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {msg.content}
    </Box>
  </Box>
))}


            {loading && <Typography color="gray">AI is thinking...</Typography>}
          </Box>

          <Paper
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1,
              backgroundColor: '#232530',
              borderRadius: 3,
            }}
          >
            <TextField
              variant="standard"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about licenses..."
              InputProps={{
                disableUnderline: true,
                style: { color: 'white' },
              }}
            />
            <IconButton onClick={handleSend} disabled={loading}>
              <SendIcon sx={{ color: 'white' }} />
            </IconButton>
          </Paper>
        </Box>
      </Grow>
    </Modal>
  );
}
