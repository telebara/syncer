import { TAGS, TagType } from '../types/tags';

export { TAGS };
export type { TagType };

export const truncateLongString = (str: string, max: number) => {
  return str.length > max ? str.slice(0, max - 1) + "..." : str;
}
