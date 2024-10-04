export const isElementVisible = (elementRef: HTMLElement): boolean => {
  const legacy = typeof elementRef.checkVisibility === 'undefined';

  if (!legacy) {
    return elementRef.checkVisibility();
  }

  // Legacy fallback for browsers without `checkVisibility`
  const style = window.getComputedStyle(elementRef);
  const rect = elementRef.getBoundingClientRect();

  return Boolean(
    elementRef.offsetParent &&
      elementRef.offsetWidth > 0 &&
      elementRef.offsetHeight > 0 &&
      style.visibility !== 'hidden' &&
      style.opacity !== '0' &&
      style.pointerEvents !== 'none' &&
      rect.bottom > 0 &&
      rect.right > 0 && // Element is within the viewport
      rect.top < window.innerHeight &&
      rect.left < window.innerWidth,
  );
};
