export const buildQueryUrl = (
  pathname: string,
  params: Record<string, string | number | undefined>,
  locale?: string,
): string => {
  let normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;

  if (locale && normalizedPath.startsWith(`/${locale}/`)) {
    normalizedPath = normalizedPath.replace(`/${locale}`, '');
  }

  const fullPath = locale ? `/${locale}${normalizedPath}` : normalizedPath;

  const queryString = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null)
      .map(([k, v]) => [k, String(v)]),
  ).toString();

  return `${fullPath}${queryString ? `?${queryString}` : ''}`;
};

/**
 * Remove specific keys from an object.
 * @param obj - The source object.
 * @param keysToRemove - An array of keys to remove.
 * @returns A new object with the specified keys removed.
 */
export function removeObjectKeys<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keysToRemove: K[],
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keysToRemove) {
    delete result[key];
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ErrorConvertToMessage = (err: any) => {
  return err?.response?.data?.message || err?.message || 'Something wrong!';
};
