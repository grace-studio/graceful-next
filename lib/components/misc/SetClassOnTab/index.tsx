'use client';
import { FC } from 'react';
import { useSetClassOnTab } from '../../../hooks';

type SetClassOnTabProps = {
  className: string;
  element?: string;
};

const SetClassOnTab: FC<SetClassOnTabProps> = ({
  className,
  element = 'body',
}) => {
  useSetClassOnTab(className, element);

  return null;
};

export default SetClassOnTab;
