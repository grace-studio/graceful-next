import { useRouter } from 'next/router';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

type GTMEventData = object & {
  event: string;
};

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    dataLayer?: GTMEventData[];
  }
}

export const useGoogleTagManager = (gtmId?: string) => {
  const { locale } = useRouter();

  const gtmTrackEvent = (data: GTMEventData) => {
    if (window) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ...(locale && { locale }), ...data });
    }
  };

  useEffect(() => {
    if (document && gtmId) {
      TagManager.initialize({ gtmId });
    }
  }, [gtmId]);

  return { trackEvent: gtmTrackEvent };
};
