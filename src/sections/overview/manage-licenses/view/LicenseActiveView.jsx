
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import {
  _ecommerceNewProducts,
} from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { MotivationIllustration } from 'src/assets/illustrations';

import { Iconify } from 'src/components/iconify';
import { svgColorClasses } from 'src/components/svg-color';

import { AppWidget } from 'src/sections/overview/app/app-widget';
import { EcommerceWelcome } from 'src/sections/overview/e-commerce/ecommerce-welcome';
import { EcommerceNewProducts } from 'src/sections/overview/e-commerce/ecommerce-new-products';
import { EcommerceCurrentBalance } from 'src/sections/overview/e-commerce/ecommerce-current-balance';

export default function LicenseActiveView({ license }) {
    const theme = useTheme();
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
           img={<MotivationIllustration hideBackground />}
            />
            </Grid>
<Grid size={{ xs: 12, md: 4 }}>
          <EcommerceNewProducts list={_ecommerceNewProducts} />
        </Grid>

<Grid size={{ xs: 12, md: 6, lg: 6 }}>
          
            <AppWidget
              title="Your Plan"
              total={license.plan}
              icon="eos-icons:subscriptions-created"
              chart={{ series: 48 }}
            />
</Grid>
<Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <AppWidget
              title="License Code"
              total={license.license_code}
              icon="solar:key-linear"
              chart={{
                series: 75,
                colors: [theme.vars.palette.info.light, theme.vars.palette.info.main],
              }}
              sx={{
                bgcolor: 'info.dark',
                [`& .${svgColorClasses.root}`]: { color: 'info.light' },
              }}
            />
         
        
</Grid>
        <Grid size={12}>
            <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Upgrade Your Plan
            </Typography>
            <Typography
              sx={{ color: 'text.secondary' }}
            >Enhance your Stellaris Bot with advanced features and strategic advantages.</Typography>
          </Box>
</Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <EcommerceCurrentBalance
            title="Starter"
            earning="✔️ Included"
            refunded="⚡30 (per day)"
            orderTotal="✔️ Included"
            currentBalance={99}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <EcommerceCurrentBalance
            title="Pro"
            earning="✔️ Included"
            refunded='⚡50 (per day)'
            orderTotal="✔️ Included"
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
    title="Elite"
    earning="✔️ Included"
    refunded="⚡Unlimited"
    orderTotal="✔️ Included"
    currentBalance={199}
  />
</Grid>

  <Grid size={12}>
            <Box sx={{ mb: 2 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Start Simple. Grow Smart.
            </Typography>
            <Typography
              sx={{ color: 'text.secondary' }}
            >Start free, upgrade anytime for advanced features and full automation.</Typography>
          </Box>      
       </Grid>
       <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <EcommerceCurrentBalance
            title="Free"
            earning="🔒 Locked"
            refunded='⚡0 (per day)'
            orderTotal="🔒 Locked"
            currentBalance={0}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <EcommerceCurrentBalance
            title="Advanced Market Tools & AI Assistant"
            earning="✔️ Included"
            refunded='⚡20 (per day)'
            orderTotal="✔️ Included"
            currentBalance={49}
          />
        </Grid>
    </Grid>
</DashboardContent>

  );
}
