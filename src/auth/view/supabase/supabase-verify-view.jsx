'use client';

import { paths } from 'src/routes/paths';

import { EmailInboxIcon } from 'src/assets/icons';

import { FormHead } from '../../components/form-head';
import { FormReturnLink } from '../../components/form-return-link';

// ----------------------------------------------------------------------

export function SupabaseVerifyView() {
  return (
    <>
      <FormHead
        icon={<EmailInboxIcon />}
        title="Please check your email!"
        description={`We've sent you a confirmation link. \nJust click the link in the email to verify your address. \nIf you don't see it, check your spam folder.`}
      />

      <FormReturnLink href={paths.auth.supabase.signIn} sx={{ mt: 0 }} />
    </>
  );
}
