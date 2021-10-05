import path from 'path';
import { UploadOptions } from '@actions/artifact';
import { uploadArtifact } from '../../services/artifact-client/artifact-client';
import { packPackage } from '../../services/npm-client/npm-client';
import { toAlphaNumeric } from '../../utils/formatters/string';

export const uploadPackageArtifact = async (
  packagePath: string,
  options?: UploadOptions
): Promise<ArtifactMeta> => {
  const packageJsonPath = path.resolve(packagePath, 'package.json');

  const { name } = require(packageJsonPath);

  const tarName = await packPackage(packagePath);
  const tarPath = path.resolve(packagePath, tarName);

  const artifactName = toAlphaNumeric(packagePath, '_');

  await uploadArtifact(artifactName, [tarPath], packagePath, options);

  return { artifactName, packageName: name, tarName };
};
