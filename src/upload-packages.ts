import { uploadPackageArtifact } from './features/upload-package-artifact/upload-package-artifact';
import { getInput, setFailed, setOutput } from '@actions/core';
import { waterfallMap } from './utils/async';
import { RushPackage } from './utils/types';

export const uploadPackages = async (): Promise<void> => {
  try {
    const packagesInput = getInput('packages');
    const continueOnErrorInput = getInput('continue_on_error');
    const retentionDaysInput = getInput('retention_days');

    const packages: RushPackage[] = JSON.parse(packagesInput);
    const continueOnError: boolean = JSON.parse(continueOnErrorInput);
    const retentionDays: number = JSON.parse(retentionDaysInput);

    const uploadOptions = { continueOnError, retentionDays };

    const artifacts = await waterfallMap(packages, async (pkg) =>
      uploadPackageArtifact(pkg, uploadOptions)
    );

    setOutput('artifacts', artifacts);
  } catch (e) {
    if (hasMessage(e)) {
      setFailed(e.message);
    } else {
      setFailed(e as Error);
    }
  }
};

function hasMessage<T>(e: T): e is T & { message: string } {
  return typeof e === 'object' && 'message' in e;
}
