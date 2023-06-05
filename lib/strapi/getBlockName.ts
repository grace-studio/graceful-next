const clearAndUpper = (text: string) => text.replace(/-/, '').toUpperCase();

const toPascalCase = (text: string) =>
  text.replace(/(^\w|-\w)/g, clearAndUpper);

export const getBlockName = <T>(block: { __component: string }) =>
  toPascalCase(block.__component.replace('blocks.', '')) as keyof T;
