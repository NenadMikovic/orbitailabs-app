'use client';

import { useState, useEffect } from 'react';

import Typography from '@mui/material/Typography';

import { supabase } from 'src/lib/supabase'; // adjust path if needed

import { useAuthContext } from 'src/auth/hooks'; // assuming you're using auth context

import LicenseEmptyView from './LicenseEmptyView';   // UI for no license
import LicenseActiveView from './LicenseActiveView'; // UI for active license

// ----------------------------------------------------------------------

export function OverviewDownloadsView() {
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
  );
}
