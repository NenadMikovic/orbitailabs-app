import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function EcommerceCurrentBalance(
  {
  sx,
  icon,
  title,
  earning,
  refunded,
  orderTotal,
  currentBalance,
  ...other
}) {
  const renderRow = (label, value) => (
    <Box
      sx={{
        display: 'flex',
        typography: 'body2',
        justifyContent: 'space-between',
      }}
    >
      <Box component="span" sx={{ color: 'text.secondary' }}>
        {label}
      </Box>

      <Box component="span">{fCurrency(value)}</Box>
    </Box>
  );
const theme = useTheme();
const isLight = theme.palette.mode === 'light';

  return (
    <Card sx={[{ p: 3 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <Box
  sx={{
    mb: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    typography: 'h6',
  }}
>
  {icon && (
    <Box
  sx={{
    width: 24,
    height: 24,
    backgroundColor: theme.palette.mode === 'light' ? 'text.primary' : '#fff',
    WebkitMask: `url(${icon}) no-repeat center`,
    WebkitMaskSize: 'contain',
    mask: `url(${icon}) no-repeat center`,
    maskSize: 'contain',
    mr: 1.5,
  }}
/>

  )}
  {title}
</Box>

<Box component="span" sx={{ color: 'text.secondary' }}>
  {title === 'Starter'
    ? 'Essential Tools Unlocked'
    : title === 'Free'
    ? 'Basic Access. Zero Cost.'
    : title === 'Next-Gen AI Dashboard'
    ? 'Advanced Market Tools & AI Assistant'
    : title === 'Pro'
    ? 'Enhanced Power and Precision'
    : 'All Features. No Limits.'}
</Box>
      <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ typography: 'h3' }}>
  {fCurrency(currentBalance)} <Box component="span" sx={{ typography: 'subtitle2', color: "text.secondary",ml: 0.5 }}>/month</Box>
</Box>


        <Box
  sx={{
    display: 'flex',
    typography: 'body2',
    justifyContent: 'space-between',
  }}
>
  
  <Box component="span" sx={{ color: 'text.secondary' }}>
  {title === 'Starter'
    ? 'Advanced Market Tools'
    : title === 'Free'
    ? 'Market Tools'
    : title === 'Pro'
    ? 'Advanced Market Tools'
    : 'Advanced Market Tools'}
</Box>


  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
  {orderTotal?.icon && <Iconify icon={orderTotal.icon} width={18} sx={{ color: orderTotal.color || 'inherit' }} />}
  <Box component="span">{orderTotal?.text}</Box>
  </Box>
</Box>
        <Box
  sx={{
    display: 'flex',
    typography: 'body2',
    justifyContent: 'space-between',
  }}
>
  <Box component="span" sx={{ color: 'text.secondary' }}>
    AI Assistant 
  </Box>

  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
  {earning?.icon && <Iconify icon={earning.icon} width={18} sx={{ color: earning.color || 'inherit' }} />}
  <Box component="span">{earning?.text}</Box>
</Box>

</Box>
        <Box
  sx={{
    display: 'flex',
    typography: 'body2',
    justifyContent: 'space-between',
  }}
>
  <Box component="span" sx={{ color: 'text.secondary' }}>
    Number of Tokens 
  </Box>

  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
  {refunded?.icon && <Iconify icon={refunded.icon} width={22} sx={{ color: refunded.color || 'inherit' }} />}
  <Box component="span">{refunded?.text}</Box>
</Box>
</Box>

        <Box sx={{ gap: 2, display: 'flex' }}>
          
          <Button fullWidth variant="outlined" sx={{
    borderColor: isLight ? '#B450FF' : '#D8B4FE',
        color: isLight ? 'primary'  : '#000000',
        fontWeight: 600,
        '&:hover': {
          backgroundColor: isLight ? 'rgba(180, 80, 255, 0.08)' : 'rgba(233, 213, 255, 0.12)',
          borderColor: isLight ? '#A040FF' : '#C084FC',
    },
  }}>
            Plan Features
          </Button>
          

           <Button fullWidth variant="contained" color="primary">
            Change Plan
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
