import { useState } from 'react';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

const DURATION_OPTIONS_BY_PLAN = {
  starter: [
    { label: '1 Month', price: 99, discount: 0, priceId: 'pri_01jye7srkkykf2g5t5940d4ygz' },
    { label: '3 Months', price: 249, discount: 16, priceId: 'pri_01jyfa2bfmnbnwdj10hh4226t0' },
    { label: '6 Months', price: 449, discount: 24, priceId: 'pri_01jyfh8c377be4315j22v0c9pn' },
  ],
  pro: [
    { label: '1 Month', price: 149, discount: 0, priceId: 'PRO_PRICEID_1M' },
    { label: '3 Months', price: 349, discount: 21, priceId: 'PRO_PRICEID_3M' },
    { label: '6 Months', price: 649, discount: 27, priceId: 'PRO_PRICEID_6M' },
  ],
  elite: [
    { label: '1 Month', price: 199, discount: 0, priceId: 'ELITE_PRICEID_1M' },
    { label: '3 Months', price: 449, discount: 24, priceId: 'ELITE_PRICEID_3M' },
    { label: '6 Months', price: 849, discount: 29, priceId: 'ELITE_PRICEID_6M' },
  ],
  free: [
  { label: '', price: 0, discount: 0, priceId: null },
],
  dashboard: [
    { label: '1 Month', price: 49, discount: 0, priceId: 'DASHBOARD_PRICEID_1M' },
  ],
};

export function LicensePlanCard({
  plan,
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

  const isFree = plan === 'free';
  const durationOptions = DURATION_OPTIONS_BY_PLAN[plan] || [];
  const hideDurationSelector = plan === 'dashboard';
  const [selected, setSelected] = useState(durationOptions[0]);

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
      {!(isFree || plan === 'dashboard') && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <SvgColor src={iconSrc} sx={{ width: 64, height: 64, color: 'text.primary' }} />
          {current && <Label color="success">Current Plan</Label>}
        </Box>
      )}

      <Stack spacing={1}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4">{planTitle}</Typography>
          {current && (isFree || plan === 'dashboard') && (
            <Label color="success">Current Plan</Label>
          )}
        </Box>
        <Typography variant="subtitle2">{caption}</Typography>
      </Stack>

      {!isFree && !hideDurationSelector && (
  <Stack spacing={1} direction="row">
    {durationOptions.map((opt) => (
      <Button
        key={opt.label}
        size="small"
        variant={selected?.label === opt.label ? 'contained' : 'outlined'}
        onClick={() => setSelected(opt)}
        sx={{ textTransform: 'none', fontWeight: 500 }}
      >
        {opt.label}
      </Button>
    ))}
  </Stack>
)}


      <Fade in>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
  <Typography variant="h4" sx={{ mt: 0.5, mr: 0.5, lineHeight: 1 }}>
    €
  </Typography>
  <Typography variant="h2" sx={{ lineHeight: 1 }}>
    {isFree ? 0 : selected?.price}
  </Typography>
</Box>

          <Typography
  component="span"
  sx={{ ml: 1, mt: 1, typography: 'body2', color: 'text.disabled' }}
>
  {selected?.label === '3 Months' || selected?.label === '6 Months'
    ? `/ ${selected.label.toLowerCase()}`
    : '/ month'}
</Typography>



        </Box>
      </Fade>

      {highlight ? (
  <Box sx={{ minHeight: 24 }}>
    {selected?.discount ? (
      <Typography variant="caption" color="success.main">
        Save {selected.discount}% with {selected.label.toLowerCase()} billing!
      </Typography>
    ) : (
      <Typography variant="caption" color="text.disabled">
        Upgrade to save more!
      </Typography>
    )}
  </Box>
) : (
  !!selected?.discount && (
    <Typography variant="caption" color="success.main">
      Save {selected.discount}% with {selected.label.toLowerCase()} billing!
    </Typography>
  )
)}




      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack spacing={2}>
        <Typography variant="overline">Features</Typography>
        {features.map((item) => {
          const isToken = item.toLowerCase().includes('token');
          const isAssistant = item.toLowerCase().includes('assistant');

          let icon = 'eva:checkmark-fill';
          let color;

          if (isToken) {
            icon = 'mdi:lightning-bolt';
            color = '#c16103';
          } else if (isAssistant && isFree) {
            icon = 'mdi:lock-outline';
            color = '#c16103';
          }

          return (
            <Box key={item} sx={{ display: 'flex', alignItems: 'center', gap: 1, typography: 'body2' }}>
              <Iconify icon={icon} width={16} color={color} />
              {item}
            </Box>
          );
        })}
      </Stack>

      <Stack direction="row" spacing={2}>
        {!isFree && (
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            size="large"
            onClick={() => console.log('Show all features')}
          >
            All Features
          </Button>
        )}

        <Button
          fullWidth
          size="large"
          variant={current ? 'outlined' : 'contained'}
          color={highlight ? 'primary' : 'inherit'}
          disabled={current}
          onClick={() => !isFree && onUpgrade?.(plan, selected?.priceId)}
        >
          {current ? 'Current Plan' : 'Activate Plan'}
        </Button>
      </Stack>
    </Box>
  );
}
