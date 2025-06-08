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
      // Validate file
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select a valid image file');
      }

      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > 5) {
        throw new Error('File size must be less than 5MB');
      }

      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = fileName;

      // Delete old avatar if exists
      if (user.avatar) {
        try {
          // Extract filename from URL
          const urlParts = user.avatar.split('/');
          const oldFileName = urlParts[urlParts.length - 1];
          if (oldFileName && oldFileName !== fileName) {
            await deleteImage(AVATAR_BUCKET, oldFileName);
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
      const urlParts = user.avatar.split('/');
      const fileName = urlParts[urlParts.length - 1];
      
      if (fileName) {
        await deleteImage(AVATAR_BUCKET, fileName);
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