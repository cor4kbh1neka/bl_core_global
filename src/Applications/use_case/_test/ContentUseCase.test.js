const EditContent = require('../../../Domains/contnt/entities/EditContent');
const AddSitemap = require('../../../Domains/contnt/entities/AddSitemap');
const ContentRepository = require('../../../Domains/contnt/ContentRepository');
const CacheService = require('../../caching/CacheService');
const ContentUseCase = require('../ContentUseCase');


describe('MetaTag', () => {
    describe('it should edit meta tag correctltly', () => {
        it('it should edit meta tag correctltly', async () => {
            // Arrange
            const useCasePayload = new EditContent({
                mttag: '<h2>welcome</h2>',
                artcl: '<h2>test article</h2>',
                scrptlvc: 'http://deposit.home',
            });
            const params = {
                iddtmeta: 3
            };


            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();

            mockContentRepository.editmtdt = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();


            const editcontentusecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const datagroupusecase = await editcontentusecase.editmttag(useCasePayload, params);


            expect(datagroupusecase).toStrictEqual('metatag updated');

            expect(mockContentRepository.editmtdt).toBeCalledWith(useCasePayload, params.iddtmeta);
            expect(mockcacheService.delete).toBeCalledWith(`metatag:metatag`);

        });
    });
    describe('should success calling get data metatag', () => {

        it('should success calling get data metatag', async () => {

            // Arrange
            const resultMockMetaTag = {
                mttag: '<h2>welcome44</h2>',
                artcl: '<h2>test article44</h2>',
                scrptlvc: 'http://deposit.home44',
            };

            // Action
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();


            mockContentRepository.gettmtdt = jest.fn()
                .mockImplementation(() => Promise.resolve(resultMockMetaTag));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();

            const getdataContent = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const payload = await getdataContent.getmttag();

            // Assert
            expect(mockContentRepository.gettmtdt).toBeCalledWith();
            expect(mockcacheService.delete).toBeCalledWith(`metatag:metatag`);
            expect(mockcacheService.set).toBeCalledWith(`metatag:metatag`, JSON.stringify(resultMockMetaTag));
            expect(payload).toEqual(resultMockMetaTag);
        });

        it('should success calling get data metatag with redis', async () => {

            // Arrange
            const resultMockMetaTag = {
                mttag: '<h2>welcome44</h2>',
                artcl: '<h2>test article44</h2>',
                scrptlvc: 'http://deposit.home44',
                headers: {
                    'X-Data-Source': 'cache',
                }
            };

            // Action
            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultMockMetaTag));


            const getdataContent = new ContentUseCase({
                cacheServices: mockcacheService
            });

            const payload = await getdataContent.getmttag();

            // Assert
            expect(mockcacheService.get).toBeCalledWith(`metatag:metatag`);
            expect(payload).toEqual(
                resultMockMetaTag
            );
        });
    });
});
describe('SITEMAP', () => {
    describe('should success add data sitemap', () => {
        it('should success add data sitemap', async () => {
            // Arrange
            const useCasePayload = new AddSitemap({
                urpage: 'home',
            });
            // Action
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();
            mockContentRepository.checkstmp = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockContentRepository.addstmp = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();
            const addSiteMapUseCase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });
            const addSiteMaps = await addSiteMapUseCase.addstmp(useCasePayload);
            //assert
            expect(addSiteMaps).toStrictEqual('sitemap added succesfully !');
            expect(mockContentRepository.checkstmp).toBeCalledWith(useCasePayload.urpage);
            expect(mockContentRepository.addstmp).toBeCalledWith(useCasePayload.urpage);
            expect(mockcacheService.delete).toBeCalledWith(`sitemap:sitemap`);
        });
    });
    describe('should success edit data sitemap', () => {
        it('should edit sitemap successfully', async () => {
            const useCasePayload = new AddSitemap({
                urpage: 'home',
            });
            const params = {
                urpage: 'home',
            };
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();
            mockContentRepository.checkstmp = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockContentRepository.editstmp = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();
            const editSiteMapUseCase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });
            const editSiteMaps = await editSiteMapUseCase.editstmpusecase(useCasePayload, params);
            expect(editSiteMaps).toStrictEqual('Sitemap Edit Success !');
            expect(mockContentRepository.checkstmp).toBeCalledWith(useCasePayload.urpage);
            expect(mockContentRepository.editstmp).toBeCalledWith(useCasePayload.urpage, params.urpage);
            expect(mockcacheService.delete).toBeCalledWith(`sitemap:sitemap`);
        });
    });
    describe('should get data sitemap succcessfulldy using redis and database', () => {
        it('should get data sitemap succcessfulldy using redis', async () => {
            // Arrange
            const resultMockSitemap = {
                urpage: 'home',
                updated_at: '2024-02-24',
                headers: {
                    'X-Data-Source': 'cache',
                }
            };
            // Action
            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultMockSitemap));
            const getdataContent = new ContentUseCase({
                cacheServices: mockcacheService
            });
            const payload = await getdataContent.getstmp();
            // Assert
            expect(mockcacheService.get).toBeCalledWith(`sitemap:sitemap`);
            expect(payload).toEqual(
                resultMockSitemap
            );
        });
        it('should get data sitemap succcessfulldy using database', async () => {
            // Arrange
            const resultMockSitemap = {
                urpage: 'home',
                updated_at: '2024-02-24'
            };
            // Action
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();
            mockContentRepository.getstmp = jest.fn()
                .mockImplementation(() => Promise.resolve(resultMockSitemap));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();
            const getdataContent = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });
            const payload = await getdataContent.getstmp();
            // Assert
            expect(mockContentRepository.getstmp).toBeCalledWith();
            expect(mockcacheService.delete).toBeCalledWith(`sitemap:sitemap`);
            expect(mockcacheService.set).toBeCalledWith(`sitemap:sitemap`, JSON.stringify(resultMockSitemap));
            expect(payload).toEqual(resultMockSitemap);
        });
    });
    describe('sitemap should be deleted', () => {
        it('should delete sitemap successfully', async () => {
            const useCasePayload = new AddSitemap({
                urpage: 'home',
            });
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();

            mockContentRepository.delstmp = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();

            const deleteSiteMapUseCase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });
            const deleteSiteMaps = await deleteSiteMapUseCase.delstmp(useCasePayload);
            expect(deleteSiteMaps).toStrictEqual('Sitemap deleted successfully !');

            expect(mockContentRepository.delstmp).toBeCalledWith(useCasePayload.urpage);
            expect(mockcacheService.delete).toBeCalledWith(`sitemap:sitemap`);
        });
    });

});

