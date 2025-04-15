'use server';
import React, { ComponentType, ElementType, FC, HTMLElementType } from 'react';
import { randomUUID } from 'crypto';

export type DynamicZoneProps<T extends {}> = {
  blockMapping: Record<string, ComponentType>;
  blocks: (T & Record<string, any>)[];
  elementType?: HTMLElementType;
};

type DynamicZoneInternalProps = DynamicZoneProps<{}> & { blockKeyName: string };

const DynamicZone: FC<DynamicZoneInternalProps> = ({
  blockKeyName,
  blockMapping = {},
  blocks = [],
  elementType = 'section',
}) => {
  const Elem = elementType as ElementType;

  return (
    <>
      {blocks.map((props) => {
        const { [blockKeyName]: __typename, ...blockProps } = props;
        const ImportedModule = blockMapping[__typename];

        if (!ImportedModule) {
          console.log(
            `DynamicZone: Block with name "${__typename}" not found.`,
          );

          return null;
        }

        return (
          <Elem key={randomUUID()} data-block-name={__typename}>
            <ImportedModule {...blockProps} />
          </Elem>
        );
      })}
    </>
  );
};

export default DynamicZone;
