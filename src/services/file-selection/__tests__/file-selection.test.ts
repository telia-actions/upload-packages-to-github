import { filesToPack } from '../file-selection';
import * as files from '../../../utils/files';
import { resolve } from 'path';
import type { RushPackage } from '../../../utils/types';

// A 'var' is necessary because jest.mock is very special
// eslint-disable-next-line no-var
var mockedPacklist: jest.Mock<any>;

jest.mock('npm-packlist', () => {
  mockedPacklist = jest.fn();
  return mockedPacklist;
});

interface TestData {
  scope: string;
  name: string;
  folder: string;
}

const DATA: TestData = {
  scope: 'telia',
  name: 'test-package',
  folder: 'parent-folder/package-folder',
};

describe('file-selection', () => {
  describe('filesToPack', () => {
    const packInput = mockedPackInput(DATA);

    describe('Includes build and error logs if they exist', () => {
      const buildLog = buildLogPath(DATA);
      const errorLog = errorLogPath(DATA);

      beforeEach(() => {
        // Log files are not handled by npm-packlist, so mock an empty value to keep it simple
        mockedPacklist.mockResolvedValue([]);
      });
      it('with only <package-name>.build.log', async () => {
        jest.spyOn(files, 'existsSync').mockImplementation((path) => {
          return path === buildLog;
        });
        const filelist = await filesToPack(packInput);
        expect(filelist).toContain(buildLog);
        expect(filelist).not.toContain(errorLog);
      });
      it('with only <package-name>.build.error.log', async () => {
        jest.spyOn(files, 'existsSync').mockImplementation((path) => {
          return path === errorLog;
        });
        const filelist = await filesToPack(packInput);
        expect(filelist).toContain(errorLog);
        expect(filelist).not.toContain(buildLog);
      });
      it('with both logs', async () => {
        jest.spyOn(files, 'existsSync').mockReturnValue(true);
        const filelist = await filesToPack(packInput);
        expect(filelist).toContain(buildLog);
        expect(filelist).toContain(errorLog);
      });
      it('without any log', async () => {
        jest.spyOn(files, 'existsSync').mockReturnValue(false);
        const filelist = await filesToPack(packInput);
        expect(filelist).not.toContain(buildLog);
        expect(filelist).not.toContain(errorLog);
      });
    });

    it('Includes the full path to the files npm pack would pick', async () => {
      // Ignore log files to keep this test simple
      jest.spyOn(files, 'existsSync').mockReturnValue(false);
      mockedPacklist.mockResolvedValue(['a', 'b', 'c']);
      const filelist = await filesToPack(packInput);
      expect(filelist).toContain(packageFilePath(DATA, 'a'));
      expect(filelist).toContain(packageFilePath(DATA, 'b'));
      expect(filelist).toContain(packageFilePath(DATA, 'c'));
    });
  });
});

function mockedPackInput(testData: TestData): RushPackage {
  return {
    packageName: `@${testData.scope}/${testData.name}`,
    projectFolder: resolve('.', testData.folder),
    shouldPublish: false,
  };
}

function buildLogPath(testData: TestData): string {
  return packageFilePath(testData, `${testData.name}.build.log`);
}

function errorLogPath(testData: TestData): string {
  return packageFilePath(testData, `${testData.name}.build.error.log`);
}

function packageFilePath(testData: TestData, fileName: string): string {
  return resolve('.', testData.folder, fileName);
}
