# BaseTooltip Component

A flexible and customizable tooltip component for React applications.

## Overview

The `BaseTooltip` component provides a complete solution for displaying tooltips in a React application. It supports various positioning options, animations, and custom content.

## Features

- Multiple positioning options (top, bottom, left, right)
- Customizable animations
- Support for custom content
- Type-safe implementation
- Accessible by default
- Customizable styling

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
import { BaseTooltip } from 'graceful-next';

const MyComponent = () => {
  return (
    <BaseTooltip content="This is a tooltip" position="top">
      <button>Hover me</button>
    </BaseTooltip>
  );
};
```

### With Custom Content

```tsx
import { BaseTooltip } from 'graceful-next';

const MyComponent = () => {
  return (
    <BaseTooltip
      content={
        <div>
          <h3>Custom Tooltip</h3>
          <p>This is a custom tooltip with rich content</p>
        </div>
      }
      position="right"
    >
      <button>Hover me</button>
    </BaseTooltip>
  );
};
```

## API Reference

### Props

- `content`: The content to display in the tooltip (string or React node)
- `position`: The position of the tooltip relative to its trigger element
  - Options: 'top' | 'bottom' | 'left' | 'right'
  - Default: 'top'
- `className`: Additional CSS classes for the tooltip wrapper
- `contentClassName`: Additional CSS classes for the tooltip content
- `arrowClassName`: Additional CSS classes for the tooltip arrow
- `delay`: Delay in milliseconds before showing the tooltip
  - Default: 0
- `duration`: Duration of the show/hide animation in milliseconds
  - Default: 200
- `disabled`: Whether the tooltip is disabled
  - Default: false
- `children`: The trigger element that the tooltip will be attached to

## Advanced Usage

### Custom Styling

You can customize the tooltip's appearance using the provided className props:

```tsx
<BaseTooltip
  content="Custom styled tooltip"
  className="my-tooltip-wrapper"
  contentClassName="my-tooltip-content"
  arrowClassName="my-tooltip-arrow"
>
  <button>Hover me</button>
</BaseTooltip>
```

### Animation Control

Control the tooltip's animation timing:

```tsx
<BaseTooltip content="Delayed tooltip" delay={500} duration={300}>
  <button>Hover me</button>
</BaseTooltip>
```

## Accessibility

The BaseTooltip component is built with accessibility in mind:

- Uses ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Proper role attributes

## Internal Implementation

The component uses a combination of:

1. React state for managing visibility
2. CSS transitions for animations
3. Position calculations for proper placement
4. Event listeners for hover and focus states
5. Portal for rendering the tooltip in the document body

The tooltip is positioned using CSS transforms and is automatically repositioned if it would overflow the viewport.
