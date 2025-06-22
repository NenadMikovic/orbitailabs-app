'use client';

import { useRouter } from 'next/navigation';

import { Box, Button, Typography } from '@mui/material';

export default function LicenseEmptyView() {
  const router = useRouter();

  

  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h5" gutterBottom>
        No Active License
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        To access Stellaris trading bots and download files, you&apos;ll need an active license.
        Choose the plan and unlock downloads instantly.
      </Typography>

      <Button
  variant="contained"
  color="primary"
  size="large"
  component="a"
  href="https://www.orbitailabs.com/#pricing"
  target="_blank"
  rel="noopener noreferrer"
>
  Choose Plan
</Button>
    </Box>
  );
}
