
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import {
  _ecommerceNewProducts,
} from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { MotivationIllustration } from 'src/assets/illustrations';

import { Iconify } from 'src/components/iconify';

import { EcommerceWelcome } from 'src/sections/overview/e-commerce/ecommerce-welcome';
import { EcommerceNewProducts } from 'src/sections/overview/e-commerce/ecommerce-new-products';
import { EcommerceCurrentBalance } from 'src/sections/overview/e-commerce/ecommerce-current-balance';

export default function LicenseActiveView({ license }) {
    
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

        
       
<Grid item xs={12} md={4}>
  <Card >
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Your Plan
      </Typography>
      <Typography variant="h6" gutterBottom>
        {license.plan}
      </Typography>

      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        License Code
      </Typography>
      <Typography variant="body1" gutterBottom>
        {license.license_code}
      </Typography>

      {license.expires_at && (
        <>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Expires
          </Typography>
          <Typography variant="body1" gutterBottom>
            {new Date(license.expires_at).toLocaleDateString()}
          </Typography>
        </>
      )}

      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Upgrade Plan
      </Button>
    </CardContent>
  </Card>
</Grid>

    </Grid>
</DashboardContent>

  );
}
