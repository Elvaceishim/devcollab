import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Camera, Loader2, AlertCircle, Check } from 'lucide-react';
import Button from './Button';

interface ImageUploadProps {
  currentImage?: string;
  onImageChange: (file: File | null, previewUrl: string | null) => void;
  onImageUpload: (file: File) => Promise<string | null>;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
  label?: string;
  accept?: string;
  maxSize?: number; // in MB
  disabled?: boolean;
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
  maxSize = 5,
  disabled = false,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg'
  };

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith('image/')) {
      return 'Only image files are allowed';
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      return `File must be smaller than ${maxSize}MB`;
    }

    return null;
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(false);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    onImageChange(file, objectUrl);

    try {
      setUploading(true);
      const uploadedUrl = await onImageUpload(file);
      if (uploadedUrl) {
        setPreviewUrl(uploadedUrl);
        onImageChange(null, uploadedUrl); // Pass null for file since upload is complete
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
      setPreviewUrl(currentImage || null);
      onImageChange(null, currentImage || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    if (uploading) return;
    setPreviewUrl(null);
    setError(null);
    onImageChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  // Update preview when currentImage changes
  useEffect(() => {
    setPreviewUrl(currentImage || null);
  }, [currentImage]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className={`relative ${className}`}>
      <div className="flex flex-col items-center gap-3">
        {/* Image Preview Container */}
        <div 
          className={`relative ${sizeClasses[size]} ${shapeClasses[shape]} overflow-hidden border-2 ${disabled ? 'border-gray-200' : 'border-gray-300 hover:border-primary-500'} transition-all bg-gray-50 group`}
          onClick={handleClick}
        >
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => {
                  setError('Failed to load image');
                  setPreviewUrl(null);
                }}
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
              )}
              {!uploading && !disabled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
                  aria-label="Remove image"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
              {uploading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <Camera className={`${size === 'sm' ? 'h-4 w-4' : 'h-6 w-6'} mb-1`} />
                  <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'} font-medium`}>
                    {size === 'sm' ? 'Add' : 'Add Photo'}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Upload Controls */}
        {!disabled && (
          <div className="flex flex-col items-center gap-2 w-full">
            <Button
              type="button"
              variant="outline"
              size={size === 'sm' ? 'xs' : 'sm'}
              onClick={handleClick}
              disabled={uploading}
              className="w-full max-w-[200px]"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Uploading...
                </>
              ) : success ? (
                <>
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Uploaded!
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  {label}
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              {accept.includes('image') ? 'PNG, JPG, GIF' : accept} • Max {maxSize}MB
            </p>
          </div>
        )}

        {/* Status Messages */}
        {error && (
          <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 px-3 py-2 rounded-lg w-full">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
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
        disabled={disabled || uploading}
      />
    </div>
  );
};

export default ImageUpload;