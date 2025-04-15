'use client';
import { useModal } from '@/modalContent/modalSetup';
import { BaseButton } from '@grace-studio/graceful-next/components';

const BlocksPage = () => {
  const { showModal } = useModal();

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <BaseButton onClick={() => showModal('Hej')}>Hej</BaseButton>
      <BaseButton onClick={() => showModal('LoadingTest')}>
        Loading test
      </BaseButton>
      <BaseButton onClick={() => showModal('Hello', { name: 'Albin!' })}>
        Hello
      </BaseButton>
    </div>
  );
};

export default BlocksPage;
