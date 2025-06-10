import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log environment variable status (without exposing values)
console.log('Supabase URL configured:', !!supabaseUrl);
console.log('Supabase Anon Key configured:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your configuration.');
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Storage bucket name for user avatars
export const AVATAR_BUCKET = 'avatars';

// Helper function to upload image to Supabase storage
export const uploadImage = async (file: File, bucket: string) => {
  try {
    // Create a unique filename with timestamp
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const fileName = `${timestamp}.${fileExt}`;

    // Upload the file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      console.error('Upload error:', error);
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return { data, publicUrl };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Helper function to delete image from Supabase storage
export const deleteImage = async (bucket: string, path: string) => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

// Helper function to get public URL for an image
export const getImageUrl = (bucket: string, path: string) => {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path, {
      transform: {
        width: 400,
        height: 400,
        quality: 80
      }
    });
  
  return publicUrl;
};