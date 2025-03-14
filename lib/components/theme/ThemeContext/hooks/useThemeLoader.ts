import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadFromSessionStorage } from '../../../../utils/sessionStorage';

export const useThemeLoader = (themeName = 'graceful-theme') => {
  const path = usePathname();
  const [theme, setTheme] = useState<string>();
  useEffect(() => {
    const loadedTheme = loadFromSessionStorage(themeName) as string;
    setTheme(loadedTheme);
  }, [path]);
  return theme;
};
