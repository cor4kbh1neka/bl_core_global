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
    describe('getdatamemo that already create', () => {
        it("should get data memo caching", async () => {
            const resultmemo = [
                {
                    idmemo: 1,
                    statustype: 1,
                    statuspriority: 1,
                    subject: 'ini contoh subject 50 character',
                    memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
                },
                {
                    idmemo: 2,
                    statustype: 1,
                    statuspriority: 1,
                    subject: 'ini contoh subject 50 character',
                    memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
                }
            ];



            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmemo));

            const getMemoUsecase = new MemoUseCase({
                cacheServices: mockcacheService
            });

            const payload = await getMemoUsecase.getmemodt();

            expect(mockcacheService.get).toBeCalledWith(`memo:memo`);
            expect(payload).toEqual(
                resultmemo
            );
        });
        it('should get data memo bank', async () => {

            const resultmemo = [
                {
                    idmemo: 1,
                    statustype: 1,
                    statuspriority: 1,
                    subject: 'ini contoh subject 50 character',
                    memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
                },
                {
                    idmemo: 2,
                    statustype: 1,
                    statuspriority: 1,
                    subject: 'ini contoh subject 50 character',
                    memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
                }
            ];

            // const resultdataresult = [{ "idgroup": 3, groupbank: "groupbank3", grouptype: 1, min_dp: 10, max_dp: 2500, min_wd: 30, max_wd: 50000 }, { "idgroup": 4, groupbank: "groupbank4", grouptype: 1, min_dp: 10, max_dp: 2500, min_wd: 30, max_wd: 50000 }];

            const mockcacheService = new CacheService();
            const mockMemoRepository = new MemoRepository();


            mockMemoRepository.getmemo = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmemo));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();

            const getMemoUsecase = new MemoUseCase({
                memoRepository: mockMemoRepository,
                cacheServices: mockcacheService

            });

            const payload = await getMemoUsecase.getmemodt();

            expect(mockMemoRepository.getmemo)
                .toBeCalledWith();
            expect(payload).toEqual(resultmemo);
            expect(mockcacheService.delete).toBeCalledWith(`memo:memo`);
            expect(mockcacheService.set).toBeCalledWith(`memo:memo`, JSON.stringify(resultmemo));
        });
    });

});






