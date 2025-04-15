'use client';

import { BaseButton } from '@grace-studio/graceful-next/components';
import { FC } from 'react';
import { useModal } from './modalSetup';

const Hello: FC<{ name: string }> = ({ name }) => {
  const { hideModal, showModal } = useModal();

  return (
    <div className="flex flex-col gap-6">
      Hello, {name}
      <BaseButton onClick={hideModal}>Close</BaseButton>
      <BaseButton onClick={() => showModal('Hej')}>Hej</BaseButton>
    </div>
  );
};

export default Hello;
