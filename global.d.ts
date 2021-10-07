type RushPackage = {
  packageName: string;
  projectFolder: string;
  shouldPublish: boolean;
};

type ArtifactMeta = {
  tarName: string;
  artifactName: string;
} & RushPackage;
