import path from 'path';
import { uploadPackageArtifact } from '../upload-package-artifact';
import * as npmClient from '../../../services/npm-client/npm-client';
import * as formattersString from '../../../utils/formatters/string';
import * as artifactClient from '../../../services/artifact-client/artifact-client';
import { toAlphaNumeric } from '../../../utils/formatters/string';

jest.mock('../../../services/npm-client/npm-client');
jest.mock('../../../services/artifact-client/artifact-client');
jest.mock('../../../utils/formatters/string');

describe('features upload package artifact', () => {
  describe('uploadPackageArtifact', () => {
    it('should pack and upload package', async () => {
      const packagePath = path.resolve(__dirname, '..', '__mocks__/package');

      const packageJson = require(packagePath + '/package.json');

      const tarName = 'tarName';

      const packPackageSpy = jest.spyOn(npmClient, 'packPackage').mockResolvedValue(tarName);

      const artifactName = 'artifactName';

      const toAlphaNumericSpy = jest
        .spyOn(formattersString, 'toAlphaNumeric')
        .mockReturnValue(artifactName);

      const uploadArtifactSpy = jest.spyOn(artifactClient, 'uploadArtifact');

      const result = await uploadPackageArtifact(packagePath);

      expect(result.artifactName).toEqual(artifactName);
      expect(result.packageName).toEqual(packageJson.name);
      expect(result.tarName).toEqual(tarName);

      expect(packPackageSpy).toHaveBeenCalledTimes(1);
      expect(packPackageSpy).toHaveBeenCalledWith(packagePath);

      expect(toAlphaNumericSpy).toHaveBeenCalledTimes(1);
      expect(toAlphaNumericSpy).toHaveBeenCalledWith(packagePath, '_');

      expect(uploadArtifactSpy).toHaveBeenCalledTimes(1);
      expect(uploadArtifactSpy).toHaveBeenCalledWith(
        artifactName,
        [packagePath + '/' + tarName],
        packagePath,
        undefined
      );
    });
  });
});
