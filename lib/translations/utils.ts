export const getLeaf = (obj: any, keys: string[]): string | null => {
  const [key] = keys;

  if (!obj) {
    return null;
  }

  if (typeof obj === 'string') {
    return obj;
  }

  if (typeof obj[key] === 'string') {
    return obj[key];
  }

  return getLeaf(obj[key], keys.slice(1));
};

type TreeLeaf = {
  [key: string]: string | TreeLeaf;
};

export const getLeafPaths = (
  treeObject: TreeLeaf,
  currentPath: string[] = [],
): string[] => {
  const leafPaths: string[] = [];

  const traverse = (node: TreeLeaf, path: string[]): void => {
    if (typeof node === 'string') {
      leafPaths.push(path.join('.'));

      return;
    }

    if (typeof node === 'object' && node !== null) {
      for (const key in node) {
        if (node.hasOwnProperty(key)) {
          traverse(node[key] as TreeLeaf, [...path, key]);
        }
      }
    }
  };

  traverse(treeObject, currentPath);

  return leafPaths;
};
