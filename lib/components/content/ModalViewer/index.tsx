'use client';

import React, { ComponentType, FC, Suspense, useEffect, useMemo } from 'react';
import { createContext, useContext, useState, ReactNode } from 'react';
import Drawer from '../Drawer';

type ModalProps = Record<string, any>;
type ModalMapping = Record<string, ComponentType<any>>;

type ModalState = {
  type: string | null;
  props: ModalProps;
};

type ModalContextType = {
  showModal: (type: string, props?: ModalProps) => void;
  hideModal: () => void;
  modal: ModalState;
};

type DrawerProps = Omit<
  React.ComponentProps<typeof Drawer>,
  'isOpen' | 'onClose'
>;
type ModalViewerProps = DrawerProps & {
  modalMapping: ModalMapping;
  unmountDelay?: number;
  loadingFallback?: ReactNode;
};

const ModalViewer: FC<ModalViewerProps> = ({
  modalMapping,
  unmountDelay = 0,
  loadingFallback,
  ...props
}) => {
  const { modal, hideModal } = useModalInner();
  const [currentType, setCurrentType] = useState<string | null>(null);
  const [currentProps, setCurrentProps] = useState<ModalProps | null>(null);

  const isClosing = modal.type === null && currentType !== null;

  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        setCurrentType(null);
        setCurrentProps(null);
      }, unmountDelay);

      return () => clearTimeout(timeout);
    } else {
      setCurrentType(modal.type ?? null);
      setCurrentProps(modal.props ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal.type, modal.props, unmountDelay]);

  const Child = useMemo(() => {
    if (!currentType) {
      return null;
    }

    return modalMapping[currentType] ?? null;
  }, [currentType, modalMapping]);

  return (
    <Drawer isOpen={Boolean(modal.type)} onClose={() => hideModal()} {...props}>
      <Suspense fallback={loadingFallback ?? null}>
        {Child ? <Child {...currentProps} /> : null}
      </Suspense>
    </Drawer>
  );
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalState>({ type: null, props: {} });

  const showModal = (type: string, props: ModalProps = {}) =>
    setModal({ type, props });

  const hideModal = () => setModal({ type: null, props: {} });

  return (
    <ModalContext.Provider value={{ showModal, hideModal, modal }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModalInner = () => {
  const ctx = useContext(ModalContext);

  if (!ctx) {
    throw new Error('useModal must be used within ModalProvider');
  }

  return ctx;
};

const useModal = <TDefinition extends ModalMapping>() => {
  const { showModal, hideModal } = useModalInner();
  type Types = keyof TDefinition;

  type RequiredKeys<T> = {
    [K in keyof T]-?: object extends Pick<T, K> ? never : K;
  }[keyof T];

  type Conditional<T> =
    RequiredKeys<T> extends never ? [props?: T] : [props: T];

  type WithoutOnClose<T> = Omit<T, 'onClose'>;
  type PropTypes<T extends Types> = WithoutOnClose<
    React.ComponentProps<TDefinition[T]>
  >;

  const typedShowModal = <T extends Types>(
    type: T,
    ...[props]: Conditional<PropTypes<T>>
  ) => {
    showModal(type as string, props ?? {});
  };

  return {
    showModal: typedShowModal,
    hideModal,
  };
};

export const setupModalViewer = <T extends ModalMapping>(
  modalMapping: T,
  modalViewerProps: Omit<ModalViewerProps, 'modalMapping'> = {},
) => ({
  useModal: useModal<typeof modalMapping>,
  ModalViewerProvider: ({
    children,
    ...props
  }: {
    children: ReactNode;
  } & Omit<ModalViewerProps, 'modalMapping'>) => (
    <ModalProvider>
      {children}
      <ModalViewer
        modalMapping={modalMapping}
        {...modalViewerProps}
        {...props}
      />
    </ModalProvider>
  ),
});
