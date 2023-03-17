import Head from 'next/head';
import type { FC } from 'react';
import React from 'react';
import { ImageObject } from '../types';

export type MetadataType = {
  title: string;
  description?: string;
  shareImage?: ImageObject;
};

type MetadataProps = {
  defaultMetadata?: MetadataType;
  metadata?: MetadataType;
};

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
          content={
            metadata?.shareImage?.url || defaultMetadata?.shareImage?.url
          }
        />
      )}
    </Head>
  );
};

export default Metadata;
