import { ArtifactClient, create, UploadOptions, UploadResponse } from '@actions/artifact';
import { error } from '@actions/core';

export const createClient = (): ArtifactClient => create();

export const uploadArtifact = async (
  artifactClient: ArtifactClient,
  artifactName: string,
  files: string[],
  rootDir: string,
  options?: UploadOptions
): Promise<UploadResponse | void> => {
  try {
    return await artifactClient.uploadArtifact(artifactName, files, rootDir, options);
  } catch (e: unknown) {
    error(`Failed to upload "${artifactName}" artifact to github due to ${e}`);
  }
};
