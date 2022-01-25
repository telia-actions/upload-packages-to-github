import { uploadPackageArtifact } from '../upload-package-artifact';
import * as formattersString from '../../../utils/formatters/string';
import * as artifactClient from '../../../services/artifact-client';
import * as fileSelection from '../../../services/file-selection';

jest.mock('../../../services/artifact-client');
jest.mock('../../../utils/formatters/string');
jest.mock('../../../services/file-selection');

describe('features upload package artifact', () => {
  describe('uploadPackageArtifact', () => {
    it('should pack and upload package', async () => {
      const pkg = {
        packageName: 'packageName',
        projectFolder: 'projectFolder',
      };

      const artifactName = 'artifactName';

      const toAlphaNumericSpy = jest
        .spyOn(formattersString, 'toAlphaNumeric')
        .mockReturnValue(artifactName);

      const filesToPackSpy = jest
        .spyOn(fileSelection, 'filesToPack')
        .mockResolvedValue(['the-file-to-upload']);

      const uploadArtifactSpy = jest.spyOn(artifactClient, 'uploadArtifact');
      const clientSpy = jest.spyOn(artifactClient, 'createClient');
      const result = await uploadPackageArtifact(pkg);

      expect(result.artifactName).toEqual(artifactName);
      expect(result.packageName).toEqual(pkg.packageName);

      expect(filesToPackSpy).toHaveBeenCalledTimes(1);
      expect(filesToPackSpy).toHaveBeenCalledWith(pkg);

      expect(toAlphaNumericSpy).toHaveBeenCalledTimes(1);
      expect(toAlphaNumericSpy).toHaveBeenCalledWith(pkg.projectFolder, '_');

      expect(clientSpy).toHaveBeenCalledTimes(1);

      expect(uploadArtifactSpy).toHaveBeenCalledTimes(1);
      expect(uploadArtifactSpy).toHaveBeenCalledWith(
        undefined,
        artifactName,
        ['the-file-to-upload'],
        pkg.projectFolder,
        undefined
      );
    });
  });
});
