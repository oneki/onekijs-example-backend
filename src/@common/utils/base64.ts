import * as base64 from 'base64-url';

export const base64url = (str: string): string => {
  return base64.encode(str);
}