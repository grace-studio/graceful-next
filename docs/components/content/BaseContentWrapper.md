# BaseContentWrapper Component

A flexible and responsive content wrapper component for React applications.

## Overview

The `BaseContentWrapper` component provides a consistent layout container for content in a React application. It handles responsive widths, padding, and alignment while maintaining a clean and organized structure.

## Features

- Responsive width control
- Customizable padding
- Flexible alignment options
- Type-safe implementation
- Customizable styling
- Consistent layout structure

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
import { BaseContentWrapper } from 'graceful-next';

const MyComponent = () => {
  return (
    <BaseContentWrapper>
      <h1>My Content</h1>
      <p>This content will be properly wrapped and responsive.</p>
    </BaseContentWrapper>
  );
};
```

### With Custom Width

```tsx
import { BaseContentWrapper } from 'graceful-next';

const MyComponent = () => {
  return (
    <BaseContentWrapper maxWidth="lg">
      <h1>My Content</h1>
      <p>This content will be wrapped with a larger max-width.</p>
    </BaseContentWrapper>
  );
};
```

## API Reference

### Props

- `maxWidth`: The maximum width of the content wrapper
  - Options: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  - Default: 'md'
- `padding`: The padding around the content
  - Options: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  - Default: 'md'
- `align`: The horizontal alignment of the content
  - Options: 'left' | 'center' | 'right'
  - Default: 'left'
- `className`: Additional CSS classes for the wrapper
- `children`: The content to be wrapped

## Advanced Usage

### Custom Styling

You can customize the wrapper's appearance using the provided className prop:

```tsx
<BaseContentWrapper
  className="my-custom-wrapper"
  maxWidth="lg"
  padding="xl"
  align="center"
>
  <h1>Custom Styled Content</h1>
  <p>This content has custom styling applied.</p>
</BaseContentWrapper>
```

### Responsive Design

The component automatically handles responsive behavior:

```tsx
<BaseContentWrapper maxWidth="lg" padding={{ base: 'sm', md: 'md', lg: 'lg' }}>
  <h1>Responsive Content</h1>
  <p>This content will adapt to different screen sizes.</p>
</BaseContentWrapper>
```

## Internal Implementation

The component uses a combination of:

1. CSS Grid/Flexbox for layout
2. Media queries for responsive behavior
3. CSS custom properties for theming
4. TypeScript for type safety

The wrapper uses a combination of max-width and padding to create a consistent layout structure that works across different screen sizes.

## Best Practices

1. Use appropriate maxWidth based on content type
2. Consider padding needs for different content types
3. Use align prop to control content alignment
4. Combine with other layout components for complex layouts
5. Use className prop for custom styling needs

## Example Layouts

### Centered Content

```tsx
<BaseContentWrapper maxWidth="md" align="center">
  <h1>Centered Content</h1>
  <p>This content is centered within its container.</p>
</BaseContentWrapper>
```

### Full Width Content

```tsx
<BaseContentWrapper maxWidth="full" padding="lg">
  <h1>Full Width Content</h1>
  <p>This content spans the full width of its container.</p>
</BaseContentWrapper>
```
