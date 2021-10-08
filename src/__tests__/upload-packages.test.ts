import { uploadPackages } from '../upload-packages';
import * as actionsCore from '@actions/core';
import * as uploadPackageArtifact from '../features/upload-package-artifact/upload-package-artifact';
import { mockPartial } from '../utils/mocks';
import { when } from 'jest-when';

jest.mock('@actions/core');
jest.mock('../features/upload-package-artifact/upload-package-artifact');

describe('upload packages', () => {
  const packages = ['package1', 'package2'];
  const continueOnError = true;
  const retentionDays = 2;

  const getInputSpy = jest.spyOn(actionsCore, 'getInput');
  const setOutputSpy = jest.spyOn(actionsCore, 'setOutput');
  const setFailedSpy = jest.spyOn(actionsCore, 'setFailed');

  const uploadPackageArtifactSpy = jest.spyOn(uploadPackageArtifact, 'uploadPackageArtifact');

  beforeEach(() => {
    when(getInputSpy)
      .calledWith('packages')
      .mockReturnValue(JSON.stringify(packages))
      .calledWith('continue_on_error')
      .mockReturnValue(JSON.stringify(continueOnError))
      .calledWith('retention_days')
      .mockReturnValue(JSON.stringify(retentionDays));
  });

  it('should parse inputs and set outputs', async () => {
    const artifact = mockPartial<ArtifactMeta>({
      artifactName: 'artifactName',
    });

    uploadPackageArtifactSpy.mockResolvedValue(artifact);

    await uploadPackages();

    expect(getInputSpy).toHaveBeenCalledTimes(3);
    expect(getInputSpy).toHaveBeenCalledWith('packages');
    expect(getInputSpy).toHaveBeenCalledWith('continue_on_error');
    expect(getInputSpy).toHaveBeenCalledWith('retention_days');

    expect(uploadPackageArtifactSpy).toHaveBeenCalledTimes(2);
    expect(uploadPackageArtifactSpy).toHaveBeenCalledWith('package1', {
      continueOnError,
      retentionDays,
    });
    expect(uploadPackageArtifactSpy).toHaveBeenCalledWith('package2', {
      continueOnError,
      retentionDays,
    });

    expect(setOutputSpy).toHaveBeenCalledTimes(1);
    expect(setOutputSpy).toHaveBeenCalledWith('artifacts', [artifact, artifact]);

    expect(setFailedSpy).toHaveBeenCalledTimes(0);
  });

  it('should set failure when error is encountered', async () => {
    const error = new Error('error');

    uploadPackageArtifactSpy.mockImplementation(() => {
      throw error;
    });

    await uploadPackages();

    expect(getInputSpy).toHaveBeenCalledTimes(3);
    expect(getInputSpy).toHaveBeenCalledWith('packages');
    expect(getInputSpy).toHaveBeenCalledWith('continue_on_error');
    expect(getInputSpy).toHaveBeenCalledWith('retention_days');

    expect(uploadPackageArtifactSpy).toHaveBeenCalledTimes(1);
    expect(uploadPackageArtifactSpy).toHaveBeenCalledWith('package1', {
      continueOnError,
      retentionDays,
    });

    expect(setOutputSpy).toHaveBeenCalledTimes(0);

    expect(setFailedSpy).toHaveBeenCalledTimes(1);
    expect(setFailedSpy).toHaveBeenCalledWith(error.message);
  });
});
