'use client';

import { useId } from 'react';
import { mergeClasses } from 'minimal-shared/utils';

import Link from '@mui/material/Link';
import { styled, useTheme } from '@mui/material/styles';

import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export function Logo({ sx, disabled, className, href = '/', isSingle = true, ...other }) {
  const theme = useTheme();

  const uniqueId = useId();

  const TEXT_PRIMARY = theme.vars.palette.text.primary;
  const PRIMARY_LIGHT = theme.vars.palette.primary.light;
  const PRIMARY_MAIN = theme.vars.palette.primary.main;
  const PRIMARY_DARKER = theme.vars.palette.primary.dark;

  /*
    * OR using local (public folder)
    *
    const singleLogo = (
      <img
        alt="Single logo"
        src={`${CONFIG.assetsDir}/logo/logo-single.svg`}
        width="100%"
        height="100%"
      />
    );

    const fullLogo = (
      <img
        alt="Full logo"
        src={`${CONFIG.assetsDir}/logo/logo-full.svg`}
        width="100%"
        height="100%"
      />
    );
    *
    */

  const singleLogo = (
    <svg viewBox="8 18 64 64" height="36"  fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${uniqueId}-gradient`} x1="8" y1="18" x2="72" y2="82">
          <stop offset="0%" stopColor="#9D00FF" />
          <stop offset="100%" stopColor="#00C2FF" />
        </linearGradient>
      </defs>

      <circle
        cx="40"
        cy="50"
        r="30"
        stroke={`url(#${uniqueId}-gradient)`}
        strokeWidth="3"
        fill="none"
      />
      <circle
        cx="40"
        cy="50"
        r="15"
        stroke="white"
        strokeWidth="3"
        fill="none"
      />
      <circle
        cx="65"
        cy="35"
        r="4"
        fill="white"
      />
    </svg>
  );

  const fullLogo = (
    <svg
      viewBox="0 0 200 90"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${uniqueId}-gradient`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9D00FF" />
          <stop offset="100%" stopColor="#00C2FF" />
        </linearGradient>
      </defs>

      {/* Outer Circle with Gradient */}
      <circle
        cx="40"
        cy="50"
        r="30"
        stroke={`url(#${uniqueId}-gradient)`}
        strokeWidth="3"
        fill="none"
      />

      {/* Inner Circle White */}
      <circle
        cx="40"
        cy="50"
        r="15"
        stroke="white"
        strokeWidth="3"
        fill="none"
      />

      {/* Small Orbit Dot */}
      <circle
        cx="65"
        cy="35"
        r="4"
        fill="white"
      />

      {/* OrbitAI Labs Text */}
      <text
        x="90"
        y="50"
        fill="white"
        fontSize="20"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
      >
        OrbitAI
      </text>
      <text
        x="90"
        y="75"
        fill="white"
        fontSize="20"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
      >
        Labs
      </text>
    </svg>
  );

  return (
    <LogoRoot
      component={RouterLink}
      href={href}
      aria-label="Logo"
      underline="none"
      className={mergeClasses([logoClasses.root, className])}
      sx={[
        {
          width: 40,
          height: 40,
          ...(!isSingle && { width: 102, height: 36 }),
          ...(disabled && { pointerEvents: 'none' }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {isSingle ? singleLogo : fullLogo}
    </LogoRoot>
  );
}

// ----------------------------------------------------------------------

const LogoRoot = styled(Link)(() => ({
  flexShrink: 0,
  color: 'transparent',
  display: 'inline-flex',
  verticalAlign: 'middle',
}));
