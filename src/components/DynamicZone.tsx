import { NextArray } from '../types';
import { FC } from 'react';
import React from 'react';
import { getBlockName } from '../strapi';

export type DynamicZoneProps = {
  blocks: NextArray<{ __component: string } & object>;
  blockDefinition: Record<string, any>;
} & object;

const DynamicZone: FC<DynamicZoneProps> = ({
  blocks,
  blockDefinition,
  ...props
}) => (
  <>
    {(blocks || []).map((block) => {
      const blockName = getBlockName<typeof blockDefinition>(block);
      const ImportedModule = blockDefinition[blockName] as any;

      return (
        ImportedModule && (
          <ImportedModule key={block._key} block={block} {...props} />
        )
      );
    })}
  </>
);

export default DynamicZone;
