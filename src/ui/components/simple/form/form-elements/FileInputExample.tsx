'use client';
import ComponentCard from '@/ui/components/common/ComponentCard';
import React from 'react';
import Label from '../Label';
import FileInput from '../input/FileInput';

const FileInputExample = () => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
    }
  };

  return (
    <ComponentCard title="File Input">
      <div>
        <Label>Upload file</Label>
        <FileInput onChange={handleFileChange} className="custom-class" />
      </div>
    </ComponentCard>
  );
};

export default FileInputExample;
