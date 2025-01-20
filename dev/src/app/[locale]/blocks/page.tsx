import {
  StrapiDynamicZone,
  StrapiDynamicZoneProps,
} from '@grace-studio/graceful-next/components';
import dynamic from 'next/dynamic';

export const blockMapping = {
  'test-1': dynamic(() => import('@/components/blocks/Test1')),
  'test-hej': dynamic(() => import('@/components/blocks/Test1')),
  test2: dynamic(() => import('@/components/blocks/Test2')),
};

const strapiBlocks: StrapiDynamicZoneProps['blocks'] = [
  { __typename: 'test-1', someProp: 'hej' },
  { __typename: 'denharfinnsinte', someProp: 'hej' },
  { __typename: 'test2', someProp: 'hej', anotherProp: 'blaha' },
  { __typename: 'test-1', someProp: 'hej' },
];

const BlocksPage = () => (
  <div className="p-6 grid gap-4">
    <StrapiDynamicZone blockMapping={blockMapping} blocks={strapiBlocks} />
  </div>
);

export default BlocksPage;
