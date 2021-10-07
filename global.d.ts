type ArtifactMeta = {
  packageName: string;
  tarName: string;
  artifactName: string;
  shouldPublish: boolean;
};

type RushPackage = {
  packageName: string;
  projectFolder: string;
  shouldPublish: boolean;
};
