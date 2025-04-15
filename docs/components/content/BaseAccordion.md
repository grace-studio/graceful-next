# BaseAccordion Component

A flexible and accessible accordion component for React applications.

## Overview

The `BaseAccordion` component provides a complete solution for creating collapsible content sections in a React application. It supports single and multiple open items, custom animations, and is fully accessible.

## Features

- Single or multiple open items
- Customizable animations
- Keyboard navigation support
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
import { BaseAccordion } from 'graceful-next';

const MyComponent = () => {
  return (
    <BaseAccordion>
      <BaseAccordion.Item>
        <BaseAccordion.Header>Section 1</BaseAccordion.Header>
        <BaseAccordion.Content>Content for section 1</BaseAccordion.Content>
      </BaseAccordion.Item>
      <BaseAccordion.Item>
        <BaseAccordion.Header>Section 2</BaseAccordion.Header>
        <BaseAccordion.Content>Content for section 2</BaseAccordion.Content>
      </BaseAccordion.Item>
    </BaseAccordion>
  );
};
```

### With Multiple Open Items

```tsx
import { BaseAccordion } from 'graceful-next';

const MyComponent = () => {
  return (
    <BaseAccordion allowMultiple>
      <BaseAccordion.Item>
        <BaseAccordion.Header>Section 1</BaseAccordion.Header>
        <BaseAccordion.Content>Content for section 1</BaseAccordion.Content>
      </BaseAccordion.Item>
      <BaseAccordion.Item>
        <BaseAccordion.Header>Section 2</BaseAccordion.Header>
        <BaseAccordion.Content>Content for section 2</BaseAccordion.Content>
      </BaseAccordion.Item>
    </BaseAccordion>
  );
};
```

## API Reference

### BaseAccordion Props

- `allowMultiple`: Whether multiple items can be open at once
  - Default: false
- `defaultIndex`: The index of the initially open item(s)
  - Type: number | number[]
  - Default: undefined
- `onChange`: Callback fired when an item is opened/closed
  - Type: (index: number | number[]) => void
- `className`: Additional CSS classes for the accordion wrapper
- `itemClassName`: Additional CSS classes for each accordion item
- `headerClassName`: Additional CSS classes for the accordion headers
- `contentClassName`: Additional CSS classes for the accordion content
- `children`: Accordion items

### BaseAccordion.Item Props

- `className`: Additional CSS classes for the item wrapper
- `children`: Header and content components

### BaseAccordion.Header Props

- `className`: Additional CSS classes for the header
- `children`: Header content

### BaseAccordion.Content Props

- `className`: Additional CSS classes for the content
- `children`: Content to be displayed when expanded

## Advanced Usage

### Custom Styling

You can customize the accordion's appearance using the provided className props:

```tsx
<BaseAccordion
  className="my-accordion"
  itemClassName="my-accordion-item"
  headerClassName="my-accordion-header"
  contentClassName="my-accordion-content"
>
  {/* Accordion items */}
</BaseAccordion>
```

### Controlled Usage

```tsx
import { BaseAccordion } from 'graceful-next';
import { useState } from 'react';

const MyComponent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <BaseAccordion defaultIndex={openIndex} onChange={setOpenIndex}>
      {/* Accordion items */}
    </BaseAccordion>
  );
};
```

## Accessibility

The BaseAccordion component is built with accessibility in mind:

- Uses ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Proper role attributes
- Semantic HTML structure

## Internal Implementation

The component uses a combination of:

1. React state for managing open/closed states
2. CSS transitions for animations
3. Context API for state management
4. Event listeners for keyboard navigation
5. Proper ARIA attributes for accessibility

The accordion uses CSS transforms for smooth animations and handles keyboard navigation for accessibility.
