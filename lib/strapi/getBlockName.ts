const clearAndUpper = (text: string) => text.replace(/-/, '').toUpperCase();

const toPascalCase = (text: string) =>
  text.replace(/(^\w|-\w)/g, clearAndUpper);

export const getBlockName = <T>(block: { __typename: string }) =>
  toPascalCase(block.__typename.replace('ComponentBlocks', '')) as keyof T;
