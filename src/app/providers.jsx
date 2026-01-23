'use client';

import { ProgressProvider } from '@bprogress/next/app';

const Providers = ({ children }) => {
  return (
    <ProgressProvider
      height="4px"
      color="#675DD8"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default Providers;
