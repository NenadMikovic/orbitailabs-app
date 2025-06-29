'use client';


import Calendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect, startTransition } from 'react';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from '@mui/material';

import { fDate, fIsAfter, fIsBetween } from 'src/utils/format-time';

import { supabase } from 'src/lib/supabase';
import { DashboardContent } from 'src/layouts/dashboard';
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';

import { Iconify } from 'src/components/iconify';
import ChatAssistant from 'src/components/chat/ChatAssistant';

import { EcommerceWelcome } from 'src/sections/overview/e-commerce/ecommerce-welcome';

import { useAuthContext } from 'src/auth/hooks';

import { CalendarRoot } from '../styles';
import { useEvent } from '../hooks/use-event';
import { CalendarForm } from '../calendar-form';
import { useCalendar } from '../hooks/use-calendar';
import { CalendarToolbar } from '../calendar-toolbar';
import { CalendarFilters } from '../calendar-filters';
import { CalendarFiltersResult } from '../calendar-filters-result';

// ----------------------------------------------------------------------

const LOCAL_EVENTS = [
  {
    id: "89fd6d47-1daf-40f7-bd96-7c9b7f97bb05",
    title: "USD - ISM Manufacturing PMI",
    start: "2025-07-01T16:00:00",
    end: "2025-07-01T16:30:00",
    color: "red",
    allDay: false,
    description: "USD - ISM Manufacturing PMI released at 4:00PM on 2025-07-01"
  },
  {
    id: "443c3aaf-b1b7-4f7a-bc5c-6057c519794f",
    title: "USD - Fed Chair Powell Speaks",
    start: "2025-07-01T15:30:00",
    end: "2025-07-01T16:00:00",
    color: "red",
    allDay: false,
    description: "USD - Fed Chair Powell Speaks released at 3:30PM on 2025-07-01"
  },
  {
    id: "73ef627e-d7b5-4806-8a93-92cff9df55e4",
    title: "USD - ADP Non-Farm Employment Change",
    start: "2025-07-02T14:15:00",
    end: "2025-07-02T14:45:00",
    color: "red",
    allDay: false,
    description: "USD - ADP Non-Farm Employment Change released at 2:15PM on 2025-07-02"
  },
  {
    id: "7224756b-8e0f-4e38-9dcb-c1deba997c06",
    title: "USD - Crude Oil Inventories",
    start: "2025-07-02T16:30:00",
    end: "2025-07-02T17:00:00",
    color: "red",
    allDay: false,
    description: "USD - Crude Oil Inventories released at 4:30PM on 2025-07-02"
  },
  {
    id: "ad0eea65-3dbf-4477-b40f-07c4749fdfb9",
    title: "USD - Non-Farm Employment Change",
    start: "2025-07-03T14:30:00",
    end: "2025-07-03T15:00:00",
    color: "red",
    allDay: false,
    description: "USD - Non-Farm Employment Change released at 2:30PM on 2025-07-03"
  },
  {
    id: "c1d54145-c6a2-486b-9b83-e6aa1cdd32fc",
    title: "USD - Unemployment Rate",
    start: "2025-07-03T14:30:00",
    end: "2025-07-03T15:00:00",
    color: "red",
    allDay: false,
    description: "USD - Unemployment Rate released at 2:30PM on 2025-07-03"
  },
  {
    id: "48f01241-75e7-4df2-84fc-7c780cc92a91",
    title: "USD - Average Hourly Earnings m/m",
    start: "2025-07-03T14:30:00",
    end: "2025-07-03T15:00:00",
    color: "red",
    allDay: false,
    description: "USD - Average Hourly Earnings m/m released at 2:30PM on 2025-07-03"
  },
  {
    id: "b301300f-9c3b-49df-931f-dcc456ea02a0",
    title: "USD - ISM Services PMI",
    start: "2025-07-03T16:00:00",
    end: "2025-07-03T16:30:00",
    color: "red",
    allDay: false,
    description: "USD - ISM Services PMI released at 4:00PM on 2025-07-03"
  },
  {
    id: "f5b762fb-3db5-4892-a38f-6973250e3b7d",
    title: "USD - Factory Orders m/m",
    start: "2025-07-03T16:00:00",
    end: "2025-07-03T16:30:00",
    color: "red",
    allDay: false,
    description: "USD - Factory Orders m/m released at 4:00PM on 2025-07-03"
  },
  {
    id: "2825fd6e-8575-4539-a729-6b508a74cc77",
    title: "USD - FOMC Member Bostic Speaks",
    start: "2025-07-03T17:00:00",
    end: "2025-07-03T17:30:00",
    color: "red",
    allDay: false,
    description: "USD - FOMC Member Bostic Speaks released at 5:00PM on 2025-07-03"
  }
];




export function CalendarView() {
  const theme = useTheme();
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

    const userPlan = license?.plan || 'free';

  const openFilters = useBoolean();

  const events = LOCAL_EVENTS;
  const eventsLoading = false;

  const filters = useSetState({ colors: [], startDate: null, endDate: null });
  const { state: currentFilters } = filters;

  const dateError = fIsAfter(currentFilters.startDate, currentFilters.endDate);

  const {
    calendarRef,
    /********/
    view,
    date,
    /********/
    onDatePrev,
    onDateNext,
    onDateToday,
    onDropEvent,
    onChangeView,
    onSelectRange,
    onClickEvent,
    onResizeEvent,
    onInitialView,
    /********/
    openForm,
    onOpenForm,
    onCloseForm,
    /********/
    selectEventId,
    selectedRange,
    /********/
    onClickEventInFilters,
  } = useCalendar();

  const currentEvent = useEvent(events, selectEventId, selectedRange, openForm);

  useEffect(() => {
    onInitialView();
  }, [onInitialView]);

  const canReset =
    currentFilters.colors.length > 0 || (!!currentFilters.startDate && !!currentFilters.endDate);

  const dataFiltered = applyFilter({
    inputData: events,
    filters: currentFilters,
    dateError,
  });

  const renderResults = () => (
    <CalendarFiltersResult
      filters={filters}
      totalResults={dataFiltered.length}
      sx={{ mb: { xs: 3, md: 5 } }}
    />
  );

  const flexStyles = {
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <>
      <DashboardContent maxWidth="xl" sx={{ ...flexStyles }}>
        <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 8 }}>
                           <EcommerceWelcome
                          title="Economic Calendar"
                          description={
                          <><br />
                       <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <Iconify icon="ep:info-filled" width={30} sx={{ mt: '3px' }} />
              <Typography variant="body1">
                Track all high-impact economic news and announcements in one place. <br /> Get aives you a clear view of upcoming events that can move the markets—interest rate decisions, inflation reports, employment data, and more. Updated in real-time, so you’re always prepared.
              </Typography>
            </Box>
                         </>
                          }
                            />
                            </Grid >
                <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                         <ChatAssistant pageContext="OrbitAI Labs license management, subscription plans, activation, expiration, and upgrades." />
                        </Grid>
                        </Grid>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: { xs: 3, md: 5 },
            mt: 4,
          }}
        >
          <Typography variant="h4">Upcoming High-Impact News</Typography>
        {/**   <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={onOpenForm}
          >
            New event
          </Button>*/}
        </Box>

        {canReset && renderResults()}

        <Card
          sx={{
            ...flexStyles,
            minHeight: '50vh',
          }}
        >
          <CalendarRoot
            sx={{
              ...flexStyles,
              '.fc.fc-media-screen': { flex: '1 1 auto' },
            }}
          >
            <CalendarToolbar
              date={fDate(date)}
              view={view}
              canReset={canReset}
              loading={eventsLoading}
              onNextDate={onDateNext}
              onPrevDate={onDatePrev}
              onToday={onDateToday}
              onChangeView={onChangeView}
              onOpenFilters={openFilters.onTrue}
            />

            <Calendar
              weekends
              editable
              droppable
              selectable
              rerenderDelay={10}
              allDayMaintainDuration
              eventResizableFromStart
              ref={calendarRef}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="auto"
              events={dataFiltered}
              headerToolbar={false}
              select={onSelectRange}
              eventClick={onClickEvent}
              aspectRatio={3}
              eventDrop={(arg) => {
                startTransition(() => {
                  onDropEvent(arg);
                });
              }}
              eventResize={(arg) => {
                startTransition(() => {
                  onResizeEvent(arg);
                });
              }}
              plugins={[
                listPlugin,
                dayGridPlugin,
                timelinePlugin,
                timeGridPlugin,
                interactionPlugin,
              ]}
            />
          </CalendarRoot>
        </Card>

<Grid size={12}>
            <Box sx={{ mb: 2, mt: 8 }}>
            <Typography variant="h4" sx={{ mb: 1 }}>
              Next Week Insights
            </Typography>
            <Typography
              sx={{ color: 'text.secondary' }}
            >See all upcoming events for next week. All times are in GMT+2.</Typography>
          </Box>
</Grid>

<Grid xs={12}>
  <TableContainer component={Paper} sx={{ mt: 4 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="mdi:currency-usd" width={18} />
              <Typography variant="subtitle2">Date</Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="material-symbols:insights" width={18} />
              <Typography variant="subtitle2">Time</Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="mdi:lightning-bolt" width={18} />
              <Typography variant="subtitle2">Symbol</Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="material-symbols:warning-outline" width={18} />
              <Typography variant="subtitle2">News</Typography>
            </Box>
          </TableCell>
          <TableCell>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Iconify icon="mdi:eye" width={18} />
              <Typography variant="subtitle2">Insight</Typography>
            </Box>
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {[
          {
            date: '2025-07-01',
            time: '14:30',
            symbol: 'EUR',
            news: 'ECB President Lagarde Speaks',
            prediction: {
              forecast: 'BUY near $81.50; TP $84.00, SL below $80.50.',
              previous: '$80.00',
            },
          },
          {
            date: '2025-07-02',
            time: '16:00',
            symbol: 'USD',
            news: 'BOE Gov Bailey Speaks',
            prediction: {
              forecast: 'BUY near $81.50; TP $84.00, SL below $80.50.',
              previous: '$80.00',
            },
          },
          {
            date: '2025-07-03',
            time: '15:30',
            symbol: 'GBP',
            news: 'Construction Spending m/m',
            prediction: {
              forecast: 'BUY near $81.50; TP $84.00, SL below $80.50.',
              previous: '$80.00',
            },
          },
          {
            date: '2025-07-04',
            time: '13:00',
            symbol: 'JPY',
            news: 'API Weekly Statistical Bulletin',
            prediction: {
              forecast: 'BUY near $81.50; TP $84.00, SL below $80.50.',
              previous: '$80.00',
            },
          },
          {
            date: '2025-07-05',
            time: '10:00',
            symbol: 'CAD',
            news: 'Caixin Services PMI',
            prediction: {
              forecast: 'BUY near $81.50; TP $84.00, SL below $80.50.',
              previous: '$80.00',
            },
          },
          {
            date: '2025-07-06',
            time: '11:30',
            symbol: 'CAD',
            news: 'Spanish Services PMI',
            prediction: {
              forecast: 'BUY near $81.50; TP $84.00, SL below $80.50.',
              previous: '$80.00',
            },
          },
        ].map((row) => (
          <TableRow key={row.date + row.symbol}>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.time}</TableCell>
            <TableCell>{row.symbol}</TableCell>
            <TableCell>{row.news}</TableCell>
            <TableCell>
              {userPlan === 'free' ? (
                <Typography color="text.secondary" sx={{ fontStyle: 'italic', opacity: 0.5 }}>
                  🔒 Premium insight
                </Typography>
              ) : (
                <Stack spacing={0.5}>
                  <Typography variant="body2">
                    <strong>Forecast:</strong> {row.prediction.forecast}{' '}
                    <Tooltip title="This is the current forecast based on latest analysis.">
                      <Iconify icon="ep:info-filled" width={16} sx={{ ml: 0.5, verticalAlign: 'middle' }} />
                    </Tooltip>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Previous:</strong> {row.prediction.previous}
                  </Typography>
                </Stack>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Grid>

      </DashboardContent>
    
      <Dialog
        fullWidth
        maxWidth="xs"
        open={openForm}
        onClose={onCloseForm}
        transitionDuration={{
          enter: theme.transitions.duration.shortest,
          exit: theme.transitions.duration.shortest - 80,
        }}
        slotProps={{
          paper: {
            sx: {
              display: 'flex',
              overflow: 'hidden',
              flexDirection: 'column',
              '& form': {
                ...flexStyles,
                minHeight: 0,
              },
            },
          },
        }}
      >
        <DialogTitle sx={{ minHeight: 76 }}>
          {openForm && <> {currentEvent?.id ? 'News' : 'Add'} Info</>}
        </DialogTitle>

        <CalendarForm
          currentEvent={currentEvent}
          colorOptions={CALENDAR_COLOR_OPTIONS}
          onClose={onCloseForm}
        />
      </Dialog>

      <CalendarFilters
        events={events}
        filters={filters}
        canReset={canReset}
        dateError={dateError}
        open={openFilters.value}
        onClose={openFilters.onFalse}
        onClickEvent={onClickEventInFilters}
       // colorOptions={CALENDAR_COLOR_OPTIONS}
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters, dateError }) {
  const { colors, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  inputData = stabilizedThis.map((el) => el[0]);

  if (colors.length) {
    inputData = inputData.filter((event) => colors.includes(event.color));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((event) => fIsBetween(event.start, startDate, endDate));
    }
  }

  return inputData;
}
