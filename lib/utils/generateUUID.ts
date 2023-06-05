import cryptoModule from 'crypto';

export const generateUUID = () => {
  const isBrowser = typeof window !== 'undefined';

  let rawString = isBrowser
    ? window.crypto.randomUUID()
    : cryptoModule.randomUUID();

  return rawString.replace(/[\W_]+/g, '');
};
