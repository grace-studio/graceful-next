export const saveToSessionStorage = (key: string, value: any): void => {
  try {
    const serializedState = JSON.stringify(value);
    sessionStorage.setItem(key, serializedState);
  } catch (error) {
    console.error(`Failed to save key "${key}" to session storage:`, error);
  }
};

export const loadFromSessionStorage = <T>(key: string): T | undefined => {
  try {
    const serializedState = sessionStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState) as T;
  } catch (error) {
    console.error(`Failed to load key "${key}" from session storage:`, error);
    return undefined;
  }
};
