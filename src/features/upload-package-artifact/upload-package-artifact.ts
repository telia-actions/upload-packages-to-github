import path from 'path';
import { UploadOptions } from '@actions/artifact';
import { ArtifactMeta, uploadArtifact } from '../../services/artifact-client';
import { packPackage } from '../../services/npm-client/npm-client';
import { toAlphaNumeric } from '../../utils/formatters/string';

export const uploadPackageArtifact = async (
  pkg: RushPackage,
  options?: UploadOptions
): Promise<ArtifactMeta> => {
  const { projectFolder } = pkg;

  const tarName = await packPackage(projectFolder);
  const tarPath = path.resolve(projectFolder, tarName);

  const artifactName = toAlphaNumeric(projectFolder, '_');

  await uploadArtifact(artifactName, [tarPath], projectFolder, options);

  return { artifactName, tarName, ...pkg };
};
