const ApkRepository = require('../ApkRepository');

describe('apkRepository reddis interface', () => {
    it('should throw an error whe invoke abstract behavior', async () => {
        //arrange
        const apkRepository = new ApkRepository()

        //action and Assertion
        await expect(apkRepository.datasettings({})).rejects.toThrowError('APK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(apkRepository.events({})).rejects.toThrowError('APK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(apkRepository.pemberitahuans({})).rejects.toThrowError('APK_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

});