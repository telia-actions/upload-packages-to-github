import packlist from 'npm-packlist';
import { join } from 'path';
import { existsSync } from '../../utils/files';
import { RushPackage } from '../../utils/types';

export const filesToPack = async ({
  packageName,
  projectFolder,
}: Pick<RushPackage, 'packageName' | 'projectFolder'>): Promise<string[]> => {
  // indexOf may return -1, in which case we take the whole string
  // If not we skip the first /, and thus get everything after the package's scope
  const simplePackageName = packageName.substring(packageName.indexOf('/') + 1);

  const filesPromise = packlist({ path: projectFolder });
  const logFiles = [
    join(projectFolder, `${simplePackageName}.build.log`),
    join(projectFolder, `${simplePackageName}.build.error.log`),
  ];
  const files = (await filesPromise).map((filename) => {
    return join(projectFolder, filename);
  });
  files.push(...logFiles.filter(existsSync));

  return files;
};
