import { createClient, SupabaseClient } from '@supabase/supabase-js';

type UploadResponse = {
  data: {
    path: string;
  };
  publicUrl: string;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  const errorMsg = 'Missing Supabase environment variables';
  console.error(errorMsg, {
    urlConfigured: !!supabaseUrl,
    keyConfigured: !!supabaseAnonKey
  });
  throw new Error(errorMsg);
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

export const AVATAR_BUCKET = 'avatars';

export const uploadImage = async (file: File, bucket: string): Promise<UploadResponse> => {
  const timestamp = Date.now();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 9)}_${timestamp}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type
    });

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return { data, publicUrl };
};


export const deleteImage = async (bucket: string, path: string): Promise<void> => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) throw error;
};

export const getImageUrl = (
  bucket: string, 
  path: string, 
  options?: {
    width?: number;
    height?: number;
    quality?: number;
  }
): string => {
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(path, {
      transform: options ? {
        width: options.width,
        height: options.height,
        quality: options.quality
      } : undefined
    });

  return publicUrl;
};

export type RealtimeSubscription = ReturnType<typeof supabase.channel>;