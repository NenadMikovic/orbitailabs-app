'use client';

import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import { Box, Grid, Button, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { _files } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import OpenAIBox from 'src/components/openai/OpenAIBox';

import { EcommerceWelcome } from 'src/sections/overview/e-commerce/ecommerce-welcome';

import { FileRecentItem } from '../../../file-manager/file-recent-item';
import { FileManagerPanel } from '../../../file-manager/file-manager-panel';
import { FileManagerNewFolderDialog } from '../../../file-manager/file-manager-new-folder-dialog';

const downloads = [
  {
    name: 'Starter Bot',
    file: '/downloads/stellaris-starter.zip',
    requiredPlan: 'starter',
  },
  {
    name: 'Pro Bot',
    file: '/downloads/stellaris-pro.zip',
    requiredPlan: 'pro',
  },
  {
    name: 'Elite Bot',
    file: '/downloads/stellaris-elite.zip',
    requiredPlan: 'elite',
  },
];

const allowedDownloads = {
  starter: ['starter'],
  pro: ['starter', 'pro'],
  elite: ['starter', 'pro', 'elite'],
};


export default function LicenseActiveView({ license }) {
  const plan = license?.plan?.toLowerCase();


const [folderName, setFolderName] = useState('');

  const [files, setFiles] = useState([]);

  const newFilesDialog = useBoolean();
  const newFolderDialog = useBoolean();

  const handleChangeFolderName = useCallback((event) => {
    setFolderName(event.target.value);
  }, []);

  const handleCreateNewFolder = useCallback(() => {
    newFolderDialog.onFalse();
    setFolderName('');
    console.info('CREATE NEW FOLDER');
  }, [newFolderDialog]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const renderNewFilesDialog = () => (
    <FileManagerNewFolderDialog open={newFilesDialog.value} onClose={newFilesDialog.onFalse} />
  );

  const renderNewFolderDialog = () => (
    <FileManagerNewFolderDialog
      open={newFolderDialog.value}
      onClose={newFolderDialog.onFalse}
      title="New Folder"
      folderName={folderName}
      onChangeFolderName={handleChangeFolderName}
      onCreate={handleCreateNewFolder}
    />
  );

  // Handle non-downloadable plans like "nextgen"
  if (!['starter', 'pro', 'elite'].includes(plan)) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h5" gutterBottom>
        Your current plan does not include downloadable bots.
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        To access Stellaris trading bots and download files, you&apos;ll need an active bot license.
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

  return (
<DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
           <EcommerceWelcome
          title="Downloads"
          description={
          <><br />
       <Iconify icon="ep:info-filled" width={20} sx={{ mr: 1, verticalAlign: 'middle' }} />
        Download core tools, bot updates, and AI-powered extensions. Access everything you need to install, update, and enhance your Stellaris setup.
         </>
          }
            />
            </Grid >
<Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <OpenAIBox />
        </Grid>
        <Grid size={{ xs: 12, md: 12 }}>
<Box sx={{ mt: 5 }}>
              

              <FileManagerPanel
                title="Stellaris Software Downloads"
                link={paths.dashboard.fileManager}
                onOpen={newFilesDialog.onTrue}
              />

              <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
  {_files.slice(0, 3).map((file) => {
    const isAllowed = allowedDownloads[plan]?.includes(file.requiredPlan);

    return (
      <FileRecentItem
        key={file.id}
        file={{ ...file, disabled: !isAllowed }}
        onDelete={() => console.info('DELETE', file.id)}
      />
    );
  })}
</Box>
            </Box>
</Grid>
    
    </Grid>
    </DashboardContent>
  );
}
