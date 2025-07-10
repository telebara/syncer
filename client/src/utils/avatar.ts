export const generateAvatarUrl = (seed: string): string => {
  return `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(seed)}`;
};

export const generateDefaultAvatarUrl = (): string => {
  return `https://api.dicebear.com/9.x/identicon/svg?seed=default`;
};

export const isValidDataUri = (uri: string): boolean => {
  return uri.startsWith('data:image/');
};
