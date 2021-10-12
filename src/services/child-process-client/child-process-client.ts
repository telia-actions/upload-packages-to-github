import util from 'util';
import { exec, ExecOptions } from 'child_process';
const execAsync = util.promisify(exec);

export const executeCommand = async (cmd: string, options?: ExecOptions): Promise<string> => {
  console.log('executing command:', cmd);

  const { stdout } = await execAsync(cmd, options);

  return stdout.toString();
};
