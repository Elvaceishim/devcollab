import React, { useState, useRef } from 'react';
import { Upload, X, Camera, Loader2, AlertCircle } from 'lucide-react';
import Button from './Button';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (file: File | null, previewUrl: string | null) => void;
  onImageUpload: (file: File) => Promise<string>;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'square';
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  currentImage,
  onImageChange,
  onImageUpload,
  className = '',
  size = 'md',
  shape = 'circle',
  label = 'Upload Image',
  accept = 'image/*',
  maxSize = 5, // 5MB default
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-xl'
  };

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      return 'Please select a valid image file';
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      return `File size must be less than ${maxSize}MB`;
    }

    return null;
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    onImageChange(file, objectUrl);

    try {
      setUploading(true);
      const uploadedUrl = await onImageUpload(file);
      setPreviewUrl(uploadedUrl);
      onImageChange(file, uploadedUrl);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setError(null);
    onImageChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        {/* Image Preview */}
        <div className={`relative ${sizeClasses[size]} ${shapeClasses[shape]} overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors`}>
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
              )}
              <button
                onClick={handleRemoveImage}
                disabled={uploading}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                <X className="h-3 w-3" />
              </button>
            </>
          ) : (
            <button
              onClick={handleClick}
              disabled={uploading}
              className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <Camera className="h-6 w-6 mb-1" />
                  <span className="text-xs">Add Photo</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Upload Button */}
        <div className="flex flex-col items-center space-y-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClick}
            disabled={uploading}
            className="flex items-center space-x-2"
          >
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            <span>{uploading ? 'Uploading...' : label}</span>
          </Button>

          <p className="text-xs text-gray-500 text-center">
            {accept.includes('image') ? 'PNG, JPG, GIF' : accept} up to {maxSize}MB
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;