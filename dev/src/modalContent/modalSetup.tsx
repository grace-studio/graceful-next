'use client';

import dynamic from 'next/dynamic';
import Hello from '../modalContent/Hello';
import { setupModalViewer } from '@grace-studio/graceful-next/components';
import LoadingTest from './LoadingTest';

const modals = {
  Hej: dynamic(() => import('../modalContent/Hej')),
  Hello: Hello,
  LoadingTest,
};

const { ModalViewerProvider, useModal } = setupModalViewer(modals, {
  transition: 'fade',
});

export { ModalViewerProvider, useModal };
