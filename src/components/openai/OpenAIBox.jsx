'use client';

import { Box, Typography } from '@mui/material';

export default function OpenAIBox() {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 2,
        minHeight: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body1" color="text.secondary">
        🤖 OpenAI Assistant Placeholder
      </Typography>
    </Box>
  );
}
