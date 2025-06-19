import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export function EcommerceCurrentBalance({
  sx,
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

  return (
    <Card sx={[{ p: 3 }, ...(Array.isArray(sx) ? sx : [sx])]} {...other}>
      <Box sx={{ mb: 1, typography: 'h6' }}>{title}</Box>
<Box component="span" sx={{ color: 'text.secondary' }}>
  {title === 'Starter'
    ? 'Essential Tools Unlocked'
    : title === 'Pro'
    ? 'Enhanced Power and Precision'
    : 'All Features. No Limits.'}
</Box>
      <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ typography: 'h3' }}>
  {fCurrency(currentBalance)} <Box component="span" sx={{ typography: 'subtitle2', ml: 0.5 }}>/month</Box>
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
    : title === 'Pro'
    ? 'Advanced Market Tools'
    : 'Advanced Market Tools'}
</Box>


  <Box component="span">{orderTotal}</Box>
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

  <Box component="span">{earning}</Box>
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

  <Box component="span">{refunded}</Box>
</Box>


        <Box sx={{ gap: 2, display: 'flex' }}>
          
          
          <Button fullWidth variant="contained" color="warning">
            Explore all Features
          </Button>

          <Button fullWidth variant="contained" color="primary">
            Get the Plan
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
