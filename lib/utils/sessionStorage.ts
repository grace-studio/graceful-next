export const saveToSessionStorage = (key: string, value: any) => {
  try {
    const serializedState = JSON.stringify(value);
    sessionStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Failed to save to session storage:', error);
  }
};

export const loadFromSessionStorage = (key: string): string | undefined => {
  try {
    const serializedState = sessionStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Failed to load from session storage:', error);
    return undefined;
  }
};
