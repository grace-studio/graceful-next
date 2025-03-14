'use client';

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useThemeLoader } from './hooks/useThemeLoader';

import { useActiveBlock } from './hooks/useActiveBlock';
import useScrollPosition from './hooks/useScrollPosition';
import { usePathname } from 'next/navigation';
import { saveToSessionStorage } from '../../../utils/sessionStorage';

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({
  children,
  pageTransitionDuration = 500,
}: {
  children: ReactNode;
  pageTransitionDuration?: number;
}) => {
  const theme = useThemeLoader();
  const [isLoading, setIsLoading] = useState(true);
  const [pathIsChanging, setPathIsChanging] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const activeBlock = useActiveBlock();
  const { direction, scrollPosition } = useScrollPosition();
  const path = usePathname();
  const duration = pageTransitionDuration;

  const toggleTheme = (chosenTheme: string) => {
    saveToSessionStorage('graceful-theme', chosenTheme);
  };

  useEffect(() => {
    setPathIsChanging(true);
    setIsLoading(true);

    setTimeout(() => {
      setPathIsChanging(false);
    }, duration);
  }, [path]);

  useEffect(() => {
    if (theme) {
      setIsLoading(false);
    }
  }, [theme]);

  useEffect(() => {
    if (!isLoading) {
      setIsThemeLoaded(true);
    }
  }, [isLoading]);

  return (
    <ThemeContext.Provider
      value={{ theme: theme || '', setTheme: toggleTheme }}
    >
      <div
        data-scroll-position={scrollPosition.y}
        data-scroll-direction={direction}
        data-page-theme={theme}
        data-block-theme={activeBlock?.theme}
        data-page-transition={pathIsChanging}
        data-theme-loaded={isThemeLoaded}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export const ThemePageWrapper = ({
  theme,
  children,
  className,
}: {
  theme?: string;
  className?: string;
  children: ReactNode;
}) => {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme(theme!); // Set theme when the component mounts
  }, [theme, setTheme]);

  return <div className={className}>{children}</div>;
};
