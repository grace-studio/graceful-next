'use server';
import React, { FC } from 'react';
import DynamicZone, { DynamicZoneProps } from './DynamicZone';

export type StrapiDynamicZoneProps = DynamicZoneProps<{ __typename: string }>;

const StrapiDynamicZone: FC<StrapiDynamicZoneProps> = (props) => (
  <DynamicZone blockKeyName="__typename" {...props} />
);

export default StrapiDynamicZone;
