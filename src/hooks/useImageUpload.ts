import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, updateProfile } = useAuth();

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
      const filePath = `avatars/${fileName}`;

      // Upload the new avatar
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Delete the old avatar if it exists
      if (user.avatar) {
        const oldPath = user.avatar.split('/').pop();
        if (oldPath) {
          await supabase.storage
            .from('avatars')
            .remove([`avatars/${oldPath}`]);
        }
      }

      // Update the user's profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar: publicUrl })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      // Update the local user state
      await updateProfile({
        ...user,
        avatar: publicUrl
      });

      return publicUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload avatar');
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const removeAvatar = async () => {
    if (!user?.avatar) return;

    try {
      setIsUploading(true);
      setError(null);

      // Delete the avatar from storage
      const fileName = user.avatar.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('avatars')
          .remove([`avatars/${fileName}`]);
      }

      // Update the user's profile to remove the avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar: null })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      // Update the local user state
      await updateProfile({
        ...user,
        avatar: undefined
      });
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