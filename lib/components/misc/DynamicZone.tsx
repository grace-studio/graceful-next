import { NextArray } from '../../types';
import { FC } from 'react';
import React from 'react';

export type DynamicZoneProps = object & {
  blocks: NextArray<object & { blockName: string }>;
  blockDefinition: object;
};

const DynamicZone: FC<DynamicZoneProps> = ({
  blocks = [],
  blockDefinition,
  ...props
}) => (
  <>
    {blocks.map((block) => {
      const name = block.blockName as keyof typeof blockDefinition;
      const ImportedModule = blockDefinition[name] as any;

      return ImportedModule ? (
        <div key={block._key} data-component-name={name}>
          <ImportedModule block={block} {...props} />
        </div>
      ) : null;
    })}
  </>
);

export default DynamicZone;
