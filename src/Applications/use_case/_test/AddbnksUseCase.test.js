const AddBnksDp = require('../../../Domains/banks/entities/AddBnksDp');
const AddGroupBnks = require('../../../Domains/banks/entities/AddGroupBnks');
const BnksRepository = require('../../../Domains/banks/BnksRepository');
const AddbnksUseCase = require('../AddbnksUseCase');
const CacheService = require('../../caching/CacheService');


describe('AddGroup bnks api for add master data', () => {
    it('should orchestrating add group correctly', async () => {
        const useCasePayload = new AddGroupBnks({
            namegroupxyzt: 'groupbank2',
        });
        const namegroup = 'groupbank2';

        const mockbnksRepository = new BnksRepository();

        mockbnksRepository.addgrp = jest.fn()
            .mockImplementation(() => Promise.resolve(namegroup));


        const addgroupusecase = new AddbnksUseCase({
            bnksRepository: mockbnksRepository,

        });

        const datagroupusecase = await addgroupusecase.addgrp(useCasePayload);
        expect(datagroupusecase).toStrictEqual(namegroup);
        expect(mockbnksRepository.addgrp).toBeCalledWith(useCasePayload.namegroupxyzt);

    });
});

describe('GetDataGroup that already create', () => {
    it('should get data group bank', async () => {


        const resultmockgroup = [{ "idgroup": 3, groupbank: "groupbank3" }, { "idgroup": 4, groupbank: "groupbank4" }];


        const mockBnksRepository = new BnksRepository();

        mockBnksRepository.getdtGroup = jest.fn()
            .mockImplementation(() => Promise.resolve(resultmockgroup));


        const getGroupDataUsecase = new AddbnksUseCase({
            bnksRepository: mockBnksRepository,
        });

        const payload = await getGroupDataUsecase.getgroup();

        expect(mockBnksRepository.getdtGroup)
            .toBeCalledWith();
        expect(payload).toEqual(resultmockgroup);
    });
});

describe("delete  group bank for master data", () => {
    it("should delete data group succesfully", async () => {

        params = {
            idgroup: 12
        }

        resultdelete = "success delete group";

        const mockBnksRepository = new BnksRepository();

        mockBnksRepository.findgroup = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockBnksRepository.delgroup = jest.fn()
            .mockImplementation(() => Promise.resolve(resultdelete));


        const delGroupDataUsecase = new AddbnksUseCase({
            bnksRepository: mockBnksRepository,
        });

        const datasuccess = await delGroupDataUsecase.delgroupdata(params);

        expect(mockBnksRepository.findgroup)
            .toBeCalledWith(params.idgroup);
        expect(mockBnksRepository.delgroup)
            .toBeCalledWith(params.idgroup);
        expect(datasuccess).toEqual(resultdelete);

    });
});

describe('APK DATA RESERVER API POST GET DATA', () => {
    /**
     * membuat usecase untuk data apk 
     */
    it('should orchestrating add data apk get correctly', async () => {
        //arrange
        const useCasePayload = {
            namegroupxyzt: 'groupbank1',
            namebankxxyy: 'bca',
            statusxxyy: 1,
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
            zwzwshowbarcode: 1,
        };

        const namegroup = 'groupbank1';
        const mockbnksDataSettings = new AddBnksDp({
            namegroupxyzt: useCasePayload.namegroupxyzt,
            namebankxxyy: useCasePayload.namebankxxyy,
            statusxxyy: useCasePayload.statusxxyy,
            yyxxmethod: useCasePayload.yyxxmethod,
            xynamarekx: useCasePayload.xynamarekx,
            norekxyxy: useCasePayload.norekxyxy,
            barcodexrxr: useCasePayload.barcodexrxr,
            zwzwshowbarcode: useCasePayload.zwzwshowbarcode,
        });

        /** creating dependency of use case */
        const mockcacheService = new CacheService();
        const mockbnksRepository = new BnksRepository();

        /** mocking needed function */

        mockbnksRepository.checkbnks = jest.fn()
            .mockImplementation(() => Promise.resolve('completed'));
        mockbnksRepository.databnksdp = jest.fn()
            .mockImplementation(() => Promise.resolve(namegroup));
        mockcacheService.delete = jest.fn().mockResolvedValue();


        const addbnksUseCase = new AddbnksUseCase({
            bnksRepository: mockbnksRepository,
            cacheServices: mockcacheService

        });

        const databnksusecase = await addbnksUseCase.execute(useCasePayload);

        expect(databnksusecase).toStrictEqual('groupbank1');
        expect(mockbnksRepository.checkbnks).toBeCalledWith(useCasePayload.norekxyxy, useCasePayload.namegroupxyzt, useCasePayload.xynamarekx);
        expect(mockbnksRepository.databnksdp).toBeCalledWith(mockbnksDataSettings);
        expect(mockcacheService.delete).toBeCalledWith(`namegroup:${namegroup}`);
    });


});


describe('BANK DATA RESERVER API POST GET DATA', () => {
    it('should get data apk caching successfully', async () => {
        const params = {
            groupname: 'groupbank1'
        };

        const resultmockgroup = {
            masterdata: [
                {
                    namegroupxyzt: 'groupbank1',
                    namebankxxyy: 'bca',
                    statusxxyy: 1,
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917811',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: 1
                },
                {
                    namegroupxyzt: 'groupbank1',
                    namebankxxyy: 'bca',
                    statusxxyy: 1,
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917812',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: 1
                }
            ],
            headers: {
                'X-Data-Source': 'cache',
            }
        };

        const mockcacheService = new CacheService();
        mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmockgroup));

        const addbnksUseCase = new AddbnksUseCase({
            cacheServices: mockcacheService
        });
        const getdatausecase = await addbnksUseCase.getbanks(params);

        expect(mockcacheService.get).toBeCalledWith(`namegroup:${params.groupname}`); +
            expect(getdatausecase).toEqual(
                resultmockgroup

            );
    });

    it('should get data bank successfully', async () => {
        const params = {
            groupname: 'groupbank1'
        };

        const resultmockgroup = {
            masterdata: [
                {
                    namegroupxyzt: 'groupbank1',
                    namebankxxyy: 'bca',
                    statusxxyy: 1,
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917811',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: 1
                },
                {
                    namegroupxyzt: 'groupbank1',
                    namebankxxyy: 'bca',
                    statusxxyy: 1,
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917812',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: 1
                }
            ]
        };


        const resultdata = [
            {
                namegroupxyzt: 'groupbank1',
                namebankxxyy: 'bca',
                statusxxyy: 1,
                yyxxmethod: 'bank',
                xynamarekx: 'florensia sitanggang',
                norekxyxy: '0355917811',
                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                zwzwshowbarcode: 1,
            },
            {
                namegroupxyzt: 'groupbank1',
                namebankxxyy: 'bca',
                statusxxyy: 1,
                yyxxmethod: 'bank',
                xynamarekx: 'florensia sitanggang',
                norekxyxy: '0355917812',
                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                zwzwshowbarcode: 1,
            }
        ]


        const mockcacheService = new CacheService();
        mockcacheService.delete = jest.fn().mockResolvedValue();
        mockcacheService.set = jest.fn().mockResolvedValue();

        const bnksRepository = {
            getdatabnksdp: jest.fn().mockResolvedValue(resultdata),
        };

        const getDataApkUseCase = new AddbnksUseCase({
            bnksRepository,
            cacheServices: mockcacheService
        });

        const getdatausecase = await getDataApkUseCase.getbanks(params);

        expect(bnksRepository.getdatabnksdp).toBeCalledWith(params.groupname);
        expect(mockcacheService.delete).toBeCalledWith(`namegroup:${params.groupname}`);
        expect(mockcacheService.set).toBeCalledWith(`namegroup:${params.groupname}`, JSON.stringify(getdatausecase));

        expect(getdatausecase).toEqual(resultmockgroup);
    });
});