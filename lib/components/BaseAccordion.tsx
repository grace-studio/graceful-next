import classNames from 'classnames';
import React from 'react';
import {
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
import { useMicroStore } from '../hooks';

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
  transitionClassName?: string;
  onStateChange?: (state: AccordionState) => void;
}>;

const BaseAccordion = ({
  transitionClassName,
  children,
  onStateChange,
}: BaseAccordionProps) => {
  const [state, dispatch] = useMicroStore(initialState);
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
        dispatch({
          titleClassName: child.props.className,
        });
        setTitle(child);
      } else if (child.type === BaseAccordionContent) {
        dispatch({
          contentClassName: child.props.className,
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
    <>
      <button
        className={titleClasses}
        aria-expanded={state.isOpen}
        onClick={handleOnClick}
      >
        {title}
      </button>
      <div style={state.contentStyle} className={transitionClasses}>
        <div ref={ref} className={contentClasses}>
          {content}
        </div>
      </div>
    </>
  );
};

BaseAccordion.Title = BaseAccordionTitle;
BaseAccordion.Content = BaseAccordionContent;

export default BaseAccordion;
