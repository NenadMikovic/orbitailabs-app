import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

// ----------------------------------------------------------------------

export function EcommerceWelcome({ title, description, action, img, sx, ...other }) {
  return (
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(to right,  ${theme.vars.palette.grey[900]} 5%, ${varAlpha(theme.vars.palette.primary.darkerChannel, 0.50)})`,
              `url(${CONFIG.assetsDir}/assets/background/custom-welcome-bg.png)`,
            ],
          }),
          pt: 5,
          pb: 5,
          pr: 3,
          gap: 5,
          borderRadius: 2,
          display: 'flex',
          height: { md: 1 },
          position: 'relative',
          pl: { xs: 3, md: 5 },
          alignItems: 'center',
          color: 'common.white',
          textAlign: { xs: 'center', md: 'left' },
          flexDirection: { xs: 'column', md: 'row' },
          border: `solid 1px ${theme.vars.palette.grey[800]}`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        <Typography variant="h3" sx={{ whiteSpace: 'pre-line', mb: 1 }}>
          {title}
        </Typography>

        {typeof description === 'string' ? (
  <Typography variant="body1" sx={{ opacity: 0.64, maxWidth: 600, ...(action && { mb: 3 }) }}>
    {description}
  </Typography>
) : (
  <Box sx={{ opacity: 0.64, maxWidth: 600, ...(action && { mb: 3 }) }}>
    {description}
  </Box>
)}


        {action && action}
      </Box>

      {img && <Box sx={{ maxWidth: 260 }}>{img}</Box>}
    </Box>
  );
}
