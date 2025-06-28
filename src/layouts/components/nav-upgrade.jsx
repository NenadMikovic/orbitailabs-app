import { m } from 'framer-motion';
import { useState, useEffect } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';
import { supabase } from 'src/lib/supabase';

import { Label } from 'src/components/label';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export function NavUpgrade({ sx, ...other }) {
  const [profile, setProfile] = useState(null);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProfile = async () => {
  if (!user?.id) return;

  // 1. Get profile data
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select('display_name, photo_url')
    .eq('id', user.id)
    .single();

  // 2. Get license plan from licenses
  const { data: licenseData, error: licenseError } = await supabase
    .from('licenses')
    .select('plan')
    .eq('user_id', user.id)
    .eq('is_active', true) // optionally only active ones
    .single();

  if (!profileError && !licenseError) {
  const plan = licenseData?.plan ?? 'Free';

  const formattedPlan = plan.charAt(0).toUpperCase() + plan.slice(1).toLowerCase();

  const planColor = {
    free: 'default',
    dashboard: 'success',
    starter: 'success',
    pro: 'info',
    elite: 'secondary', // or use a custom color like '#7E57C2' for deep purple
  }[plan.toLowerCase()] || 'default';

  setProfile({
    ...profileData,
    planLabel: formattedPlan,
    planColor,
  });
}
};
  
    fetchProfile();
  }, [user?.id]);

  return (
    <Box
      sx={[{ px: 2, py: 5, textAlign: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar src={profile?.photo_url} alt={user?.displayName} sx={{ width: 48, height: 48 }}>
            {user?.displayName?.charAt(0).toUpperCase()}
          </Avatar>

          <Label
  color={profile?.planColor}
  variant="filled"
  sx={{
    top: -6,
    px: 0.5,
    left: 40,
    height: 20,
    position: 'absolute',
    borderBottomLeftRadius: 2,
    textTransform: 'capitalize',
  }}
>
  {profile?.planLabel}
</Label>

        </Box>

        <Box sx={{ mb: 2, mt: 1.5, width: 1 }}>
          <Typography
            variant="subtitle2"
            noWrap
            sx={{ mb: 1, color: 'var(--layout-nav-text-primary-color)' }}
          >
            {user?.displayName}
          </Typography>

          <Typography
            variant="body2"
            noWrap
            sx={{ color: 'var(--layout-nav-text-disabled-color)' }}
          >
            {user?.email}
          </Typography>
        </Box>

       {profile?.planLabel?.toLowerCase() !== 'elite' && (
  <Button
    variant="contained"
    href="https://www.orbitailabs.com/#pricing"
    target="_blank"
    rel="noopener noreferrer"
  >
    Upgrade to Elite
  </Button>
)}
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function UpgradeBlock({
  sx,
  title = 'OrbitAI Assistant',
  subtitle = 'Your daily tokens reset every 24 hours and are used first. Bonus tokens are only used when you exceed your daily limit — they never expire.',
  buttonText = 'Buy Tokens',
  onButtonClick,
  buttonHref,
  ...other
}) {

  return (
    <Box
      sx={[
        (theme) => ({
          ...theme.mixins.bgGradient({
            images: [
              `linear-gradient(135deg, ${varAlpha(theme.vars.palette.error.lightChannel, 0.92)}, ${varAlpha(theme.vars.palette.secondary.darkChannel, 0.92)})`,
              `url(${CONFIG.assetsDir}/assets/background/background-7.webp)`,
            ],
          }),
          px: 3,
          py: 4,
          borderRadius: 2,
          position: 'relative',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {/* Border */}
      <Box
        sx={(theme) => ({
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          borderRadius: 2,
          position: 'absolute',
          border: `solid 3px ${varAlpha(theme.vars.palette.common.whiteChannel, 0.16)}`,
        })}
      />

      {/* Animated Rocket */}
      <Box
        component={m.img}
        animate={{ y: [12, -12, 12] }}
        transition={{
          duration: 8,
          ease: 'linear',
          repeat: Infinity,
          repeatDelay: 0,
        }}
        alt="Small Rocket"
        src={`${CONFIG.assetsDir}/assets/illustrations/illustration-rocket-small.webp`}
        sx={{
          right: 0,
          width: 112,
          height: 112,
          position: 'absolute',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Box component="span" sx={{ typography: 'h5', color: 'common.white' }}>
          {title}
        </Box>

        <Box
          component="span"
          sx={{
            mb: 2,
            mt: 0.5,
            color: 'common.white',
            typography: 'subtitle2',
            maxWidth: { xs: '320px', sm: '550px' },
          }}
        >
          {subtitle}
        </Box>

        <Button
          variant="contained"
          size="small"
          color="warning"
          onClick={onButtonClick}
          href={buttonHref}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}