
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import OpenAIBox from 'src/components/openai/OpenAIBox';
import { svgColorClasses } from 'src/components/svg-color';
import { LicensePlanCard } from 'src/components/licenses-grid/LicensePlanCard';

import { AppWidget } from 'src/sections/overview/app/app-widget';
import { EcommerceWelcome } from 'src/sections/overview/e-commerce/ecommerce-welcome';

import { useAuthContext } from 'src/auth/hooks';

export default function LicenseActiveView({ license }) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

const [paddle, setPaddle] = useState(null);
const { user } = useAuthContext();
const email = license.user_email || user?.email;

useEffect(() => {
  if (typeof window !== 'undefined' && window.Paddle) {
    window.Paddle.Environment.set('sandbox'); // or remove this for production
    window.Paddle.Initialize({
      token: 'test_6529b59390838e87cb61779840b', // replace with your sandbox token
      eventCallback: (e) => console.log('Paddle Event:', e),
    });
  }
}, []);


const handleUpgrade = (plan, priceId) => {
  if (!window.Paddle || !email) {
    alert('Checkout not ready');
    return;
  }

  window.Paddle.Checkout.open({
    items: [
      {
        priceId,
        quantity: 1,
      },
    ],
    customer: {
      email,
    },
  });
};


  return (
    
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
           <EcommerceWelcome
          title="Manage Licenses"
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

{license.plan === 'free' ? (
  <Grid item xs={12}>
   <br /> <Typography variant="h4" component="h2" gutterBottom>
      No Active License Detected
    </Typography>
    <Typography variant="h6" component="h2">
      Activate a plan below to unlock Stellaris and the full dashboard experience.
    </Typography><br />
  </Grid>
) : (
  <>
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <Box
        sx={{
          mb: 2,
          borderRadius: 2,
          boxShadow: '0 0 0 2px rgba(180, 80, 255, 0.4)',
          transition: 'box-shadow 0.3s ease-in-out',
        }}
      >
        <AppWidget
          title="Your Plan"
          total={license.plan.charAt(0).toUpperCase() + license.plan.slice(1)}
          icon="eos-icons:subscriptions-created"
          centerIcon="tabler:packages"
          chart={{ series: 100 }}
          sx={{
            bgcolor: '#1c1247',
            [`& .${svgColorClasses.root}`]: { color: 'info.light' },
          }}
        />
      </Box>
    </Grid>

    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <Box
        sx={{
          mb: 2,
          borderRadius: 2,
          boxShadow: '0 0 0 2px rgba(180, 80, 255, 0.4)',
          transition: 'box-shadow 0.3s ease-in-out',
        }}
      >
        <AppWidget
          title="License Code"
          total={license.license_code}
          icon="solar:key-linear"
          centerIcon="carbon:license"
          chart={{ series: 100 }}
          sx={{
            bgcolor: '#1c1247',
            [`& .${svgColorClasses.root}`]: { color: 'info.light' },
          }}
        />
      </Box>
    </Grid>

    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
      <Box
        sx={{
          mb: 2,
          borderRadius: 2,
          boxShadow: '0 0 0 2px rgba(180, 80, 255, 0.4)',
          transition: 'box-shadow 0.3s ease-in-out',
        }}
      >
        <AppWidget
          title="Expiration Date"
          total={license.expires_at}
          icon="mdi:clock-outline"
          centerIcon="mdi:timer-sand"
          chart={{ series: 100 }}
          sx={{
            bgcolor: '#1c1247',
            [`& .${svgColorClasses.root}`]: { color: 'info.light' },
          }}
        />
      </Box>
    </Grid>
  </>
)}

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
          {/** <EcommerceCurrentBalance
            icon="/assets/icons/pricing/pricing-icon-01.svg"
            title="Starter"
            earning={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            refunded={{ icon: 'mdi:thunder', text: '30 (per day)', color: '#c16103'}}
            orderTotal={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            currentBalance={99}
          /> */}

          <LicensePlanCard
  plan="starter"
  current={license.plan === 'starter'}
  price={99}
  caption="Essential Tools Unlocked"
  features={['Starter Bot', 'Advanced Market Tools', 'AI Assistant', '30 Tokens per day']}
  onUpgrade={() =>
    handleUpgrade('starter', 'pri_01jye7srkkykf2g5t5940d4ygz') // your actual Paddle price ID
   } 
/>
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          {/**<EcommerceCurrentBalance
          icon="/assets/icons/pricing/pricing-icon-02.svg"
            title="Pro"
            earning={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            refunded={{ icon: 'mdi:thunder', text: '50 (per day)', color: '#c16103'}}
            orderTotal={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            currentBalance={149}
          />*/}

          <LicensePlanCard
  plan="pro"
  current={license.plan === 'pro'}
  price={149}
  caption="Enhanced Power and Precision"
  features={['Starter & Pro Bot', 'Advanced Market Tools', 'AI Assistant', '50 Tokens per day']}
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
 {/**  <EcommerceCurrentBalance
  icon="/assets/icons/pricing/pricing-icon-03.svg"
    title="Elite"
    earning={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
    refunded={{ icon: 'mdi:thunder', text: 'Unlimited', color: '#c16103'}}
    orderTotal={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
    currentBalance={199}
  />*/}

  <LicensePlanCard
  plan="elite"
  current={license.plan === 'elite'}
  price={199}
  caption="All Features. No Limits."
  features={['All Bots', 'Advanced Market Tools', 'AI Assistant', 'Unlimited Tokens']}
  highlight
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

<LicensePlanCard
  plan="free"
  current={license.plan === 'free'}
  price={0}
  caption="Basic Access. Zero Cost."
  features={['Market Tools', 'AI Assistant', '0 Tokens per day']}
  onUpgrade={() => console.log('Upgrade to Dashboard AI')}
/>


         {/**  <EcommerceCurrentBalance
            title="Free"
            earning={{ icon: 'material-symbols:lock', text: 'Locked', color: '#c16103'}}
            refunded={{ icon: 'mdi:thunder', text: '0 (per day)', color: '#c16103'}}
            orderTotal={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            currentBalance={0}
          />*/}
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>

<LicensePlanCard
  plan="dashboard"
  current={license.plan === 'dashboard'}
  price={49}
  caption="AI-powered Insights"
  features={['Advanced Market Tools', 'AI Assistant', '20 Tokens per day']}
  onUpgrade={() => console.log('Upgrade to Dashboard AI')}
/>


         {/**   <EcommerceCurrentBalance
            title="Next-Gen AI Dashboard"
            earning={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            refunded={{ icon: 'mdi:thunder', text: '20 (per day)', color: '#c16103'}}
            orderTotal={{ icon: 'icomoon-free:checkmark', text: 'Included', color: '#7635dc' }}
            currentBalance={49}
          />*/}
        </Grid>
    </Grid>
</DashboardContent>

  );
}
