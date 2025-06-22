import { useState, useCallback } from 'react';
import { useBoolean, usePopover, useCopyToClipboard } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { fData } from 'src/utils/format-number';
import { fDateTime } from 'src/utils/format-time';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { FileThumbnail } from 'src/components/file-thumbnail';
import { CustomPopover } from 'src/components/custom-popover';

import { FileManagerShareDialog } from './file-manager-share-dialog';
import { FileManagerFileDetails } from './file-manager-file-details';
import {
  FileItem,
  FileItemInfo,
  FileItemAvatar,
  FileItemActions,
  FileItemActionOverlay,
} from './file-manager-file-item-slots';

// ----------------------------------------------------------------------

export function FileRecentItem({ file, onDelete, sx, ...other }) {
  const { copy } = useCopyToClipboard();

  const menuActions = usePopover();

  const shareDialog = useBoolean();
  const detailsDrawer = useBoolean();
  const favorite = useBoolean(file.isFavorited);

  const [inviteEmail, setInviteEmail] = useState('');

  const handleChangeInvite = useCallback((event) => {
    setInviteEmail(event.target.value);
  }, []);

  const handleCopy = useCallback(() => {
    toast.success('Copied!');
    copy(file.url);
  }, [copy, file.url]);

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem
          onClick={() => {
            menuActions.onClose();
            handleCopy();
          }}
        >
          <Iconify icon="hugeicons:setup-01" />
          Stellaris Setup
        </MenuItem>

        <MenuItem
          onClick={() => {
            menuActions.onClose();
            shareDialog.onTrue();
          }}
        >
          <Iconify icon="fluent:wrench-settings-20-regular" />
          Smart Configuration
        </MenuItem>

        
      </MenuList>
    </CustomPopover>
  );

  const renderShareDialog = () => (
    <FileManagerShareDialog
      open={shareDialog.value}
      shared={file.shared}
      inviteEmail={inviteEmail}
      onChangeInvite={handleChangeInvite}
      onCopyLink={handleCopy}
      onClose={() => {
        shareDialog.onFalse();
        setInviteEmail('');
      }}
    />
  );

  const renderFileDetailsDrawer = () => (
    <FileManagerFileDetails
      file={file}
      favorited={favorite.value}
      onFavorite={favorite.onToggle}
      onCopyLink={handleCopy}
      open={detailsDrawer.value}
      onClose={detailsDrawer.onFalse}
      onDelete={() => {
        detailsDrawer.onFalse();
        onDelete();
      }}
    />
  );

  return (
    <>
      <FileItem
  variant="outlined"
  sx={[
    {
      p: { xs: 2.5, sm: 2 },
      alignItems: { xs: 'unset', sm: 'center' },
      flexDirection: { xs: 'column', sm: 'row' },
      ...(file.disabled && {
        pointerEvents: 'none',
        opacity: 0.5,
        userSelect: 'none',
      }),
    },
    ...(Array.isArray(sx) ? sx : [sx]),
  ]}
  {...other}
>

        {!file.disabled && <FileItemActionOverlay onClick={detailsDrawer.onTrue} />}

        <FileThumbnail file={file} />


        <FileItemInfo
          type="recent-file"
          title={file.name}
          values={[fData(file.size), fDateTime(file.modifiedAt)]}
        />

        <FileItemAvatar sharedUsers={file.shared} />

        
<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'relative', zIndex: 2 }}>
  <Tooltip title="Download">
    <IconButton
      onClick={detailsDrawer.onTrue}
      size="small"
    >
      <Iconify icon="eva:download-outline" />
    </IconButton>
  </Tooltip>
  </Box>

        {file.disabled ? (
  // 🔒 Show lock icon instead of star
  <IconButton disabled size="small" sx={{ opacity: 0.7 }}>
    <Iconify icon="material-symbols:lock" width={20} />
  </IconButton>
) : (
  // ⭐ Show star + working 3-dot menu
  <FileItemActions
    id={file.id}
    checked
    onChange={() => {}} // disables star toggle
    openMenu={menuActions.open}
    onOpenMenu={menuActions.onOpen}
    sx={{
      position: { xs: 'absolute', sm: 'unset' },
      '& .MuiCheckbox-root': {
        pointerEvents: 'none',
      },
    }}
  />
)}


      </FileItem>

      {renderMenuActions()}
      {renderFileDetailsDrawer()}
      {renderShareDialog()}
    </>
  );
}
