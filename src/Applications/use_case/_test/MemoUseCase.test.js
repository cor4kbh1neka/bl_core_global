const AddMemo = require('../../../Domains/memo/entities/AddMemo');
const MemoRepository = require('../../../Domains/memo/MemoRepository');
const MemoUseCase = require('../MemoUseCase');
const CacheService = require('../../caching/CacheService');

describe('MEMO', () => {

    describe('AddMemo data', () => {
        it('should orchestrating add memo correctly', async () => {
            const useCasePayload = new AddMemo({
                statustype: 1,
                statuspriority: 1,
                subject: 'ini contoh subject 50 character',
                memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
            });
            const resultadd = 'Add memo Success !';

            const mockcacheService = new CacheService();
            const mockmemoRepository = new MemoRepository();

            mockmemoRepository.addmemo = jest.fn()
                .mockImplementation(() => Promise.resolve(resultadd));
            mockcacheService.delete = jest.fn().mockResolvedValue();


            const addmemoUsecase = new MemoUseCase({
                memoRepository: mockmemoRepository,
                cacheServices: mockcacheService
            });

            const datamemousecase = await addmemoUsecase.addmemomem(useCasePayload);

            expect(datamemousecase).toStrictEqual(resultadd);
            expect(mockmemoRepository.addmemo).toBeCalledWith(useCasePayload);
            expect(mockcacheService.delete).toBeCalledWith(`memo:memo`);

        });
    });
});






