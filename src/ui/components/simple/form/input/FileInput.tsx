'use client';

import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';
import { SlPicture } from 'react-icons/sl';

interface FileInputProps {
  id?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultImage?: string;
  value?: string;
  hint?: string;
  error?: boolean;
  loading?: boolean;
}

const FileInput: FC<FileInputProps> = ({
  id = '',
  className = '',
  onChange,
  defaultImage = '',
  value = '',
  loading = false,
  hint,
  error,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(defaultImage);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }
  };

  useEffect(() => {
    if (value) setPreviewImage(value);
  }, [value]);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div
        onClick={handleImageClick}
        className="flex items-center justify-center relative w-32 h-32 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
      >
        {loading && (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-700 dark:border-gray-400 border-t-transparent" />
        )}
        {!loading && !previewImage && (
          <SlPicture className="text-gray-700 dark:text-gray-400" size={20} />
        )}
        {!loading && previewImage && (
          <Image
            src={previewImage}
            alt="Profile Preview"
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </div>

      <input
        id={id}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        required
      />

      {hint && (
        <p className={`mt-1.5 text-xs ${error ? 'text-error-500' : 'text-gray-500'}`}>{hint}</p>
      )}
    </div>
  );
};

export default FileInput;
