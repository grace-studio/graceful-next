import { ModalViewerProvider } from '@/modalContent/modalSetup';
import { FC, PropsWithChildren } from 'react';

const ModalLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ModalViewerProvider
      // disableBackdropClick
      loadingFallback={
        <div className="h-12 w-12 border-8 border-purple-400 border-t-purple-600 rounded-full animate-spin" />
      }
      unmountDelay={1000}
      position="center"
      transition="slide"
      transitionDuration={700}
      backdropClassName="bg-white/30 backdrop-blur-sm"
      className="p-20 rounded-lg bg-purple-300 shadow-2xl shadow-purple-600/40"
    >
      {children}
    </ModalViewerProvider>
  );
};

export default ModalLayout;
