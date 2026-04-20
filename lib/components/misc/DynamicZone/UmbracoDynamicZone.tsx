'use server';
import React, { FC } from 'react';
import DynamicZone, { DynamicZoneProps } from '.';

export type UmbracoDynamicZoneProps = DynamicZoneProps<{ name: string }>;

const UmbracoDynamicZone: FC<UmbracoDynamicZoneProps> = async (props) => (
  <DynamicZone blockKeyName="name" {...props} />
);

export default UmbracoDynamicZone;
