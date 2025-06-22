import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function FileManagerPanel({
  sx,
  link,
  title,
  onOpen,
  subtitle,
  collapse,
  onCollapse,
  ...other
}) {
  return (
    <Box
      sx={[
        {
          mb: 3,
          display: 'flex',
          alignItems: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box sx={{ flex: '1 1 auto' }}>
        <Box
          sx={{
            gap: 1,
            display: 'flex',
            typography: 'h6',
            alignItems: 'center',
          }}
        >
          {title}

          <IconButton
            size="small"
            color="primary"
            onClick={onOpen}
            sx={{
              width: 24,
              height: 24,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': { bgcolor: 'primary.dark' },
              pointerEvents: 'none',
            }}
          >
            <Iconify width={16} icon="material-symbols:download" />
          </IconButton>
        </Box>

        {subtitle && (
          <Box sx={{ typography: 'body2', color: 'text.disabled', mt: 0.5 }}>{subtitle}</Box>
        )}
      </Box>

      {link && (
        <Button
          href={link}
          component={RouterLink}
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View Guides
        </Button>
      )}

      {onCollapse && (
        <IconButton onClick={onCollapse}>
          <Iconify icon={collapse ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-upward-fill'} />
        </IconButton>
      )}
    </Box>
  );
}
