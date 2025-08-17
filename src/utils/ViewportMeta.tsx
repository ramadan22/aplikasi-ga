// components/ViewportMeta.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const ViewportMeta = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes('/approval')) {
      let meta = document.querySelector('meta[name="viewport"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', 'width=1024');
    } else {
      const meta = document.querySelector('meta[name="viewport"]');
      if (meta) {
        meta.setAttribute('content', 'width=device-width, initial-scale=1');
      }
    }
  }, [pathname]);

  return null;
};

export default ViewportMeta;
