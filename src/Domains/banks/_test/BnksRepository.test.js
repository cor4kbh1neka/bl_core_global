const BnksRepository = require('../BnksRepository');

describe('apkRepository reddis interface', () => {
    it('should throw an error whe invoke abstract behavior', async () => {
        //arrange
        const bnksRepository = new BnksRepository()

        //action and Assertion
        await expect(bnksRepository.checkbnks()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');

        await expect(bnksRepository.databnksdp()).rejects.toThrowError('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

    it('should throw an error when no have function in the usecase', async () => {
        const bnksRepository = new BnksRepository()

        await expect(bnksRepository.getdatabnksdp()).rejects.toThrow('BNKS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

});