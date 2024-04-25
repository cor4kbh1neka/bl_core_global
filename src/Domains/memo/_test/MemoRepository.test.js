const MemoRepository = require('../MemoRepository');

describe('MemoRepository', () => {

    it('should throw an error whe invoke abstract behavior on add group', async () => {
        const memoRepository = new MemoRepository()
        await expect(memoRepository.addmemo()).rejects.toThrowError('MEMO_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });

});