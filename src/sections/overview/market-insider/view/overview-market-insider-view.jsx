'use client';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from '@mui/material';

import { supabase } from 'src/lib/supabase';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import ChatAssistant from 'src/components/chat/ChatAssistant';

import { EcommerceWelcome } from 'src/sections/overview/e-commerce/ecommerce-welcome';

import { useAuthContext } from 'src/auth/hooks';

export function MarketInsiderView() {
  const [license, setLicense] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchLicense = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('licenses')
        .select('plan')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching license:', error);
      } else {
        setLicense(data);
      }
    };

    fetchLicense();
  }, [user]);

  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const userPlan = license?.plan || 'free';

         return (
        <DashboardContent maxWidth="xl">
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                   <EcommerceWelcome
                  title="Market Insider"
                  description={
                  <><br />
               <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
      <Iconify icon="ep:info-filled" width={30} sx={{ mt: '3px' }} />
      <Typography variant="body1">
        Get weekly expert insights on the markets that matter. <br />
        Each weekend, we highlight 5–6 symbols expected to show the highest volatility—along with in-depth analysis, key drivers, expected movements, and actionable price levels. Paired with your personal AI Assistant, you’ll have guidance and clarity for the week ahead.
      </Typography>
    </Box>
                 </>
                  }
                    />
                    </Grid >
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                 <ChatAssistant pageContext="OrbitAI Labs license management, subscription plans, activation, expiration, and upgrades." />
                </Grid>

<Grid size={12}>
  <TableContainer component={Paper} sx={{ mt: 4 }}>
    <Table>
      <TableHead>
  <TableRow>
    <TableCell>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="mdi:currency-usd" width={18} />
        <Typography variant="subtitle2">Symbol</Typography>
      </Box>
    </TableCell>
    <TableCell>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="material-symbols:insights" width={18} />
        <Typography variant="subtitle2">Expectations</Typography>
      </Box>
    </TableCell>
    <TableCell>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="mdi:lightning-bolt" width={18} />
        <Typography variant="subtitle2">Impact Drivers</Typography>
      </Box>
    </TableCell>
    <TableCell>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="material-symbols:warning-outline" width={18} />
        <Typography variant="subtitle2">Volatility Outlook</Typography>
      </Box>
    </TableCell>
    <TableCell>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Iconify icon="mdi:lightbulb-on" width={18} />
        <Typography variant="subtitle2">Summary & Trade Ideas</Typography>
      </Box>
    </TableCell>
  </TableRow>
</TableHead>


      <TableBody>
        {[
          {
            symbol: 'EUR/USD',
            expectations: 'Slight bounce in euro vs weaker USD forecast.',
            impact: 'Cooler U.S. inflation data suggests earlier Fed cuts. Euro possibly supported by European risk flow.',
            volatility: 'Elevated around major U.S. data releases (Initial Claims, Durable Orders on June 21).',
            trade: 'BUY EUR/USD on dips ahead of U.S. data.',
          },
          {
            symbol: 'S&P 500',
            expectations: 'Range‑bound with bias down.',
            impact: 'Geopolitical tension + Fed pause = defensive/rotation into safe‑havens.',
            volatility: 'High — VIX spiked ~15% recently.',
            trade: 'SELL rallies, short-term positions favored.',
          },
          {
            symbol: 'Oil (Brent)',
            expectations: 'Likely to remain elevated, $75–80 range.',
            impact: 'Israel‑Iran conflict risk & Strait of Hormuz concerns. + supply worries.',
            volatility: 'Very high — recent surge ~7–13%, prone to geopolitical headlines.',
            trade: 'BUY dips near $70; stop-loss ~$67.',
          },
          {
            symbol: 'Gold (XAU/USD)',
            expectations: 'Bullish continuation, testing all-time highs.',
            impact: 'Safe-haven flows from Middle East tension + dovish Fed outlook.',
            volatility: 'Elevated around Fed commentary or geopolitical escalations.',
            trade: 'BUY breaks above $3,440; partial profit near $3,500.',
          },
          {
            symbol: 'Bitcoin (BTC)',
            expectations: 'Consolidation near $105–110k.',
            impact: 'ETF inflows + macro uncertainty supportive.',
            volatility: 'Medium — news-dependent but less sensitive to geopolitical flare-ups.',
            trade: 'HOLD / small BULL bias; consider long above $110k.',
          },
          {
            symbol: 'Ethereum (ETH)',
            expectations: 'Tracking Bitcoin’s trend with similar tone.',
            impact: 'Same macro catalysts + post-merge flow.',
            volatility: 'Medium — similar to BTC.',
            trade: 'HOLD for upside; long above $2,600 could follow BTC.',
          },
        ].map((row) => (
    <TableRow key={row.symbol}>
      <TableCell>{row.symbol}</TableCell>

      <TableCell>
        {userPlan === 'free' ? (
          <Typography color="text.secondary" sx={{ fontStyle: 'italic', opacity: 0.5 }}>
            🔒 Upgrade to view
          </Typography>
        ) : (
          row.expectations
        )}
      </TableCell>

      <TableCell>{row.impact}</TableCell>

      <TableCell>{row.volatility}</TableCell>

      <TableCell>
        {userPlan === 'free' ? (
          <Typography color="text.secondary" sx={{ fontStyle: 'italic', opacity: 0.5 }}>
            🔒 Premium insight
          </Typography>
        ) : (
          <Typography color="#5EA7FF" fontWeight="bold">
            {row.trade}
          </Typography>
        )}
      </TableCell>
    </TableRow>
  ))}
</TableBody>
    </Table>
  </TableContainer>
  <Box sx={{ mt: 4, p: 2, borderRadius: 2, backgroundColor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
  <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
    ⚠️ <strong>Disclaimer:</strong> The information provided is for educational and informational purposes only. It does not constitute financial advice or investment recommendations. You are solely responsible for your trading decisions.
  </Typography>
</Box>

</Grid>


                </Grid>
                </DashboardContent>
         )
}