// useImageUpload.ts
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Factor, User, UserAppMetadata, UserIdentity, UserMetadata } from '@supabase/auth-js'; // or '@supabase/supabase-js'

export type UserWithAvatar = User & {
  avatars?: string;
};

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth() as { user: UserWithAvatar | null };

  const uploadAvatar = async (file: File) => {
  if (!user) {
    setError('You must be logged in to upload an avatar');
    return null;
  }

  try {
    setIsUploading(true);
    setError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('File must be an image');
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      throw new Error('File size must be less than 2MB');
    }

    // Generate a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`; // Don't prefix with 'avatars/'

    // Upload the new avatar
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data: publicData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const publicUrl = publicData.publicUrl;

    if (!publicUrl) {
      throw new Error('Failed to retrieve public URL');
    }

    // Delete the old avatar if it exists
    if (user.avatars) {
      const oldPath = user.avatars.split('/').pop(); // just the file name
      if (oldPath) {
        await supabase.storage.from('avatars').remove([oldPath]);
      }
    }

    // Update the user's profile in the database
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatars: publicUrl })
      .eq('id', user.id);

    if (updateError) {
      console.error("Supabase update error:", updateError);
      console.log("User ID:", user.id);
      console.log("Public URL being set:", publicUrl);
      throw updateError;
    }

    // Update the local user state
    await updateProfile({
      ...user,
      avatars: publicUrl
    });

    return publicUrl;
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to upload avatar');
    return null;
  } finally {
    setIsUploading(false);
  }
};


  const removeAvatar = async (avatarUrl: string | null) => {
    if (!avatarUrl) return;

    try {
      setIsUploading(true);
      setError(null);

      const fileName = avatarUrl.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('avatars')
          .remove([fileName]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove avatar');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadAvatar,
    removeAvatar,
    isUploading,
    error,
    clearError: () => setError(null)
  };
};

function updateProfile(_arg0: { avatars: string; id: string; app_metadata: UserAppMetadata; user_metadata: UserMetadata; aud: string; confirmation_sent_at?: string; recovery_sent_at?: string; email_change_sent_at?: string; new_email?: string; new_phone?: string; invited_at?: string; action_link?: string; email?: string; phone?: string; created_at: string; confirmed_at?: string; email_confirmed_at?: string; phone_confirmed_at?: string; last_sign_in_at?: string; role?: string; updated_at?: string; identities?: UserIdentity[]; is_anonymous?: boolean; is_sso_user?: boolean; factors?: Factor[]; deleted_at?: string; }) {
  throw new Error('Function not implemented.');
}
