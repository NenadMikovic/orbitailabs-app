

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

export function LicensePlanCard({
  plan,
  price,
  caption,
  features = [],
  highlight = false,
  current = false,
  onUpgrade,
}) {
  const theme = useTheme();
 
  const planTitle = plan.charAt(0).toUpperCase() + plan.slice(1);

 const lightMode = theme.palette.mode === 'light';

const iconSrc = {
  starter: '/assets/icons/pricing/pricing-icon-01.svg',
  pro: '/assets/icons/pricing/pricing-icon-02.svg',
  elite: '/assets/icons/pricing/pricing-icon-03.svg',
}[plan];

  return (
    <Box
      sx={{
        p: 5,
        gap: 4,
        display: 'flex',
        borderRadius: 2,
        flexDirection: 'column',
        bgcolor: 'background.default',
        boxShadow: theme.vars.customShadows.card,
        transition: 'transform 0.3s ease',
        ...(highlight && {
          transform: 'scale(1.05)',
          zIndex: 1,
          boxShadow: `0 0 0 2px rgba(180, 80, 255, 0.3), 0 12px 32px rgba(180, 80, 255, 0.4)`,
        }),
      }}
    >
      {!(plan === 'free' || plan === 'dashboard') ? (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <SvgColor
  src={iconSrc}
  sx={{
    width: 64,
    height: 64,
    color: 'text.primary', // dynamic color
  }}
/>
    {current && <Label color="success">Current Plan</Label>}
  </Box>
) : null}




      <Stack spacing={1}>
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <Typography variant="h4">{planTitle}</Typography>
    {current && (plan === 'free' || plan === 'dashboard') && (
      <Label color="success">Current Plan</Label>
    )}
  </Box>
  <Typography variant="subtitle2">{caption}</Typography>
</Stack>



      <Box sx={{ display: 'flex' }}>
        <Typography variant="h4">$</Typography>
        <Typography variant="h2">{price}</Typography>
        <Typography
          component="span"
          sx={{
            ml: 1,
            alignSelf: 'center',
            typography: 'body2',
            color: 'text.disabled',
          }}
        >
          / month
        </Typography>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack spacing={2}>
        <Typography variant="overline">Features</Typography>
        {features.map((item) => {
  const isToken = item.toLowerCase().includes('token');
  const isAssistant = item.toLowerCase().includes('assistant');
  const isFree = plan === 'free';

  let icon = 'eva:checkmark-fill';
  let color;

  if (isToken) {
    icon = 'mdi:lightning-bolt';
    color = '#c16103';
  } else if (isAssistant && isFree) {
    icon = 'mdi:lock-outline'; // locked for free plan
    color = '#c16103';
  }

  return (
    <Box
      key={item}
      sx={{ display: 'flex', alignItems: 'center', gap: 1, typography: 'body2' }}
    >
      <Iconify icon={icon} width={16} color={color} />
      {item}
    </Box>
  );
})}


      </Stack>

      <Stack direction="row" spacing={2}>
  <Button
    fullWidth
    variant="outlined"
    color="inherit"
    size="large"
    onClick={() => console.log('Show all features')} // replace with actual handler
  >
    All Features
  </Button>

  <Button
    fullWidth
    size="large"
    variant={current ? 'outlined' : 'contained'}
    color={highlight ? 'primary' : 'inherit'}
    disabled={current}
    onClick={onUpgrade}
  >
    {current ? 'Current Plan' : 'Activate Plan'}
  </Button>
</Stack>

    </Box>
  );
}
