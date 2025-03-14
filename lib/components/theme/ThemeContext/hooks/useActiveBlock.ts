import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTheme } from '..';

export type ActiveBlockProps = {
  id: string;
  theme?: string;
};

export const getCurrentTheme = (el: IntersectionObserverEntry) => {
  const classList = el?.target.classList;
  const classes = classList ? Array.from(classList) : [];
  const theme = classes.filter((themeClass) => themeClass.includes('theme'));
  const colorTheme =
    theme.length > 0 ? theme.toString().replace('theme-', '') : false;

  return colorTheme || undefined;
};

export const useActiveBlock = (): ActiveBlockProps | undefined => {
  const path = usePathname();

  const [activeBlock, setActiveBlock] = useState<ActiveBlockProps>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const blockId = entry.target.getAttribute('data-block-id');
            const blockTheme = getCurrentTheme(entry);
            if (blockId) {
              setActiveBlock({
                id: blockId,
                theme: blockTheme || 'default',
              });
            }
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px 0px -100% 0px', // Ensure top alignment of block with viewport
        threshold: 0, // Trigger as soon as the top edge of the block enters the viewport
      },
    );

    const blocks = document.querySelectorAll('[data-block-id]');
    blocks.forEach((block) => observer.observe(block));

    // Cleanup
    return () => {
      blocks.forEach((block) => observer.unobserve(block));
    };
  }, [path]);

  return activeBlock!;
};
