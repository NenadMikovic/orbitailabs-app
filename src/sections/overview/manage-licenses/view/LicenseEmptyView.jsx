
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import OpenAIBox from 'src/components/openai/OpenAIBox';

import { EcommerceWelcome } from 'src/sections/overview/e-commerce/ecommerce-welcome';
import { EcommerceCurrentBalance } from 'src/sections/overview/e-commerce/ecommerce-current-balance';

export default function LicenseEmptyView() {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
  return (
    
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
           <EcommerceWelcome
          title="Licenses & Plans"
          description={
          <><br />
       <Iconify icon="ep:info-filled" width={20} sx={{ mr: 1, verticalAlign: 'middle' }} />
        View your active plan, license keys, and included features. Easily upgrade to a higher tier or explore all available plans for more powerful tools and benefits.
         </>
          }
           // img={<MotivationIllustration hideBackground />}
            />
            </Grid >
<Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <OpenAIBox />
        </Grid>
<br />
<Grid size={{ xs: 12, md: 12 }}>
  <Typography variant="h4" component="h2">
  No Active License Detected
</Typography>
<br />
<Typography variant="h6" component="h2">
  Activate a plan below to unlock Stellaris and the full dashboard experience.
</Typography>
</Grid>
<br />
        <Grid size={12}>
            <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Stellaris Automated Trading Plans
            </Typography>
            <Typography
              sx={{ color: 'text.secondary' }}
            >Comprehensive access to the AI-powered trading bot and full dashboard suite.</Typography>
          </Box>
</Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <EcommerceCurrentBalance
            icon="/assets/icons/pricing/pricing-icon-01.svg"
            title="Starter"
            earning={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            refunded={{ icon: 'mdi:thunder', text: '30 (per day)', color: '#c16103'}}
            orderTotal={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            currentBalance={99}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <EcommerceCurrentBalance
          icon="/assets/icons/pricing/pricing-icon-02.svg"
            title="Pro"
            earning={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            refunded={{ icon: 'mdi:thunder', text: '50 (per day)', color: '#c16103'}}
            orderTotal={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            currentBalance={149}
          />
        </Grid>
        <Grid
  size={{ xs: 12, md: 6, lg: 4 }}
  sx={{
    borderRadius: 2,
    boxShadow:
      '0 0 0 2px rgba(180, 80, 255, 0.4), 0 0 16px rgba(180, 80, 255, 0.6)',
    transition: 'box-shadow 0.3s ease-in-out',
  }}
>
  <EcommerceCurrentBalance
  icon="/assets/icons/pricing/pricing-icon-03.svg"
    title="Elite"
    earning={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
    refunded={{ icon: 'mdi:thunder', text: 'Unlimited', color: '#c16103'}}
    orderTotal={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
    currentBalance={199}
  />
</Grid>
<br />
  <Grid size={12}>
            <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Dashboard Access Plans
            </Typography>
            <Typography
              sx={{ color: 'text.secondary' }}
            >Advanced trading metrics and real-time insights — for every trader.</Typography>
          </Box>      
       </Grid>
       <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <EcommerceCurrentBalance
            title="Free"
            earning={{ icon: 'material-symbols:lock', text: 'Locked', color: '#c16103'}}
            refunded={{ icon: 'mdi:thunder', text: '0 (per day)', color: '#c16103'}}
            orderTotal={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            currentBalance={0}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <EcommerceCurrentBalance
            title="Next-Gen AI Dashboard"
            earning={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            refunded={{ icon: 'mdi:thunder', text: '20 (per day)', color: '#c16103'}}
            orderTotal={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            currentBalance={49}
          />
        </Grid>
    </Grid>
</DashboardContent>

  );
}

