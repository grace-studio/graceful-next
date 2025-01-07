'use client';

import classNames from 'classnames';
import React, {
  Children,
  CSSProperties,
  FC,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useMicroStore } from '../../hooks';

const BaseAccordionTitle: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
}) => <>{children}</>;

const BaseAccordionContent: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
}) => <>{children}</>;

type AccordionState = {
  isOpen: boolean;
  contentStyle: CSSProperties;
  titleClassName?: string;
  contentClassName?: string;
};

const initialState: AccordionState = {
  isOpen: false,
  contentStyle: {},
};

type BaseAccordionProps = PropsWithChildren<{
  initiallyOpen?: boolean;
  transitionClassName?: string;
  onStateChange?: (state: AccordionState) => void;
  className?: string;
}>;

const BaseAccordion = ({
  transitionClassName = 'transition-all duration-300',
  initiallyOpen,
  children,
  onStateChange,
  className = 'border-4 border-gray-900 bg-gray-100',
}: BaseAccordionProps) => {
  const [state, dispatch] = useMicroStore({
    ...initialState,
    isOpen: initiallyOpen || initialState.isOpen,
  });
  const [title, setTitle] = useState<ReactNode>();
  const [content, setContent] = useState<ReactNode>();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch({
      contentStyle: {
        maxHeight: state.isOpen ? `${ref.current?.clientHeight}px` : 0,
      },
    });

    onStateChange && onStateChange(state);
  }, [dispatch, onStateChange, state]);

  useEffect(() => {
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) {
        return;
      }

      if (child.type === BaseAccordionTitle) {
        if (typeof child.props !== 'object' || child.props === null) return;
        dispatch({
          titleClassName:
            (child.props as { className?: string }).className ??
            'p-4 text-lg text-left hover:bg-gray-300 \
            outline outline-4 outline-transparent focus-within:outline-fuchsia-600',
        });
        setTitle(child);
      } else if (child.type === BaseAccordionContent) {
        if (typeof child.props !== 'object' || child.props === null) return;
        dispatch({
          contentClassName:
            (child.props as { className?: string }).className ??
            'p-4 text-lg border-t-2 border-gray-300',
        });
        setContent(child);
      }
    });
  }, [children, dispatch]);

  const handleOnClick = () => {
    dispatch({ isOpen: !state.isOpen });
  };

  const transitionClasses = classNames('overflow-hidden', transitionClassName);
  const titleClasses = classNames('block w-full', state.titleClassName);
  const contentClasses = classNames(state.contentClassName);

  return (
    <div className={className}>
      <button
        className={titleClasses}
        aria-expanded={state.isOpen}
        onClick={(e) => {
          e.preventDefault();
          handleOnClick();
        }}
      >
        {title}
      </button>
      <div style={state.contentStyle as any} className={transitionClasses}>
        <div ref={ref} className={contentClasses}>
          {content}
        </div>
      </div>
    </div>
  );
};

BaseAccordion.Title = BaseAccordionTitle;
BaseAccordion.Content = BaseAccordionContent;

export default BaseAccordion;
