export const isElementVisible = (elementRef: HTMLElement) => {
  const legacy = typeof elementRef.checkVisibility === 'undefined';

  if (!legacy) {
    return elementRef.checkVisibility();
  }

  return Boolean(
    elementRef.offsetParent ||
      elementRef.offsetWidth ||
      elementRef.offsetHeight,
  );
};
