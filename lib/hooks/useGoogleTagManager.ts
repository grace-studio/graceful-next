'use client';
import { useEffect } from 'react';
import TagManager, { TagManagerArgs } from 'react-gtm-module';

type GTMEventData = object;

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    dataLayer?: GTMEventData[];
  }
}

/**
 * The `useGoogleTagManager` function is a custom hook that initializes Google Tag Manager and provides
 * a `trackEvent` function to push data to the dataLayer.
 * @param {string} [gtmId] - The `gtmId` parameter is a string that represents the Google Tag Manager
 * ID. It is used to initialize the Google Tag Manager and enable tracking of events.
 * @param [tagManagerArgs] - The `tagManagerArgs` parameter is an optional object that contains
 * additional configuration options for initializing the Google Tag Manager. It is of type
 * `Omit<TagManagerArgs, 'gtmId'>`, which means it excludes the `gtmId` property from the
 * `TagManagerArgs` type.
 * @returns The function `useGoogleTagManager` returns an object with a single property `trackEvent`,
 * which is a function.
 */
export const useGoogleTagManager = (
  gtmId?: string,
  tagManagerArgs?: Omit<TagManagerArgs, 'gtmId'>,
) => {
  const pushData = (data: GTMEventData) => {
    if (window) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ ...data });
    }
  };

  const gtmTrackEvent = (data: GTMEventData) => pushData({ ...data });
  const isInitialized = () =>
    (window?.dataLayer || []).some((data: any) => Boolean(data['gtm.start']));

  useEffect(() => {
    if (document && gtmId && !isInitialized()) {
      TagManager.initialize({ gtmId, ...tagManagerArgs });
      pushData({ event: 'consent-level-2' });
    }
  }, [gtmId]);

  return { trackEvent: gtmTrackEvent };
};
