'use client';
import {
  DragEvent,
  DragEventHandler,
  FC,
  ReactNode,
  useRef,
  useState,
} from 'react';

type SplitterType = {
  content: ReactNode[];
};

const Splitter: FC<SplitterType> = ({ content }) => {
  const min = 0;
  const leftContent = content[0];
  const rightContent = content[1];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [priorCursor, setPriorCursor] = useState<string | null>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setPriorCursor(document.body.style.cursor);
    document.body.style.cursor = 'ew-resize';
  };

  const onMouseMove = (e: MouseEvent) => {
    if (
      !dragging ||
      !leftRef.current ||
      !rightRef.current ||
      !containerRef.current
    )
      return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const totalWidth = containerRect.width;
    const offsetX = e.clientX - containerRect.left;

    let leftPercentage = (offsetX / totalWidth) * 100;
    let rightPercentage = 100 - leftPercentage;

    if (leftPercentage < min || rightPercentage < min) return;

    leftRef.current.style.flex = leftPercentage.toString();
    rightRef.current.style.flex = rightPercentage.toString();
  };

  const onMouseUp = () => {
    if (!dragging) return;
    setDragging(false);
    if (priorCursor) document.body.style.cursor = priorCursor;
  };

  const classes = 'flex-1 overflow-hidden relative';

  return (
    <div className="flex flex-row gap-1 w-full relative justify-center">
      {/* {content.map((c, i) => (
        <div key={'split-' + i} className="flex-1 overflow-hidden relative">
          <div
            style={{
              transform: `translateX(-${(i / length) * 100}%)`,
            }}
            className={'absolute w-screen left-0'}
          >
            {c}
          </div>
          <div className="relative -z-1 opacity-0">{c}</div>
        </div>
      ))} */}
      <div
        ref={containerRef}
        className="flex w-full  border border-gray-300 group"
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div ref={leftRef} className={classes}>
          <div
            style={{
              transform: `translateX(-0%)`,
            }}
            className={'absolute w-screen left-0'}
          >
            {leftContent}
          </div>
          <div className="relative -z-1 opacity-0">{leftContent}</div>
        </div>
        <div
          className="w-0 flex bg-red-300 items-center justify-center relative"
          onMouseDown={onMouseDown}
        >
          <div className="h-20 z-10 absolute w-3 transition-opacity opacity-0 group-hover:opacity-100 block bg-white border-2 rounded-sm border-black cursor-row-resize"></div>
        </div>
        <div ref={rightRef} className={classes}>
          <div
            style={{
              transform: `translateX(-0%)`,
            }}
            className={'absolute w-screen right-0'}
          >
            {rightContent}
          </div>
          <div className="relative -z-1 opacity-0">{rightContent}</div>
        </div>
      </div>
    </div>
  );
};

export default Splitter;
