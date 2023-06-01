export type StrapiImageFormat = {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: any;
  size: number;
  url: string;
  width: number;
};

export type StrapiImage = {
  _key?: string;
  alternativeText: string;
  caption: string;
  createdAt: string;
  ext: string;
  formats: {
    large: StrapiImageFormat;
    small: StrapiImageFormat;
    medium: StrapiImageFormat;
    thumbnail: StrapiImageFormat;
  };
  hash: string;
  height: number;
  id: number;
  mime: string;
  name: string;
  previewUrl: string;
  provider_metadata: any;
  provider: string;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
};