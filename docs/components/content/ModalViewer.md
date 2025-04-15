# ModalViewer Component

A flexible and type-safe modal system for React applications.

## Overview

The `ModalViewer` component provides a complete solution for managing modal dialogs in a React application. It uses React Context to manage modal state and provides hooks for showing and hiding modals with proper TypeScript type safety.

## Features

- Type-safe modal implementation
- Suspense support for code-splitting and lazy-loading
- Drawer-based presentation
- Customizable unmount delay
- Loading fallback support

## Installation

This component is part of the graceful-next library.

```bash
npm install graceful-next
# or
yarn add graceful-next
```

## Usage

### Setup

First, define your modal components and create a modal mapping:

```tsx
import { setupModalViewer } from 'graceful-next';
import UserProfileModal from './modals/UserProfileModal';
import SettingsModal from './modals/SettingsModal';

// Define your modal mapping
const modalMapping = {
  userProfile: UserProfileModal,
  settings: SettingsModal,
};

// Set up the modal system
export const { ModalViewerProvider, useModal } = setupModalViewer(modalMapping);
```

### Wrap your application

Wrap your application with the `ModalViewerProvider`:

```tsx
import { ModalViewerProvider } from './your-modal-setup';

const App = () => {
  return (
    <ModalViewerProvider
      placement="right" // Drawer placement
      size="md" // Drawer size
      unmountDelay={300} // Optional delay before unmounting content
      loadingFallback={<LoadingSpinner />} // Optional loading component
    >
      <YourApp />
    </ModalViewerProvider>
  );
};
```

### Show and hide modals

Use the `useModal` hook to show and hide modals from any component:

```tsx
import { useModal } from './your-modal-setup';

const MyComponent = () => {
  const { showModal, hideModal } = useModal();

  const openUserProfile = () => {
    showModal('userProfile', {
      userId: 123,
      // All props are type-checked based on your modal component's props
    });
  };

  return <button onClick={openUserProfile}>Open User Profile</button>;
};
```

### Closing a Modal from Within

Modal components can also use the `useModal` hook to access the `hideModal` function, allowing them to implement their own close controls (e.g., a close button or an action completion):

```tsx
// Inside your modal component (e.g., UserProfileModal.tsx)
import React from 'react';
import { useModal } from './your-modal-setup'; // Adjust path as needed

const UserProfileModal = ({ userId }) => {
  const { hideModal } = useModal();

  // ... component logic ...

  return (
    <div>
      {/* Modal content */}
      <button onClick={hideModal}>Close</button>
    </div>
  );
};

export default UserProfileModal;
```

## API Reference

### `setupModalViewer(modalMapping)`

Creates a modal system with the provided modal mapping.

#### Parameters

- `modalMapping`: A record mapping modal identifiers to React components

#### Returns

- `ModalViewerProvider`: Provider component to wrap your application
- `useModal`: Hook for showing and hiding modals

### `ModalViewerProvider` Props

The provider accepts all props from the `Drawer` component plus:

- `unmountDelay`: (Optional) Time in milliseconds to wait before unmounting a modal after it's closed
- `loadingFallback`: (Optional) React node to show while a modal is loading

### `useModal()` Hook

The hook returns an object with:

- `showModal(type, props)`: Function to show a modal of the specified type with the given props
- `hideModal()`: Function to hide the current modal

## Type Safety

The `useModal` hook provides complete type safety:

```tsx
const { showModal } = useModal();

// TypeScript will enforce the correct props for each modal type
showModal('userProfile', { userId: 123 }); // ✅ Correct
showModal('userProfile', { wrongProp: true }); // ❌ Type error
showModal('nonExistentModal'); // ❌ Type error
```

## Advanced Usage

### Using with React Suspense

The modal content is wrapped in a `Suspense` boundary, allowing you to use lazy-loaded components:

```tsx
const modalMapping = {
  userProfile: React.lazy(() => import('./modals/UserProfileModal')),
  settings: React.lazy(() => import('./modals/SettingsModal')),
};
```

### Custom Modal Transitions

The `ModalViewer` uses an underlying `Drawer` component, which handles the primary slide-in/slide-out visual transition. The `unmountDelay` prop specifically controls how long the _content_ of the modal remains mounted _after_ the `hideModal` function is called and the drawer begins its closing animation. This delay allows you to implement content-specific exit animations (e.g., fade-out) within your modal component before it's removed from the DOM.

```tsx
// Allow 300ms for the modal content's exit animation before unmounting
<ModalViewerProvider unmountDelay={300}>{/* Your app */}</ModalViewerProvider>
```

## Internal Implementation

The component uses a three-part system:

1. A React Context to store the current modal state
2. The `ModalViewer` component that renders the appropriate modal
3. A hook system that provides type-safe access to the modal functionality

When a modal is shown, it's rendered within a Drawer component. When hidden, the component waits for the specified `unmountDelay` before unmounting the component completely.
