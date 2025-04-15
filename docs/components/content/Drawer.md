# Drawer Component

A flexible and accessible drawer component for React applications.

## Overview

The `Drawer` component provides a complete solution for creating slide-out panels in a React application. It supports various positions, animations, and is fully accessible.

## Features

- Multiple position options (left, right, top, bottom)
- Customizable animations
- Keyboard navigation support
- Type-safe implementation
- Accessible by default
- Customizable styling
- Backdrop support

## Installation

This component is part of the graceful-next library.

```bash
npm install graceful-next
# or
yarn add graceful-next
```

## Usage

### Basic Usage

```tsx
import { Drawer } from 'graceful-next';
import { useState } from 'react';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="right"
      >
        <h2>Drawer Content</h2>
        <p>This is the content of the drawer.</p>
      </Drawer>
    </>
  );
};
```

### With Custom Size

```tsx
import { Drawer } from 'graceful-next';
import { useState } from 'react';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="right"
        size="lg"
      >
        <h2>Large Drawer</h2>
        <p>This drawer has a larger size.</p>
      </Drawer>
    </>
  );
};
```

## API Reference

### Props

- `isOpen`: Whether the drawer is open
  - Type: boolean
  - Required: true
- `onClose`: Callback fired when the drawer is closed
  - Type: () => void
  - Required: true
- `placement`: The position of the drawer
  - Options: 'left' | 'right' | 'top' | 'bottom'
  - Default: 'right'
- `size`: The size of the drawer
  - Options: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  - Default: 'md'
- `className`: Additional CSS classes for the drawer wrapper
- `contentClassName`: Additional CSS classes for the drawer content
- `backdropClassName`: Additional CSS classes for the backdrop
- `closeOnBackdropClick`: Whether clicking the backdrop closes the drawer
  - Default: true
- `closeOnEscape`: Whether pressing escape closes the drawer
  - Default: true
- `children`: The content of the drawer

## Advanced Usage

### Custom Styling

You can customize the drawer's appearance using the provided className props:

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  className="my-drawer"
  contentClassName="my-drawer-content"
  backdropClassName="my-drawer-backdrop"
>
  <h2>Custom Styled Drawer</h2>
  <p>This drawer has custom styling applied.</p>
</Drawer>
```

### Without Backdrop

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  closeOnBackdropClick={false}
>
  <h2>Drawer Without Backdrop</h2>
  <p>This drawer doesn't close when clicking the backdrop.</p>
</Drawer>
```

## Accessibility

The Drawer component is built with accessibility in mind:

- Uses ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Proper role attributes
- Semantic HTML structure
- Focus trap when open

## Internal Implementation

The component uses a combination of:

1. React state for managing open/closed states
2. CSS transitions for animations
3. Portal for rendering in the document body
4. Event listeners for keyboard navigation
5. Focus trap for accessibility
6. Proper ARIA attributes

The drawer uses CSS transforms for smooth animations and handles keyboard navigation for accessibility.

## Best Practices

1. Use appropriate placement based on content type
2. Consider size needs for different content types
3. Always provide a way to close the drawer
4. Use proper heading hierarchy in drawer content
5. Consider mobile responsiveness

## Example Layouts

### Top Drawer

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  placement="top"
  size="full"
>
  <h2>Top Drawer</h2>
  <p>This drawer slides in from the top.</p>
</Drawer>
```

### Bottom Drawer

```tsx
<Drawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  placement="bottom"
  size="md"
>
  <h2>Bottom Drawer</h2>
  <p>This drawer slides in from the bottom.</p>
</Drawer>
```
