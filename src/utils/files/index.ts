import { existsSync as originalExistsSync } from 'fs';

// Attempting to mock fs can lead to issues since node uses it internally
// So we have this very simple proxy
export function existsSync(path: string): boolean {
  return originalExistsSync(path);
}
