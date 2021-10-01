import { uploadPackageArtifact } from './features/upload-package-artifact';
import { getInput, setFailed, setOutput } from '@actions/core';
import { waterfallMap } from './utils/async';

export const uploadPackages = async (): Promise<void> => {
  try {
    const packagesInput = getInput('packages');
    const continueOnErrorInput = getInput('continue_on_error');
    const retentionDaysInput = getInput('retention_days');

    const packages: string[] = JSON.parse(packagesInput);
    const continueOnError: boolean = JSON.parse(continueOnErrorInput);
    const retentionDays: number = JSON.parse(retentionDaysInput);

    const uploadOptions = { continueOnError, retentionDays };

    const artifacts = await waterfallMap(packages, (pkg) =>
      uploadPackageArtifact(pkg, uploadOptions)
    );

    setOutput('artifacts', artifacts);
  } catch (e) {
    setFailed(e.message);
  }
};
