'use client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
// import { messageError } from '../react-toastify';

// import { ErrorConvertToMessage } from '@/helpers/handleResponseError';

type Props = {
  children?: React.ReactNode;
};

const ReactQueryClientProvider = ({ children }: Props) => {
  // const queryClient = getQueryClient();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 10 * 1000,
            refetchInterval: 10 * 1000,
            retry: false,
          },
        },
        queryCache: new QueryCache({
          onError: error => {
            console.log('here error', error);
            // messageError(ErrorConvertToMessage(error));
          },
        }),
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryClientProvider;
