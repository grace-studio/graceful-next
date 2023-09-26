'use client';
import Head from 'next/head';
import type { FC } from 'react';
import React from 'react';
import { ImageObject } from '../../types/generic';

export type MetadataType = {
  title: string;
  description?: string;
  shareImage?: ImageObject;
};

type MetadataProps = {
  defaultMetadata?: MetadataType;
  metadata?: MetadataType;
};

const resolveImageUrl = (path?: string) =>
  path && (path.startsWith('http:') || path.startsWith('https:'))
    ? path
    : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path || ''}`;

const Metadata: FC<MetadataProps> = (props) => {
  const { defaultMetadata, metadata } = props;

  return (
    <Head>
      {(metadata?.title || defaultMetadata?.title) && (
        <>
          <title>{metadata?.title || defaultMetadata?.title}</title>

          <meta
            property="og:title"
            content={metadata?.title || defaultMetadata?.title}
            key="title"
          />
        </>
      )}

      {(metadata?.description || defaultMetadata?.description) && (
        <>
          <meta
            name="description"
            content={metadata?.description || defaultMetadata?.description}
          />
          <meta
            property="og:description"
            content={metadata?.description || defaultMetadata?.description}
          />
        </>
      )}

      {(metadata?.shareImage || defaultMetadata?.shareImage) && (
        <meta
          property="og:image"
          content={resolveImageUrl(
            metadata?.shareImage?.url || defaultMetadata?.shareImage?.url,
          )}
        />
      )}
    </Head>
  );
};

export default Metadata;
