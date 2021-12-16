// import { filesToPack } from '../file-selection';

describe('file-selection', () => {
  describe('filesToPack', () => {
    it('Selects <package-name>.build.log if it exists', () => {});
    it('Selects <package-name>.build.error.log if it exists', () => {});
    it('Trims scope name from the package name before looking for build/error logs', () => {});
    it("Selects files from the package's files array (in package.json)", () => {});
    it("Includes the path to the package itself in each file's path", () => {});
  });
});
