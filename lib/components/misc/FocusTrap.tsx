import { ReactElement, cloneElement, useEffect, useRef, useState } from 'react';
import * as focusTrap from 'focus-trap';
import { tabbable, FocusableElement } from 'tabbable';
import { isElementVisible } from '@grace-studio/graceful-next/utils';

type FocusTrapCombined = {
  mode: 'combined';
  noInitialFocus?: boolean;
};

type FocusTrapSolo = {
  mode: 'solo';
};

type FocusTrapProps = {
  children: ReactElement;
  active?: boolean;
} & (FocusTrapSolo | FocusTrapCombined);

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    __gracefulTrapElementRefs?: any[];
    __gracefulTrap?: focusTrap.FocusTrap;
  }
}

const options: focusTrap.Options = {
  allowOutsideClick: true,
  escapeDeactivates: false,
};

const sortNodes = (a: FocusableElement, b: FocusableElement) =>
  a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;

const filterNoInitFocus = (elementRef: FocusableElement) =>
  !elementRef.hasAttribute('data-no-init');

const addFallbackChild = (elementRef: HTMLElement | null) => {
  if (!elementRef) {
    return;
  }

  const fallbackChild = document.createElement('div');
  fallbackChild.setAttribute('tabindex', '-1');
  fallbackChild.style.display = 'none';
  elementRef.appendChild(fallbackChild);
};

const registerRef = (elementRef: HTMLElement | null) => {
  if (!elementRef) {
    return;
  }

  if (!window.__gracefulTrapElementRefs?.includes(elementRef)) {
    window.__gracefulTrapElementRefs = [
      ...(window.__gracefulTrapElementRefs || []),
      elementRef,
    ]
      .filter(isElementVisible)
      .sort(sortNodes);
  }
};

const unRegisterRef = (elementRef: HTMLElement | null) => {
  if (!elementRef) {
    return;
  }

  window.__gracefulTrapElementRefs = (window.__gracefulTrapElementRefs || [])
    .filter((ref) => ref !== elementRef)
    .filter(isElementVisible)
    .sort(sortNodes);
};

const focusFirstElement = () => {
  const elementRefs = window.__gracefulTrapElementRefs || [];
  const tabs = elementRefs
    .flatMap((ref) => tabbable(ref))
    .filter(filterNoInitFocus)
    .sort(sortNodes);

  if (tabs[0]) {
    setTimeout(() => {
      tabs[0].focus();
    }, 10);
  }
};

const updateTrap = () => {
  const elementRefs = window.__gracefulTrapElementRefs || [];
  if (window.__gracefulTrap) {
    window.__gracefulTrap.deactivate();
    window.__gracefulTrap.updateContainerElements(elementRefs);
  } else {
    window.__gracefulTrap = focusTrap.createFocusTrap(elementRefs, options);
  }

  const tabbableElements = elementRefs.flatMap((ref) => tabbable(ref));

  if (elementRefs.length > 0 && tabbableElements.length > 0) {
    window.__gracefulTrap.activate();
  } else {
    window.__gracefulTrap.deactivate();
  }

  focusFirstElement();
};

const setNoInitOnChildren = (
  elementRef: HTMLElement | null,
  noInitialFocus: boolean,
) => {
  if (!elementRef) {
    return;
  }

  const children = tabbable(elementRef);
  children.forEach((child) => {
    if (noInitialFocus) {
      child.setAttribute('data-no-init', 'on');
    } else {
      child.removeAttribute('data-no-init');
    }
  });
};

const FocusTrap = ({ children, active, mode, ...props }: FocusTrapProps) => {
  const elementRef = useRef<HTMLElement>(null);
  const [trap, setTrap] = useState<focusTrap.FocusTrap>();

  useEffect(() => {
    addFallbackChild(elementRef.current);
  }, []);

  // Solo mode, only one focus trap active
  if (mode === 'solo') {
    useEffect(() => {
      if (elementRef.current) {
        setTrap(focusTrap.createFocusTrap(elementRef.current, options));
      }
    }, [elementRef.current]);

    useEffect(() => {
      if (elementRef.current && trap) {
        if (active) {
          trap.activate();
        } else {
          trap.deactivate();
        }
      }
    }, [active]);

    // Combined mode, multiple focus trap areas to act as one
  } else if (mode === 'combined') {
    useEffect(() => {
      if (active) {
        registerRef(elementRef.current);
      } else {
        unRegisterRef(elementRef.current);
      }
      updateTrap();
    }, [active]);

    useEffect(() => {
      const noInit = (props as FocusTrapCombined).noInitialFocus;
      setNoInitOnChildren(elementRef.current, !!noInit);
    }, [props]);

    useEffect(() => {
      return () => {
        unRegisterRef(elementRef.current);
        updateTrap();
      };
    }, []);
  }

  return cloneElement(children, { ref: elementRef });
};

export default FocusTrap;
