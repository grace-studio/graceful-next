import { isElementVisible } from './isElementVisible';

export const canElementReceiveFocus = (element: HTMLElement): boolean => {
  // Check visibility using the `isElementVisible` function
  if (!isElementVisible(element)) return false;

  // Check if element is focusable
  const focusableTags = [
    'A',
    'INPUT',
    'BUTTON',
    'SELECT',
    'TEXTAREA',
    'IFRAME',
    'AREA',
  ];
  const isFocusable =
    focusableTags.includes(element.tagName) ||
    element.hasAttribute('tabindex') ||
    element.isContentEditable;
  if (!isFocusable) return false;

  // Get element's bounding rect
  const rect = element.getBoundingClientRect();

  // Points across the element to check for occlusion
  const pointsToCheck = [
    { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }, // Center
    { x: rect.left + 1, y: rect.top + 1 }, // Top-left
    { x: rect.right - 1, y: rect.top + 1 }, // Top-right
    { x: rect.left + 1, y: rect.bottom - 1 }, // Bottom-left
    { x: rect.right - 1, y: rect.bottom - 1 }, // Bottom-right
  ];

  // Check each point to see if it's covered by another element
  for (const point of pointsToCheck) {
    const elementAtPoint = document.elementFromPoint(point.x, point.y);
    if (elementAtPoint !== element && !element.contains(elementAtPoint)) {
      return false;
    }
  }

  return true;
};
