import { z as zod } from 'zod';
// 🔹 External libs - alphabetical
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

// 🔹 MUI - alphabetical
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// 🔹 Internal imports - alphabetical
import { fData } from 'src/utils/format-number';

import { supabase } from 'src/lib/supabase';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';


import Tooltip from '@mui/material/Tooltip';

// ----------------------------------------------------------------------

export const UpdateUserSchema = zod.object({
  // Required fields
  displayName: zod.string().min(1, { message: 'Name is required!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValid: isValidPhoneNumber }),
  country: schemaHelper.nullableInput(
    zod.string().min(1, { message: 'Country is required!' }),
    { message: 'Country is required!' }
  ),

  // Optional fields
  email: zod.string().optional(),
  photoURL: schemaHelper.file().optional(),
  address: zod.string().optional(),
  state: zod.string().optional(),
  city: zod.string().optional(),
  zipCode: zod.string().optional(),
  about: zod.string().optional(),
  isPublic: zod.boolean().optional(),
});


// ----------------------------------------------------------------------

export function AccountGeneral() {
  const { user } = useAuthContext();

  

  const defaultValues = {
    displayName: '',
    email: '',
    photoURL: null,
    phoneNumber: '',
    country: null,
    address: '',
    state: '',
    city: '',
    zipCode: '',
    about: '',
    isPublic: false,
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
  });

const { reset } = methods;

useEffect(() => {
  const fetchProfile = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Failed to fetch profile', error);
      return;
    }

    reset({
      displayName: data.display_name || '',
      email: user?.email || '', // email comes from auth, not profiles
      photoURL: typeof data.photo_url === 'string' && data.photo_url.trim() !== '' ? data.photo_url : null,
      phoneNumber: data.phone_number || '',
      country: data.country || null,
      address: data.address || '',
      state: data.state || '',
      city: data.city || '',
      zipCode: data.zip_code || '',
      about: data.about || '',
      isPublic: data.is_public || false,
    });
  };

  fetchProfile();
}, [user?.id, reset]);


  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (formData) => {
  try {
    console.log('Submitting for user ID:', user?.id);

// 🔥 Fetch current profile to get old photo_url
const { data: existingProfile, error: existingError } = await supabase
  .from('profiles')
  .select('photo_url')
  .eq('id', user.id)
  .single();

if (existingError) {
  console.error('Failed to fetch existing profile for avatar update:', existingError);
}


let photo_url = null;
const file = formData.photoURL;

if (file && typeof file === 'object' && file.type?.startsWith('image/')) {
  const fileExt = file.name.split('.').pop();
  const fileName = `avatar.${fileExt}`;
  const filePath = `${user.id}/${fileName}`;

  // ✅ Delete old file first (ignore errors if not found)
  const { error: deleteError } = await supabase.storage
    .from('avatars')
    .remove([filePath]);

  if (deleteError) {
    console.warn('Old avatar delete failed (may not exist):', deleteError.message);
  }

  // ✅ Upload new file (without upsert to confirm deletion)
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: false });

  if (uploadError) {
    toast.error('Failed to upload avatar.');
    console.error('Upload error:', uploadError);
    return;
  }

  // ✅ Get public URL of new file + bust CDN cache
const { data: publicUrlData } = supabase.storage
  .from('avatars')
  .getPublicUrl(filePath);

photo_url = publicUrlData?.publicUrl
  ? `${publicUrlData.publicUrl}?t=${Date.now()}`
  : null;

}


    const updatePayload = {
      display_name: formData.displayName,
      photo_url: photo_url ?? existingProfile?.photo_url ?? null,
      phone_number: formData.phoneNumber,
      country: formData.country,
      address: formData.address,
      state: formData.state,
      city: formData.city,
      zip_code: formData.zipCode,
      about: formData.about,
      is_public: formData.isPublic,
    };

    console.log('Update payload:', updatePayload);

    const response = await supabase
      .from('profiles')
      .update(updatePayload)
      .eq('id', user?.id)
      .select('*'); // to return the updated row

    console.log('Supabase update response:', response);

    if (response.error) {
      toast.error('Failed to update profile.');
      console.error(response.error);
    } else {
      toast.success('Profile updated!');
      console.log('Updated profile:', response.data);
    }
  } catch (err) {
    console.error(err);
    toast.error('Unexpected error occurred.');
  }
});


  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              pt: 10,
              pb: 5,
              px: 3,
              textAlign: 'center',
            }}
          >
            <Field.UploadAvatar
              name="photoURL"
              maxSize={3145728}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
{/** 
            <Field.Switch
              name="isPublic"
              labelPlacement="start"
              label="Public profile"
              sx={{ mt: 5 }}
            />
*/}
            <Button variant="soft" color="error" sx={{ mt: 3 }}>
              Delete Account
            </Button>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Text name="displayName" label="Name" />
              <Tooltip title="Your licenses are tied to this email, please contact support if you need to change it.">
              <Field.Text name="email" label="Email address" disabled/>
               </Tooltip>
              <Field.Phone name="phoneNumber" label="Phone number" />
              <Field.Text name="address" label="Address" />

              <Field.CountrySelect name="country" label="Country" placeholder="Choose a country" />

              <Field.Text name="state" label="State/region" />
              <Field.Text name="city" label="City" />
              <Field.Text name="zipCode" label="Zip/code" />
            </Box>

            <Stack spacing={3} sx={{ mt: 3, alignItems: 'flex-end' }}>
              <Field.Text name="about" multiline rows={4} label="About" />

              <Button type="submit" variant="contained" loading={isSubmitting}>
                Save changes
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
