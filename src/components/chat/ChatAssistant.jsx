'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Paper,
  Stack,
  Button,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';

import ChatModal from './ChatModal';

const NovaOrbCanvas = dynamic(() => import('src/components/orb/NovaOrb.tsx'), { ssr: false });

// Gradient style for suggestions
const SuggestionButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #5EA7FF 0%, #C97CFF 100%)',
  color: '#fff',
  fontWeight: 500,
  borderRadius: 12,
  textTransform: 'none',
  padding: '6px 16px',
  '&:hover': {
    background: 'linear-gradient(90deg, #569CFF 0%, #C16EFF 100%)',
  },
}));

export default function ChatAssistant({ pageContext }) {
  const [messages, setMessages] = useState([]);
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
setOpenModal(true); // Open the modal with the conversation

  };

  const handleSuggestion = (suggestion) => {
    setInput(suggestion);
  };

const [openModal, setOpenModal] = useState(false);

  return (
    <Paper
  elevation={3}
  sx={(theme) => ({
    p: 4,
    borderRadius: 4,
    width: '100%',
    maxWidth: '100%',
    mx: 0,
    mt: 0,
    color: theme.palette.text.primary,
    background:
      theme.palette.mode === 'light'
        ? 'text.primary'
        : 'linear-gradient(180deg, #1B1D2A 0%, #13141D 100%)',
  })}
>


      <Stack spacing={2} alignItems="center" textAlign="center">
        <NovaOrbCanvas />
        <Typography variant="h6" sx={{ color: 'text.primary' }}>Your OrbitAI Assistant is ready</Typography>
        <Stack spacing={1} width="100%">
  <Typography
    variant="body2"
    sx={{
      color: 'text.secondary',
      cursor: 'pointer',
      '&:hover': { textDecoration: 'underline' },
    }}
    onClick={() => handleSuggestion('Write an email to the team')}
  >
    How do I activate my license?
  </Typography>

  <SuggestionButton onClick={() => handleSuggestion('Summarize key points')}>
    Which plan gives me unlimited tokens?
  </SuggestionButton>

  <Typography
    variant="body2"
    sx={{
      color: 'text.secondary',
      cursor: 'pointer',
      '&:hover': { textDecoration: 'underline' },
    }}
    onClick={() => handleSuggestion('Create a follow-up checklist')}
  >
    Where can I see how many tokens I have left?
  </Typography>
</Stack>


        <Box
  sx={(theme) => ({
    display: 'flex',
    gap: 1,
    width: '100%',
    mt: 2,
    borderRadius: 2,
    px: 1,
    py: 0.5,
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.grey[200] // ✅ no quotes
        : 'text.primary',
  })}
>

          <TextField
  fullWidth
  variant="standard"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
  placeholder="Ask, write or search for anything..."
  inputProps={{
    style: {
      paddingLeft: 8,
    },
  }}
  sx={(theme) => ({
    '& .MuiInputBase-input': {
      color: theme.palette.text.primary,
      fontSize: 16, // Increase font size here
      paddingTop: 1,
      paddingBottom: 1,
    },
    '& .MuiInputBase-root': {
      color: theme.palette.text.primary,
      alignItems: 'center',
    },
    '& .MuiInput-underline:before': {
      borderBottom: 'none !important',
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none !important',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: 'none !important',
    },
  })}
/>




          <IconButton onClick={handleSend} disabled={loading}>
            <SendIcon sx={{ color: '#000' }} />
          </IconButton>
        </Box>

        {!openModal && messages.length > 0 && (
  <Box
    sx={{
      mt: 3,
      p: 2,
      backgroundColor: 'text.primary',
      borderRadius: 2,
      width: '100%',
      maxHeight: 200,
      overflowY: 'auto',
    }}
  >
    {messages.map((msg, i) => (
      <Typography
        key={i}
        sx={{ color: msg.role === 'user' ? '#5EA7FF' : '#C97CFF', mb: 1 }}
      >
        <strong>{msg.role === 'user' ? 'You:' : 'AI:'}</strong> {msg.content}
      </Typography>
    ))}
  </Box>
)}

        <ChatModal
  open={openModal}
  onClose={() => setOpenModal(false)}
  messages={messages}
  setMessages={setMessages}
  pageContext={pageContext}
/>

      </Stack>
    </Paper>
  );
}
