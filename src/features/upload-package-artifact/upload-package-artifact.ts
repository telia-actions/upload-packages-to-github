import { UploadOptions } from '@actions/artifact';
import { ArtifactMeta, uploadArtifact } from '../../services/artifact-client';
import { toAlphaNumeric } from '../../utils/formatters/string';
import { filesToPack } from '../../services/file-selection';
import { RushPackage } from '../../utils/types';

export const uploadPackageArtifact = async (
  pkg: RushPackage,
  options?: UploadOptions
): Promise<ArtifactMeta> => {
  const { projectFolder } = pkg;

  const artifactName = toAlphaNumeric(projectFolder, '_');

  const files = await filesToPack(pkg);

  await uploadArtifact(artifactName, files, projectFolder, options);

  return { artifactName, ...pkg };
};
