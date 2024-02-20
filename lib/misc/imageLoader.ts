'use client';
import { ImageLoaderProps, getImageProps } from 'next/image';

const urlSafeBase64 = (str: string) =>
  Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

const getAbsolutePath = (src: string) => {
  if (/http(s)*:\/\//.test(src)) {
    return src;
  }

  if (typeof window === undefined) {
    return src;
  }

  return window.location.origin + `/${src}`.replaceAll('//', '/');
};

const createPath = (
  { src, width, quality = 75 }: ImageLoaderProps,
  extension: string,
) => {
  const url = getAbsolutePath(src);
  const encodedUrl = urlSafeBase64(url);
  const processingOptions = [`w:${width}`, `q:${quality}`].join('/');

  return `/${processingOptions}/${encodedUrl}.${extension}`;
};

// const hexDecode = (hex: string) => Buffer.from(hex, 'hex');

const createSignature = (path: string) => {
  return urlSafeBase64('supersecret');
  // const secret = process.env.IMAGE_LOADER_KEY ?? 'secret';
  // const salt = process.env.IMAGE_LOADER_SALT ?? 'salt';
  // console.log(secret, salt);
  // const hmac = createHmac('sha256', hexDecode(secret));
  // hmac.update(hexDecode(salt));
  // hmac.update(path);

  // return hmac.digest('base64url');
};

export const imageLoader =
  (proxyUrl: string, extension = 'webp') =>
  (options: ImageLoaderProps) => {
    const path = createPath(options, extension);
    const signature = createSignature(path);

    if (process.env.NODE_ENV === 'development') {
      return options.src;
    }

    return `${proxyUrl}/${signature}${path}`;
  };
