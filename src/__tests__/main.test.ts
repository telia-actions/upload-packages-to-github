import * as uploadPackages from '../upload-packages';

jest.mock('../upload-packages');

describe('main', () => {
  const uploadPackagesSpy = jest.spyOn(uploadPackages, 'uploadPackages');

  it('should start uploading packages', async () => {
    require('../main');

    expect(uploadPackagesSpy).toHaveBeenCalledTimes(1);
  });
});
