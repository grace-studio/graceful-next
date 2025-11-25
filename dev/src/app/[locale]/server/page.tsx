import { getTranslation } from '@/translations';

const ServerPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const t = getTranslation((await params).locale);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <pre>{t('str.e.hej.japp')}</pre>
    </div>
  );
};

export default ServerPage;
