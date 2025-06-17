'use client';

import { useEffect, useState } from 'react';
import { supabase } from 'src/lib/supabase';
import { AccountChangePassword } from '../account-change-password';

export function AccountChangePasswordView() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user?.email) {
        setEmail(data.user.email);
      }
    };

    getUser();
  }, []);

  // Wait until email is loaded before showing form
  if (!email) return null;

  return <AccountChangePassword email={email} />;
}
