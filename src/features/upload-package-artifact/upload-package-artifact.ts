import { UploadOptions } from '@actions/artifact';
import { ArtifactMeta, uploadArtifact } from '../../services/artifact-client';
import { toAlphaNumeric } from '../../utils/formatters/string';
import packlist from 'npm-packlist';
import { join } from 'path';

export const uploadPackageArtifact = async (
  pkg: RushPackage,
  options?: UploadOptions
): Promise<ArtifactMeta> => {
  const { projectFolder } = pkg;

  const files = (await packlist({ path: projectFolder })).map((filename) =>
    join(projectFolder, filename)
  );

  const artifactName = toAlphaNumeric(projectFolder, '_');

  await uploadArtifact(artifactName, files, projectFolder, options);

  return { artifactName, ...pkg };
};
