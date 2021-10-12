import path from 'path';
import { UploadOptions } from '@actions/artifact';
import { ArtifactMeta, uploadArtifact } from '../../services/artifact-client';
import { changeVersion, packPackage } from '../../services/npm-client/npm-client';
import { read } from '../../services/json-client';
import { toAlphaNumeric } from '../../utils/formatters/string';

export const uploadPackageArtifact = async (
  pkg: RushPackage,
  preRelease: boolean,
  options?: UploadOptions
): Promise<ArtifactMeta> => {
  const { projectFolder } = pkg;

  const packageJsonPath = path.resolve(projectFolder, 'package.json');

  if (preRelease) {
    const { version } = read(packageJsonPath);

    console.log('version', version);

    const prereleaseVersion = `${version}-${Date.now()}`;

    console.log('prereleaseVersion', prereleaseVersion);

    const result = await changeVersion(projectFolder, prereleaseVersion);

    console.log('result', result);
  }

  const { version } = read(packageJsonPath);

  console.log('version', version);

  const tarName = await packPackage(projectFolder);

  console.log('tarName', tarName);

  const tarPath = path.resolve(projectFolder, tarName);

  const artifactName = toAlphaNumeric(projectFolder, '_');

  await uploadArtifact(artifactName, [tarPath], projectFolder, options);

  return { artifactName, tarName, ...pkg };
};
