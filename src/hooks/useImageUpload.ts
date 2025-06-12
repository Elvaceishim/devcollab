// useImageUpload.ts
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const uploadAvatar = async (file: File): Promise<string | null> => {
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

      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      return publicUrl || null;
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