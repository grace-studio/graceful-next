import { FC, lazy } from 'react';

const LoadingTest = lazy<FC>(() => {
  return new Promise<{ default: FC }>((resolve) => {
    setTimeout(() => {
      resolve({ default: () => <div>✅ Data loaded after 2s!</div> });
    }, 2000);
  });
});

export default LoadingTest;
