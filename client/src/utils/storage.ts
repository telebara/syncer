const isClient = typeof window !== 'undefined';

export const storage = {
  getItem: (key: string): string | null => {
    if (!isClient) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    if (!isClient) return;
    try {
      localStorage.setItem(key, value);
    } catch {
      console.error('Error setting item in localStorage', key);
    }
  },

  removeItem: (key: string): void => {
    if (!isClient) return;
    try {
      localStorage.removeItem(key);
    } catch {
      console.error('Error removing item from localStorage', key);
    }
  },

  clear: (): void => {
    if (!isClient) return;
    try {
      localStorage.clear();
    } catch {
      console.error('Error clearing localStorage');
    }
  }
};

export { isClient };
