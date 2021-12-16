import { UploadOptions } from '@actions/artifact';
import { ArtifactMeta, uploadArtifact } from '../../services/artifact-client';
import { toAlphaNumeric } from '../../utils/formatters/string';
import packlist from 'npm-packlist';
import { join } from 'path';
import { existsSync } from 'fs';

export const uploadPackageArtifact = async (
  pkg: RushPackage,
  options?: UploadOptions
): Promise<ArtifactMeta> => {
  const { projectFolder, packageName } = pkg;
  // indexOf may return -1, in which case we take the whole string
  // If not we skip the / and get everything after the package's scope
  const simplePackageName = packageName.substring(packageName.indexOf('/') + 1);

  const files = (await packlist({ path: projectFolder })).map((filename) => {
    return join(projectFolder, filename);
  });
  const logFiles = [
    join(projectFolder, `${simplePackageName}.build.log`),
    join(projectFolder, `${simplePackageName}.build.error.log`),
  ];
  files.push(...logFiles.filter(existsSync));

  // eslint-disable-next-line no-console
  console.log('The project folder is', projectFolder);
  // eslint-disable-next-line no-console
  console.log('The files are', files);

  const artifactName = toAlphaNumeric(projectFolder, '_');

  await uploadArtifact(artifactName, files, projectFolder, options);

  return { artifactName, ...pkg };
};
