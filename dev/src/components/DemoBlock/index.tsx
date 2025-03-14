'use client';
import classNames from 'classnames';
import Image from 'next/image';
import { ReactNode } from 'react';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import useScrollDirection from '@grace-studio/graceful-next/components/theme/ThemeContext/hooks/useScrollPosition';
import Button from './ThemeButton';
import { usePathname, useRouter } from 'next/navigation';

export const Buttons = () => (
  <div className="flex flex-row gap-3 py-8 ">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="tertiary">Tertiary</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
);

type HeaderType = {};

export const Header: FC<HeaderType> = (props) => {
  const [loaded, setLoaded] = useState<boolean>();
  const path = usePathname();

  useEffect(() => {
    setLoaded(true);
  }, []);

  const { direction, scrollPosition } = useScrollDirection();

  const styles = !loaded ? { marginTop: '-100%' } : undefined;

  const base = path.split('theme')[0];

  return (
    <div
      style={styles}
      className={classNames(
        'p-8 theme-header flex gap-2 w-full fixed top-0 z-40 transition-all delay-300',
        direction == 'down' && scrollPosition.y > 400 && '-translate-y-full',
      )}
    >
      <Link href={`${base}theme/default`}>Default</Link>
      <Link href={`${base}theme/dark`}>Dark</Link>
      <Link href={`${base}theme/light`}>Light</Link>
      <Link href={`${base}theme/transparent`}>Transparent</Link>
    </div>
  );
};

export const Block = ({
  id,
  children,
  className,
  bg,
}: {
  id: string;
  bg?: boolean;
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={classNames(
      'h-screen overflow-hidden relative flex flex-col items-center justify-center',
      className,
    )}
    data-block-id={id}
  >
    {bg && (
      <Image
        priority
        fill
        alt=""
        className="absolute left-0 top-0 h-full object-cover w-full"
        src="https://images.ctfassets.net/hrltx12pl8hq/2RwJp3f9UiCnfWBEunwxOQ/f11257994853124d7b1a6a935e678c13/0_hero.webp"
      />
    )}
    <div className="p-8 ">
      <div className="max-w-[650px] flex flex-col text-center self-center items-center justify-center">
        {children}
      </div>
    </div>
  </div>
);
