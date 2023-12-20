'use client';

import { FC } from 'react';
import { useGoogleTagManager } from '../../hooks';

type GoogleAnalyticsProps = {
  id?: string;
};

const GoogleAnalytics: FC<GoogleAnalyticsProps> = ({ id }) => {
  useGoogleTagManager(id);

  return null;
};

export default GoogleAnalytics;
