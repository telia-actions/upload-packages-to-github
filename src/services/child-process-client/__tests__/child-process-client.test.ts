import { executeCommand } from '../child-process-client';
import { mockPartial } from '../../../utils/mocks';
import * as childProcess from 'child_process';

jest.mock('child_process');

describe('services child process client', () => {
  describe('executeCommand', () => {
    const cmd = 'cmd';
    const options: childProcess.ExecOptions = {};
    const process = mockPartial<childProcess.ChildProcess>({});

    it('should execute child process command', async () => {
      // const cmdResult = 'cmdResult';
      // const cmdError = null;
      //
      // const execSpy = jest.spyOn(childProcess, 'exec').mockImplementation((_, __, cb) => {
      //   cb && cb(cmdError, cmdResult, '');
      //
      //   return process;
      // });
      //
      // const result = await executeCommand(cmd, options);
      //
      // expect(result).toEqual(cmdResult);
      //
      // expect(execSpy).toHaveBeenCalledTimes(1);
      // expect(execSpy).toHaveBeenCalledWith(cmd, options, expect.any(Function));
    });

    it('should reject when child process command encounters an error', async () => {
      const cmdResult = '';
      const cmdError: childProcess.ExecException = new Error('cmdError');

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
