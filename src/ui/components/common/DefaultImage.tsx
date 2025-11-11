'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useState } from 'react';
import { SlPicture } from 'react-icons/sl';

interface ProfileProps extends Omit<ImageProps, 'src'> {
  src?: string | null;
  size?: number;
}

const DefaultImage = ({ src, size = 20, alt = 'Profile', ...props }: ProfileProps) => {
  const [validSrc, setValidSrc] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (src && src.trim() !== '') {
      setValidSrc(src);
      setIsError(false);
    } else {
      setValidSrc(null);
      setIsError(true);
    }
  }, [src]);

  if (src !== undefined && (isError || !validSrc)) {
    return <SlPicture size={size} className={props.className} />;
  }

  if (validSrc) {
    return (
      <Image
        {...props}
        src={validSrc}
        alt={alt}
        onError={() => {
          setIsError(true);
          setValidSrc(null);
        }}
      />
    );
  }

  return '';
};

export default DefaultImage;
