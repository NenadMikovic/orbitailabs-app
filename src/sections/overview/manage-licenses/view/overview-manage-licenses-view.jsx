'use client';

import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';

import { supabase } from 'src/lib/supabase'; // adjust path if needed

import { useAuthContext } from 'src/auth/hooks'; // assuming you're using auth context

import LicenseEmptyView from './LicenseEmptyView';   // UI for no license
import LicenseActiveView from './LicenseActiveView'; // UI for active license

// ----------------------------------------------------------------------

export function OverviewManageLicensesView() {
  const { user } = useAuthContext();
  const [license, setLicense] = useState(null);
  const [loading, setLoading] = useState(true);
  

useEffect(() => {
  const fetchLicense = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .maybeSingle(); // safer than .single()

    if (data && !error) {
      setLicense(data);
    } else {
      setLicense(null);
    }

    setLoading(false);
  };

  fetchLicense();
}, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
    {loading ? (
      <Typography>Loading license...</Typography>
    ) : license ? (
      <LicenseActiveView license={license} />
    ) : (
      <LicenseEmptyView />
    )}
    </>
    /** <DashboardContent maxWidth="xl">
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          {/** <EcommerceWelcome
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

        <Grid size={{ xs: 12, md: 4 }}>
          <EcommerceWidgetSummary
            title="Product sold"
            percent={2.6}
            total={765}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <EcommerceWidgetSummary
            title="Total balance"
            percent={-0.1}
            total={18765}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <EcommerceWidgetSummary
            title="Sales profit"
            percent={0.6}
            total={4876}
            chart={{
              colors: [theme.palette.error.light, theme.palette.error.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 75, 70, 50, 28, 7, 64],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <EcommerceSaleByGender
            title="Sale by gender"
            total={2324}
            chart={{
              series: [
                { label: 'Mens', value: 25 },
                { label: 'Womens', value: 50 },
                { label: 'Kids', value: 75 },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <EcommerceYearlySales
            title="Yearly sales"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  name: '2022',
                  data: [
                    {
                      name: 'Total income',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: 'Total expenses',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  name: '2023',
                  data: [
                    {
                      name: 'Total income',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: 'Total expenses',
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <EcommerceSalesOverview title="Sales overview" data={_ecommerceSalesOverview} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <EcommerceCurrentBalance
            title="Current balance"
            earning={25500}
            refunded={1600}
            orderTotal={287650}
            currentBalance={187650}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <EcommerceBestSalesman
            title="Best salesman"
            tableData={_ecommerceBestSalesman}
            headCells={[
              { id: 'name', label: 'Seller' },
              { id: 'category', label: 'Product' },
              { id: 'country', label: 'Country', align: 'center' },
              { id: 'totalAmount', label: 'Total', align: 'right' },
              { id: 'rank', label: 'Rank', align: 'right' },
            ]}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <EcommerceLatestProducts title="Latest products" list={_ecommerceLatestProducts} /> 
        </Grid>
      </Grid>
    </DashboardContent> */
  );
}
