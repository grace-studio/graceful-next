import { isElementVisible } from './isElementVisible';

export const canElementReceiveFocus = (element: HTMLElement): boolean => {
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

  // Get element's bounding rect
  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  if (!isFocusable) {
    return false;
  }

  // Check stacking context for absolutely or fixed positioned elements
  if (
    (style.position === 'absolute' || style.position === 'fixed') &&
    style.zIndex === 'auto'
  ) {
    return false;
  }

  // Retrieve the border-radius
  const borderRadius = parseFloat(style.borderRadius);
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const pointsToCheck: { x: number; y: number }[] = [];

  // 8 points in center of elem
  const radius = Math.min(rect.width / 2, rect.height / 2) * 0.95;
  const numberOfPoints = 8; // Number of points around the circle
  for (let i = 0; i < numberOfPoints; i++) {
    const angle = (i / numberOfPoints) * 2 * Math.PI; // Angle in radians
    const x = centerX + radius * Math.cos(angle); // X coordinate
    const y = centerY + radius * Math.sin(angle); // Y coordinate
    pointsToCheck.push({ x, y });
  }

  // Corners inside border radius
  const corner = Math.min(borderRadius, rect.width / 2, rect.height / 2) * 0.95;
  pointsToCheck.push(
    { x: rect.left + corner, y: rect.top + corner }, // Top-left
    { x: rect.right - corner, y: rect.top + corner }, // Top-right
    { x: rect.left + corner, y: rect.bottom - corner }, // Bottom-left
    { x: rect.right - corner, y: rect.bottom - corner }, // Bottom-right
  );

  // Check if each point is covered
  for (const point of pointsToCheck) {
    const elementAtPoint = document.elementFromPoint(point.x, point.y);
    if (elementAtPoint !== element && !element.contains(elementAtPoint)) {
      return false;
    }
  }

  return true;
};
