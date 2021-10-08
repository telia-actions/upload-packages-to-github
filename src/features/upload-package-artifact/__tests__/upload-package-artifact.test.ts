import path from 'path';
import { uploadPackageArtifact } from '../upload-package-artifact';
import * as npmClient from '../../../services/npm-client/npm-client';
import * as formattersString from '../../../utils/formatters/string';
import * as artifactClient from '../../../services/artifact-client/artifact-client';
import { toAlphaNumeric } from '../../../utils/formatters/string';
import { mockPartial } from '../../../utils/mocks';

jest.mock('../../../services/npm-client/npm-client');
jest.mock('../../../services/artifact-client/artifact-client');
jest.mock('../../../utils/formatters/string');

describe('features upload package artifact', () => {
  describe('uploadPackageArtifact', () => {
    it('should pack and upload package', async () => {
      const pkg = mockPartial<RushPackage>({
        packageName: 'packageName',
        projectFolder: 'projectFolder',
        shouldPublish: true,
      });

      const tarName = 'tarName';

      const packPackageSpy = jest.spyOn(npmClient, 'packPackage').mockResolvedValue(tarName);

      const artifactName = 'artifactName';

      const toAlphaNumericSpy = jest
        .spyOn(formattersString, 'toAlphaNumeric')
        .mockReturnValue(artifactName);

      const uploadArtifactSpy = jest.spyOn(artifactClient, 'uploadArtifact');

      const result = await uploadPackageArtifact(pkg);

      expect(result.artifactName).toEqual(artifactName);
      expect(result.packageName).toEqual(pkg.packageName);
      expect(result.tarName).toEqual(tarName);

      expect(packPackageSpy).toHaveBeenCalledTimes(1);
      expect(packPackageSpy).toHaveBeenCalledWith(pkg.projectFolder);

      expect(toAlphaNumericSpy).toHaveBeenCalledTimes(1);
      expect(toAlphaNumericSpy).toHaveBeenCalledWith(pkg.projectFolder, '_');

      expect(uploadArtifactSpy).toHaveBeenCalledTimes(1);
      expect(uploadArtifactSpy).toHaveBeenCalledWith(
        artifactName,
        [path.resolve(pkg.projectFolder, tarName)],
        pkg.projectFolder,
        undefined
      );
    });
  });
});
