import { exec, ExecOptions } from 'child_process';

export const executeCommand = (cmd: string, options?: ExecOptions): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(cmd, options, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.toString());
      }
    });
  });
};
