import { executeCommand } from '../child-process-client/child-process-client';

export const packPackage = async (packagePath: string): Promise<string> => {
  const packOutput = await executeCommand('npm pack', { cwd: packagePath });

  return packOutput.trim();
};

export const changeVersion = (packagePath: string, version: string): Promise<string> => {
  return executeCommand(`npm version ${version}`, { cwd: packagePath });
};
