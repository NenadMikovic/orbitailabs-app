'use client';

import { DateTime } from 'luxon';
import { Icon } from '@iconify/react';
import { useRef , useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import {
  Box,
  Grid,
  Select,
  MenuItem,
  useTheme,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import ChatAssistant from 'src/components/chat/ChatAssistant';

import { AppWidgetSummary } from 'src/sections/overview/app//app-widget-summary';
import { EcommerceWelcome } from 'src/sections/overview/e-commerce/ecommerce-welcome';
import { EcommerceYearlySales } from 'src/sections/overview/e-commerce/ecommerce-yearly-sales';

import { useAuthContext } from 'src/auth/hooks';



const forexSessions = [
  {
    name: 'Sydney',
    open: 7,
    close: 16,
    regionZone: 'Australia/Sydney',
    color: '#60A5FA',
    flagIcon: 'circle-flags:au',
  },
  {
    name: 'Tokyo',
    open: 9,
    close: 18,
    regionZone: 'Asia/Tokyo',
    color: '#F472B6',
    flagIcon: 'circle-flags:jp',
  },
  {
    name: 'London',
    open: 8,
    close: 17,
    regionZone: 'Europe/London',
    color: '#3B82F6',
    flagIcon: 'circle-flags:gb',
  },
  {
    name: 'New York',
    open: 8,
    close: 17,
    regionZone: 'America/New_York',
    color: '#22C55E',
    flagIcon: 'circle-flags:us',
  },
];

const filteredTimeZones = [
  // 🌎 America
  'Pacific/Midway',                // GMT -11
  'Pacific/Honolulu',              // Hawaii (GMT -10)
  'America/Adak',                  // Aleutian Islands (GMT -9)
  'America/Anchorage',            // Alaska (GMT -8)
  'America/Los_Angeles',          // Los Angeles (GMT -7)
  'America/Denver',               // Denver (GMT -6)
  'America/Chicago',              // Chicago (GMT -5)
  'America/New_York',             // New York (GMT -4)
  'America/Puerto_Rico',          // Puerto Rico (GMT -4)
  'America/Argentina/Buenos_Aires', // Buenos Aires (GMT -3)
  'America/Sao_Paulo',            // Rio de Janeiro (GMT -3)

  // 🌍 Europe
  'Europe/London',                // London (GMT +1)
  'Europe/Berlin',                // Berlin (GMT +2)
  'Europe/Moscow',                // Moscow (GMT +3)

  // 🇦🇺 Australia / Oceania
  'Australia/Darwin',             // Darwin (GMT +9:30)
  'Australia/Adelaide',           // Adelaide (GMT +9:30)
  'Australia/Brisbane',           // Brisbane (GMT +10)
  'Australia/Sydney',             // Sydney (GMT +10)

  // 🌏 Asia
  'Asia/Tehran',                  // Tehran (GMT +3:30)
  'Asia/Dubai',                   // Dubai (GMT +4)
  'Asia/Kabul',                   // Kabul (GMT +4:30)
  'Asia/Karachi',                 // Karachi (GMT +5)
  'Asia/Kolkata',                 // Kolkata/Mumbai (GMT +5:30)
  'Asia/Dhaka',                   // Dhaka (GMT +6)
  'Asia/Yangon',                  // Yangon (GMT +6:30)
  'Asia/Bangkok',                 // Bangkok (GMT +7)
  'Asia/Singapore',               // Singapore (GMT +8)
  'Asia/Tokyo',                   // Tokyo (GMT +9)

  // 🌍 Africa
  'Africa/Accra',                 // Accra (GMT +0)
  'Africa/Lagos',                 // Lagos (GMT +1)
  'Africa/Johannesburg',          // Johannesburg (GMT +2)
  'Africa/Cairo',                 // Cairo (GMT +3)
  'Africa/Nairobi',               // Nairobi (GMT +3)
  'Africa/Kampala',               // Kampala (GMT +3)

  // 🌐 UTC & Pacific
  'Etc/UTC',                      // UTC (GMT +0)
  'Atlantic/Cape_Verde',          // Cape Verde (GMT -1)
  'Pacific/Fiji',                 // Fiji (GMT +12)
  'Pacific/Auckland',             // Auckland (GMT +12)
  'Pacific/Kiritimati',           // Kiritimati (GMT +14)
];



export function SessionsView() {
  const { user } = useAuthContext();
  const theme = useTheme();
  const [selectedZone, setSelectedZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [timelineData, setTimelineData] = useState([]);

  useEffect(() => {

    const results = forexSessions.map((session) => {
  const openInRegion = DateTime.fromObject(
    { hour: session.open, minute: 0 },
    { zone: session.regionZone }
  ).setZone(selectedZone);

  const closeInRegion = DateTime.fromObject(
    { hour: session.close, minute: 0 },
    { zone: session.regionZone }
  ).setZone(selectedZone);

  let start = openInRegion.hour;
  let end = closeInRegion.hour;
  const crossesMidnight = end < start;
  if (crossesMidnight) end += 24;

  const nowInSessionZone = DateTime.now().setZone(session.regionZone);

const isOpen = session.crossesMidnight
  ? nowInSessionZone >= DateTime.fromObject({ hour: session.open }, { zone: session.regionZone }) ||
    nowInSessionZone < DateTime.fromObject({ hour: session.close }, { zone: session.regionZone })
  : nowInSessionZone >= DateTime.fromObject({ hour: session.open }, { zone: session.regionZone }) &&
    nowInSessionZone < DateTime.fromObject({ hour: session.close }, { zone: session.regionZone });


  return {
    ...session,
    start,
    end,
    crossesMidnight,
    isOpen,
    openFormatted: openInRegion.toFormat('hh:mm a'),
    closeFormatted: closeInRegion.toFormat('hh:mm a'),
    offsetLabel: openInRegion.offsetNameShort,
  };
});


    setTimelineData(results);
    // Update every minute to keep the marker accurate
   
const updateMarkerPosition = () => {
  if (timelineRef.current) {
    const { offsetLeft, offsetWidth } = timelineRef.current;
    const now = DateTime.now().setZone(selectedZone);
    const percentOfDay =
      (now.hour + now.minute / 60) / 24;
    const left = offsetLeft + offsetWidth * percentOfDay;
    setMarkerLeft(left);
  }
};

updateMarkerPosition();
const interval = setInterval(() => {
  updateMarkerPosition();
  // ...existing timelineData update here
}, 60 * 1000);


    return () => clearInterval(interval); // Cleanup on unmount
  }, [selectedZone]);

  const timeZones = filteredTimeZones;
  const currentTimePercentage =
    ((DateTime.now().setZone(selectedZone).hour +
      DateTime.now().setZone(selectedZone).minute / 60) /
      24) *
    100;

    const timelineRef = useRef(null);
    const [markerLeft, setMarkerLeft] = useState(0);

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <EcommerceWelcome
            title="Global Sessions"
            description={
              <>
                <br />
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <Iconify icon="ep:info-filled" width={30} sx={{ mt: '3px' }} />
                  <Typography variant="body1">
                    Current global session activity and overlap windows at a glance. Built on
                    accurate data insights to enhance trading performance for Stellaris users.
                  </Typography>
                </Box>
              </>
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4, lg: 4 }}>
          <ChatAssistant pageContext="OrbitAI Labs license management, subscription plans, activation, expiration, and upgrades." />
        </Grid>

        <Grid size={{ xs: 12, md: 12 }}>
          {/* Main container for timeline, sessions, and volatility. Set to relative for absolute positioning of marker */}
          <Box sx={{ mt: 4, backgroundColor: '#111827', borderRadius: 2, p: 3, position: 'relative' }}>
            {/* Time Zone Selector */}
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel id="timezone-label">Select Time Zone</InputLabel>
              <Select
                labelId="timezone-label"
                value={selectedZone}
                label="Select Time Zone"
                onChange={(e) => setSelectedZone(e.target.value)}
                sx={{
    color: theme.palette.mode === 'light' ? '#fff' : 'common.white',
    fontWeight: 500,
  }}
              >
                {timeZones.map((zone) => (
                  <MenuItem key={zone} value={zone}>
                    {zone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* YELLOW MARKER LINE - Single line for the whole timeline */}
            <Box
  sx={{
    position: 'absolute',
    top: 138,
    left: markerLeft + 40,
    height: 475,
    width: 2,
    background: 'linear-gradient(to bottom, #FACC15 90%, transparent)',
    zIndex: 5,
  }}
/>



            {/* YELLOW MARKER CIRCLE (time label) */}
            <Box
  sx={{
    position: 'absolute',
    top: 130, // slightly above the line
    left: markerLeft + 16,
    zIndex: 6,
    backgroundColor: '#FACC15',
    color: 'black',
    borderRadius: '10%',
    width: 48,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 600,
    boxShadow: '0 0 4px rgba(0,0,0,0.3)',
  }}
>
  {DateTime.now().setZone(selectedZone).toFormat('HH:mm')}
</Box>


            {/* Timeline Axis and Sessions Container */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Timeline Hour Labels */}
              <Box sx={{ display: 'flex', position: 'relative', minHeight: 60, gap: 5, mt: -2 }}>
                {/* Spacer for flag column */}
                <Box sx={{ minWidth: 60, flexShrink: 0, mr: 2 }} />{' '}
                {/* Added margin-right for spacing */}
                {/* Hour labels container */}
                <Box ref={timelineRef} sx={{ flexGrow: 1, position: 'relative' }}>
                  <Box sx={{ display: 'flex' }}>
                    {[...Array(24).keys()].map((h) => (
                      <Box key={h} sx={{ flex: 1, textAlign: 'center' }}>
                        <Typography
  variant="caption"
  sx={{
    color: theme.palette.mode === 'light' ? '#fff' : 'common.white',
    fontWeight: 500,
}}
>
  {h % 2 === 0 ? h : ''}
</Typography>

                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* Session bars */}
              {timelineData.map((session) => (
                <Box
                  key={session.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    mb: 0,
                  }}
                >
                  {/* Flag + Info column (left) */}
                  <Box sx={{ minWidth: 60, textAlign: 'center', flexShrink: 0 }}>
                    <Icon icon={session.flagIcon} width={36} height={36} />
                    <Typography variant="subtitle2" sx={{ color: 'white' }}>
                      {session.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'gray' }}>
                      {session.openFormatted} - {session.closeFormatted}
                    </Typography>
                  </Box>

                  {/* Session bar (right) */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: session.isOpen ? 'success.main' : 'text.secondary',
                        mb: 0.5,
                      }}
                    >
                      {session.name} Session — {session.isOpen ? 'OPEN' : 'CLOSED'}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        flexGrow: 1,
                        height: 12,
                        backgroundColor: '#1F2937',
                        borderRadius: 1,
                      }}
                    >
                      {[...Array(24).keys()].map((h) => {
                        const start = session.start;
                        const end = session.end;
                        // Determine if the current hour block is active
                        const virtualHour = h < session.start ? h + 24 : h;
const isActive = virtualHour >= session.start && virtualHour < session.end;


                        return (
                          <Box
                            key={h}
                            sx={{
                              flex: 1,
                              backgroundColor: isActive ? session.color : 'transparent',
                              borderTopLeftRadius: h === start ? 4 : 0,
                              borderBottomLeftRadius: h === start ? 4 : 0,
                              borderTopRightRadius: h === (end - 1) % 24 ? 4 : 0,
                              borderBottomRightRadius: h === (end - 1) % 24 ? 4 : 0,
                            }}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

       {/* Volume Curve Placeholder */}
           <Box mt={6}>
  <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
    Market Sentiment (Coming Soon)
  </Typography>
  <Box
    sx={{
      height: 80,
      borderRadius: 1,
      background: 'linear-gradient(to right, #10B981, #3B82F6, #EC4899)',
      opacity: 0.3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 600,
    }}
  >
    🚧 In Development
  </Box>
</Box>



          
          </Box>
        </Grid>
        <Box sx={{ flexGrow: 1 }}>
<Grid container spacing={2} alignItems="stretch">
<Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex' }}>
          <EcommerceYearlySales
          sx={{ flexGrow: 1 }}
            title="Session Volatility by Day"
            subheader="Average pip range during major sessions (Mon–Fri)"
            chart={{
              categories: [
                
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
              ],
              colors: ['#60A5FA', '#F472B6', '#3B82F6', '#22C55E'],
              series: [
                {
                  name: '2025',
                  data: [
                    {
                      name: 'Sydney',
                      data: [17, 13, 16, 22, 30],
                    },
                    {
                      name: 'Tokyo',
                      data: [18.2, 19.1, 20.5, 21.0, 17.6],
                    },
                    {
                      name: 'London',
                      data: [30.2, 32.0, 35.5, 33.1, 28.7],
                    },
                    {
                      name: 'New York',
                      data: [25.5, 28.1, 34.0, 29.5, 24.4],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={2}>
                  <AppWidgetSummary
                    title="Stellaris Strategy"
                    percent="Overlaps account for 70% of global trading volume."
                    total="Bot performs best during periods of high market volatility, especially during the overlaps."
                    chart={{
                      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                      series: [15, 25, 12, 51, 68, 11, 39, 68],
                    }}
                  />
                  <AppWidgetSummary
                    title="Tokyo-London Overlap"
                    percent="Medium Volatility"
                    total="09:00-10:00 (GMT+2)"
                    chart={{
                      colors: [theme.palette.info.main],
                      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                      series: [15, 18, 20, 51, 68, 20, 39, 37],
                    }}
                  />
                  <AppWidgetSummary
                    title="London-New York Overlap"
                    percent="High Volatility"
                    total="14:00-17:00 (GMT+2)"
                    chart={{
                      colors: [theme.palette.error.main],
                      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                      series: [40, 50, 50, 70, 80, 70, 50, 40],
                    }}
                  />
                  </Stack>
                </Grid>
                </Grid>
</Box>

      </Grid>
    </DashboardContent>
  );
}