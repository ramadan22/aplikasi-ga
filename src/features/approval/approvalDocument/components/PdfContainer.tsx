'use client';

import React, { forwardRef } from 'react';

const PdfContainer = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: '210mm',
          height: '297mm',
          padding: '20mm',
          backgroundColor: 'white',
          position: 'relative',
          boxShadow: '0 0 5px rgba(0,0,0,0.1)',
        }}
      >
        {children}
      </div>
    );
  },
);

PdfContainer.displayName = 'PdfContainer';
export default PdfContainer;
