import { createClient, uploadArtifact } from '../artifact-client';
import * as artifact from '@actions/artifact';
import * as actionsCore from '@actions/core';
import { ArtifactClient } from '@actions/artifact/lib/internal/artifact-client';
import { ArtifactMeta } from '../types';
import { mockPartial } from '../../../utils/mocks';

jest.mock('@actions/artifact');
jest.mock('@actions/core');

describe('services artifact client', () => {
  describe('createClient', () => {
    it('should create artifact client', async () => {
      const clientSpy = jest.spyOn(artifact, 'create');

      createClient();

      expect(clientSpy).toHaveBeenCalledTimes(1);
    });
  });
  describe('uploadArtifact', () => {
    const artifactName = 'artifactName';
    const files = ['file1', 'file2'];
    const rootDir = 'rootDir';
    it('should upload artifact to github', async () => {
      const artifactResult = mockPartial<ArtifactMeta>({
        packageName: 'packageName',
      });

      const client = mockPartial<ArtifactClient>({
        uploadArtifact: jest.fn().mockResolvedValue(artifactResult),
      });

      const result = await uploadArtifact(client, artifactName, files, rootDir);

      expect(result).toEqual(artifactResult);

      expect(client.uploadArtifact).toHaveBeenCalledTimes(1);
      expect(client.uploadArtifact).toHaveBeenCalledWith(artifactName, files, rootDir, undefined);
    });
    it('should print out artifact name which could not be uploaded', async () => {
      const client = mockPartial<ArtifactClient>({
        uploadArtifact: jest.fn().mockRejectedValue(new Error('mocked error')),
      });

      const result = await uploadArtifact(client, artifactName, files, rootDir);

      const errorSpy = jest.spyOn(actionsCore, 'error').mockImplementation(() => {});

      expect(result).toEqual(undefined);

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining(artifactName));
    });
  });
});
