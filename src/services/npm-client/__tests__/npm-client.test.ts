import { packPackage } from '../index';
import * as childProcessClient from '../../child-process-client';

jest.mock('../../child-process-client');

describe('services npm client', () => {
  describe('packPackage', () => {
    it('should pack npm package', async () => {
      const packagePath = 'packagePath';
      const packOutput = ' packOutput \n';

      const executeCommandSpy = jest
        .spyOn(childProcessClient, 'executeCommand')
        .mockResolvedValue(packOutput);

      const result = await packPackage(packagePath);

      expect(result).toEqual(packOutput.trim());

      expect(executeCommandSpy).toHaveBeenCalledTimes(1);
      expect(executeCommandSpy).toHaveBeenCalledWith('npm pack', { cwd: packagePath });
    });
  });
});
