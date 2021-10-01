import { executeCommand } from '../index';
import * as childProcess from 'child_process';

jest.mock('child_process');

describe('services child process client', () => {
  describe('executeCommand', () => {
    it('should execute child process command', async () => {
      const cmd = 'cmd';
      const options: childProcess.ExecOptions = {};

      const cmdResult = 'cmdResult';
      const cmdError = null;

      const process = {} as childProcess.ChildProcess;

      const execSpy = jest.spyOn(childProcess, 'exec').mockImplementation((_, __, cb) => {
        cb && cb(cmdError, cmdResult, '');

        return process;
      });

      const result = await executeCommand(cmd, options);

      expect(result).toEqual(cmdResult);

      expect(execSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledWith(cmd, options, expect.any(Function));
    });

    it('should reject when child process command encounters an error', async () => {
      const cmd = 'cmd';
      const options: childProcess.ExecOptions = {};

      const cmdResult = '';
      const cmdError: childProcess.ExecException = new Error('cmdError');

      const process = {} as childProcess.ChildProcess;

      const execSpy = jest.spyOn(childProcess, 'exec').mockImplementation((_, __, cb) => {
        cb && cb(cmdError, cmdResult, '');

        return process;
      });

      await expect(executeCommand(cmd, options)).rejects.toBe(cmdError);

      expect(execSpy).toHaveBeenCalledTimes(1);
      expect(execSpy).toHaveBeenCalledWith(cmd, options, expect.any(Function));
    });
  });
});
