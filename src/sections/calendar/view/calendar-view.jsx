'use client';

import Calendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, startTransition } from 'react';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';

import { fDate, fIsAfter, fIsBetween } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';
import { CALENDAR_COLOR_OPTIONS } from 'src/_mock/_calendar';

import { Iconify } from 'src/components/iconify';
import ChatAssistant from 'src/components/chat/ChatAssistant';

import { EcommerceWelcome } from 'src/sections/overview/e-commerce/ecommerce-welcome';

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
    id: '1',
    title: 'USD - Non-Farm Employment Change',
    start: '2025-07-01T14:30:00',
    end: '2025-07-01T15:00:00',
    color: 'red',
    allDay: false,
  },
  {
    id: '2',
    title: 'USD - ISM Manufacturing PMI',
    start: '2025-07-01T16:00:00',
    end: '2025-07-01T16:30:00',
    color: 'error',
    allDay: false,
  },
  {
    id: '3',
    title: 'EUR - ECB President Lagarde Speaks',
    start: '2025-07-02T10:30:00',
    end: '2025-07-02T11:30:00',
    color: 'error',
    allDay: false,
  },
  {
    id: '4',
    title: 'USD - JOLTS Job Openings',
    start: '2025-07-02T16:00:00',
    end: '2025-07-02T16:30:00',
    color: 'error',
    allDay: false,
  },
  {
    id: '5',
    title: 'USD - FOMC Meeting Minutes',
    start: '2025-07-03T20:00:00',
    end: '2025-07-03T21:00:00',
    color: 'error',
    allDay: false,
  },
  {
    id: '6',
    title: 'CAD - Employment Change',
    start: '2025-07-05T14:30:00',
    end: '2025-07-05T15:00:00',
    color: 'error',
    allDay: false,
  },
];



export function CalendarView() {
  const theme = useTheme();

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
          <Typography variant="h4">Economic Calendar</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={onOpenForm}
          >
            New event
          </Button>
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
          {openForm && <> {currentEvent?.id ? 'Edit' : 'Add'} event</>}
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
        colorOptions={CALENDAR_COLOR_OPTIONS}
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
