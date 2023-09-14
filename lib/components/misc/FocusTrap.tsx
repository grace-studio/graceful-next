import { ReactElement, cloneElement, useEffect, useRef, useState } from 'react';
import * as focusTrap from 'focus-trap';
import { tabbable } from 'tabbable';

type FocusTrapProps = {
  children: ReactElement;
  active?: boolean;
  combined?: boolean;
};

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

const sortNodes = (a: any, b: any) =>
  a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;

const validateRefs = () => {
  window.__gracefulTrapElementRefs = (
    window.__gracefulTrapElementRefs || []
  ).filter((ref) => ref.checkVisibility());
};

const registerRef = (elementRef: any) => {
  if (!elementRef) {
    return;
  }

  if (!window.__gracefulTrapElementRefs?.includes(elementRef)) {
    window.__gracefulTrapElementRefs = [
      ...(window.__gracefulTrapElementRefs || []),
      elementRef,
    ].sort(sortNodes);
  }

  validateRefs();
};

const unRegisterRef = (elementRef: any) => {
  if (!elementRef) {
    return;
  }

  window.__gracefulTrapElementRefs = (window.__gracefulTrapElementRefs || [])
    .filter((ref) => ref !== elementRef)
    .sort(sortNodes);

  validateRefs();
};

const focusFirstElement = () => {
  const elementRefs = window.__gracefulTrapElementRefs || [];
  const tabs = elementRefs.flatMap((ref) => tabbable(ref)).sort(sortNodes);

  if (tabs[0]) {
    setTimeout(() => {
      tabs[0].focus();
    }, 100);
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

  if (elementRefs.length > 0) {
    window.__gracefulTrap.activate();
  } else {
    window.__gracefulTrap.deactivate();
  }

  focusFirstElement();
};

const FocusTrap = ({ children, active, combined }: FocusTrapProps) => {
  const elementRef = useRef<HTMLElement>(null);
  const [trap, setTrap] = useState<focusTrap.FocusTrap>();

  if (!combined) {
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
  } else {
    useEffect(() => {
      if (active) {
        registerRef(elementRef.current);
      } else {
        unRegisterRef(elementRef.current);
      }
      updateTrap();
    }, [active]);

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
