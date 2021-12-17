# upload-packages-to-github

Github action to upload packages to github as workflow artifacts

## Usage

```yaml
jobs:
  my_job:
    outputs:
      artifacts: ${{ steps.upload.outputs.artifacts }}
    steps:
      - name: Upload github artifacts
        id: upload
        uses: telia-actions/upload-packages-to-github
        with:
          packages: <package list>
```

The package list can be output from `telia-actions/get-rush-projects` or `telia-actions/find-changed-rush-packages`. It should be an array of packages like so (though additional properties are allowed):

```js
[
  {
    packageName: '@telia/my-package',
    projectFolder: '/users/xxx/my-repo/packages/my-package',
  },
];
```

Output from the package (outputs.artifacts) is an identical array, with an additional `artifactName` property added to each item. The `artifactName` will be the name of the uploaded GitHub artifact.

### Contents of the artifact

The artifact will contain the same files as an npm package would, based on the package's `files` array or any `.gitignore` or `.npmignore` file inside the package. It will also contain, if they existed, Rush.js's `<package>.build.log` and `<package>.build.error.log`.

Unlike `npm pack`, files will keep their last modification date.

As of version 5, files are not wrapped in any additional folders.
