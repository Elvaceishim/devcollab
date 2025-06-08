import { useState } from 'react';
import { uploadImage, deleteImage, AVATAR_BUCKET } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export const useImageUpload = () => {
  const { user, updateProfile } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadAvatar = async (file: File): Promise<string> => {
    if (!user) {
      throw new Error('User not authenticated');
    }

    setUploading(true);
    setError(null);

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Delete old avatar if exists
      if (user.avatar) {
        try {
          const oldPath = user.avatar.split('/').pop();
          if (oldPath) {
            await deleteImage(AVATAR_BUCKET, `avatars/${oldPath}`);
          }
        } catch (err) {
          console.warn('Could not delete old avatar:', err);
        }
      }

      // Upload new image
      const { publicUrl } = await uploadImage(file, AVATAR_BUCKET, filePath);

      // Update user profile
      updateProfile({ avatar: publicUrl });

      return publicUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const removeAvatar = async (): Promise<void> => {
    if (!user?.avatar) return;

    setUploading(true);
    setError(null);

    try {
      // Extract filename from URL
      const fileName = user.avatar.split('/').pop();
      if (fileName) {
        await deleteImage(AVATAR_BUCKET, `avatars/${fileName}`);
      }

      // Update user profile
      updateProfile({ avatar: undefined });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Remove failed';
      setError(errorMessage);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadAvatar,
    removeAvatar,
    uploading,
    error,
    clearError: () => setError(null)
  };
};