import { useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import Popover from '@mui/material/Popover';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export function AppWidget({ title, total, icon,  chart, centerIcon, sx, ...other }) {
  const theme = useTheme();

const [anchorEl, setAnchorEl] = useState(null);
const timerRef = useRef(null);

const handleCopy = (event) => {
  navigator.clipboard.writeText(total);
  setAnchorEl(event.currentTarget);

  clearTimeout(timerRef.current);
  timerRef.current = setTimeout(() => {
    setAnchorEl(null);
  }, 1500);
};

const handleClosePopover = () => {
  setAnchorEl(null);
  clearTimeout(timerRef.current);
};

const open = Boolean(anchorEl);


console.log('Total:', total, 'Parsed:', Date.parse(total));

  const chartColors = chart.colors ?? [theme.palette.primary.light, theme.palette.primary.main];

  const chartOptions = useChart({
    
    chart: { sparkline: { enabled: true } },
    stroke: { width: 0 },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: chartColors[0], opacity: 1 },
          { offset: 100, color: chartColors[1], opacity: 1 },
        ],
      },
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            color: theme.vars.palette.common.white,
            fontSize: theme.typography.subtitle2.fontSize,
            show: false,
          },
        },
      },
    },
    
    ...chart.options,
  });

  return (
    <Box
      sx={[
        {
          p: 3,
          gap: 3,
          borderRadius: 2,
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          alignItems: 'center',
          color: 'common.white',
          bgcolor: 'primary.dark',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Chart
          type="radialBar"
          series={[chart.series]}
          options={chartOptions}
          sx={{ zIndex: 1, width: 80, height: 80 }}
        />

        <SvgColor
          src={`${CONFIG.assetsDir}/assets/background/shape-circle-3.svg`}
          sx={{
            width: 200,
            height: 200,
            opacity: 0.08,
            position: 'absolute',
            color: 'primary.light',
          }}
        />

        <Box
  sx={{
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  }}
>
  <Iconify icon={centerIcon} width={28} sx={{ color: 'common.white' }} />
</Box>
      </Box>
      

      <div>
     <Box sx={{ typography: 'h4' }}>
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Box component="span">
      {!total
        ? 'Indefinite'
        : typeof total === 'string' && !isNaN(Date.parse(total)) && total.includes('T')
        ? new Date(total).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })
        : total}
    </Box>


    {(typeof total === 'string' && total.includes('T')) || !total ? (
  <Button
    size="small"
    variant="outlined"
    onClick={() => console.log('Open expiration modify dialog')}
  >
    Modify
  </Button>
) : (
  total &&
  total.length > 10 && (
    <>
      <IconButton
        size="small"
        onClick={handleCopy}
        title="Copy to clipboard"
      >
        <Iconify icon="solar:copy-bold" width={18} />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        disableRestoreFocus
      >
        <Typography sx={{ px: 2, py: 1 }}>Copied!</Typography>
      </Popover>
    </>
  )
)}

  </Box>
</Box>




        <Box sx={{ typography: 'subtitle2', opacity: 0.64 }}>{title}</Box>
      </div>

      <Iconify
        icon={icon}
        sx={{
          width: 120,
          right: -40,
          height: 120,
          opacity: 0.08,
          position: 'absolute',
        }}
      />
    </Box>
  );
}
