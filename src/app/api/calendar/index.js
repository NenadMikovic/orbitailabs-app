export default function handler(req, res) {
  res.status(200).json({
    events: [
      {
        id: '1',
        title: 'FOMC Meeting',
        start: '2025-07-02T14:00:00Z',
        end: '2025-07-02T15:00:00Z',
        color: 'info',
        allDay: false,
      },
      {
        id: '2',
        title: 'NFP Data Release',
        start: '2025-07-05T12:30:00Z',
        end: '2025-07-05T13:00:00Z',
        color: 'error',
        allDay: false,
      },
    ],
  });
}
