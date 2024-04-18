// const AddBnksDp = require('../../../Domains/banks/entities/AddBnksDp');
const AddGroupBnks = require('../../../Domains/banks/entities/AddGroupBnks');
const AddBnks = require('../../../Domains/banks/entities/AddBnks');
const AddMasterBnks = require('../../../Domains/banks/entities/AddMasterBnks');
const BnksRepository = require('../../../Domains/banks/BnksRepository');
const AddbnksUseCase = require('../AddbnksUseCase');
const CacheService = require('../../caching/CacheService');

describe('GROUPBANK', () => {

    describe('AddGroup bnks api for add master data', () => {
        it('should orchestrating add group correctly', async () => {
            const useCasePayload = new AddGroupBnks({
                namegroupxyzt: 'groupbank2',
                grouptype: true
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
            expect(mockbnksRepository.addgrp).toBeCalledWith(useCasePayload);

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
});

describe('MASTER BANK', () => {

    describe('Add Master bnks for add master data', () => {
        it('should orchestrating add master correctly', async () => {
            const useCasePayload = new AddMasterBnks({
                bnkmstrxyxyx: 'bca',
                groupbank: 'groupbank1',
                urllogoxxyx: 'https://www.coskoc.com/api/',
                statusxyxyy: 1,
            });

            const resultmockmaster = {
                bankmaster: 'bca'
            };

            const mockbnksRepository = new BnksRepository();

            mockbnksRepository.chckmstr = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockbnksRepository.addmstr = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmockmaster));


            const addgroupusecase = new AddbnksUseCase({
                bnksRepository: mockbnksRepository,
            });

            const datagroupusecase = await addgroupusecase.admasterbank(useCasePayload);

            expect(datagroupusecase).toStrictEqual(resultmockmaster);
            expect(mockbnksRepository.chckmstr).toBeCalledWith(useCasePayload.bnkmstrxyxyx);
            expect(mockbnksRepository.addmstr).toBeCalledWith(useCasePayload);

        });

        it('should edit data master data correctly', async () => {

            const params = {
                mstrbnks: "bca",
            }
            const useCasePayload = new AddMasterBnks({
                bnkmstrxyxyx: 'bca',
                groupbank: 'groupbank1',
                urllogoxxyx: 'https://www.coskoc.com/api/',
                statusxyxyy: 1,
            });

            const resultmockmaster = "Master Bank Edit Success !!";

            const mockbnksRepository = new BnksRepository();


            mockbnksRepository.putmstrbnk = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmockmaster));


            const addgroupusecase = new AddbnksUseCase({
                bnksRepository: mockbnksRepository,
            });

            const datagroupusecase = await addgroupusecase.putmasterbank(useCasePayload, params);

            expect(datagroupusecase).toStrictEqual(resultmockmaster);
            expect(mockbnksRepository.putmstrbnk).toBeCalledWith(useCasePayload, params.mstrbnks);

        });
    });

    describe('GetdataMaster that already create', () => {
        it('should get data master bank', async () => {


            const resultmockmaster = [{ "idbnkmaster": 5, bnkmstrxyxyx: "bca2" }, { "idbnkmaster": 6, bnkmstrxyxyx: "bca3" }];


            const mockBnksRepository = new BnksRepository();

            mockBnksRepository.getmstrbnk = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmockmaster));


            const getGroupDataUsecase = new AddbnksUseCase({
                bnksRepository: mockBnksRepository,
            });

            const payload = await getGroupDataUsecase.getdtmstr();

            expect(mockBnksRepository.getmstrbnk)
                .toBeCalledWith();
            expect(payload).toEqual(resultmockmaster);
        });
    });

    describe("delete  master bank for master data", () => {
        it("should delete data master succesfully", async () => {

            params = {
                idbnkmaster: 12
            }

            resultdelete = "success delete master bank";

            const mockBnksRepository = new BnksRepository();

            mockBnksRepository.findmstr = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockBnksRepository.delmstrbnk = jest.fn()
                .mockImplementation(() => Promise.resolve(resultdelete));


            const delGroupDataUsecase = new AddbnksUseCase({
                bnksRepository: mockBnksRepository,
            });

            const datasuccess = await delGroupDataUsecase.delmasterdata(params);

            expect(mockBnksRepository.findmstr)
                .toBeCalledWith(params.idbnkmaster);
            expect(mockBnksRepository.delmstrbnk)
                .toBeCalledWith(params.idbnkmaster);
            expect(datasuccess).toEqual(resultdelete);

        });
    });
});


describe('DATA BANK', () => {
    describe('add data BANK', () => {
        it('should orchestrating add data apk get correctly', async () => {
            //arrange
            const useCasePayload = new AddBnks({
                namegroupxyzt: 'groupbank1',
                masterbnkxyxt: 'bca',
                namebankxxyy: 'bca1',
                yyxxmethod: 'bank',
                xynamarekx: 'florensia sitanggang',
                norekxyxy: '0355917811',
                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
            });

            resultmockdoneadd = {
                masterbnkxyxt: 'bca',
                namegroupxyzt: 'groupbank1',
                namebankxxyy: 'bca1',
                norekxyxy: '0355917811',
                xynamarekx: 'florensia sitanggang',
            };

            /** creating dependency of use case */
            const mockcacheService = new CacheService();
            const mockbnksRepository = new BnksRepository();

            /** mocking needed function */

            mockbnksRepository.chckbnks = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockbnksRepository.addbnks = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmockdoneadd));
            mockcacheService.delete = jest.fn().mockResolvedValue();


            const addbnksUseCase = new AddbnksUseCase({
                bnksRepository: mockbnksRepository,
                cacheServices: mockcacheService

            });

            const databnksusecase = await addbnksUseCase.addbnkdt(useCasePayload);

            expect(databnksusecase).toStrictEqual(resultmockdoneadd);
            expect(mockbnksRepository.chckbnks).toBeCalledWith(useCasePayload);
            expect(mockbnksRepository.addbnks).toBeCalledWith(useCasePayload);
            expect(mockcacheService.delete).toBeCalledWith(`namegroup:${resultmockdoneadd.namegroupxyzt}`);
        });
    });
    describe('edit data BANK', () => {


        it('should edit data master data correctly', async () => {

            const params = {
                idbank: 2,
            }
            const useCasePayload = new AddBnks({
                namegroupxyzt: 'groupbank1',
                masterbnkxyxt: 'bca',
                namebankxxyy: 'bca1',
                yyxxmethod: 'bank',
                xynamarekx: 'florensia sitanggang',
                norekxyxy: '0355917811',
                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
            });

            const resultmockresult = "Bank Edit Success !";

            const resultmockbank = { namegroupxyzt: 'groupbank1' };

            const mockbnksRepository = new BnksRepository();
            const mockcacheService = new CacheService();


            mockbnksRepository.putbnks = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmockbank));
            mockcacheService.delete = jest.fn().mockResolvedValue();


            const putBankusecase = new AddbnksUseCase({
                bnksRepository: mockbnksRepository,
                cacheServices: mockcacheService
            });

            const resultbankusecase = await putBankusecase.edtbank(useCasePayload, params);

            expect(resultbankusecase).toStrictEqual(resultmockresult);
            expect(mockbnksRepository.putbnks).toBeCalledWith(useCasePayload, params.idbank);

        });
    });
    describe('BANK DATA RESERVER API POST GET DATA', () => {
        it('should get data apk caching successfully', async () => {
            const params = {
                groupname: 'groupbank1',
            };

            const resultmockgroup = {
                groupbank1: {
                    bca: {
                        url_logo: "URL_logo_bank",
                        statusxxyy: 1,
                        data_bank: [
                            {
                                idbank: 3,
                                namebankxxyy: 'bca1',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917811',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            },
                            {
                                idbank: 4,

                                namebankxxyy: 'bca2',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917811',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            }
                        ]
                    },
                    mandiri: {
                        url_logo: "URL_logo_bank_mandiri",
                        statusxxyy: 2,
                        data_bank: [
                            {
                                idbank: 1,
                                namebankxxyy: 'mandiri1',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917333',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            },
                            {
                                idbank: 2,
                                namebankxxyy: 'mandiri2',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917222',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            }
                        ]
                    }
                },
                headers: {
                    'X-Data-Source': 'cache',
                }
            };

            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmockgroup));

            const getDataBankUseCase = new AddbnksUseCase({
                cacheServices: mockcacheService
            });
            const getdatausecase = await getDataBankUseCase.getbankdt(params);
            console.log(getdatausecase);
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
                groupbank1: {
                    bca: {
                        url_logo: "URL_logo_bank",
                        statusxxyy: 1,
                        data_bank: [
                            {
                                idbank: 3,
                                namebankxxyy: 'bca1',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917811',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            },
                            {
                                idbank: 4,

                                namebankxxyy: 'bca2',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917811',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            }
                        ]
                    },
                    mandiri: {
                        url_logo: "URL_logo_bank_mandiri",
                        statusxxyy: 2,
                        data_bank: [
                            {
                                idbank: 1,
                                namebankxxyy: 'mandiri1',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917333',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            },
                            {
                                idbank: 2,
                                namebankxxyy: 'mandiri2',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917222',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            }
                        ]
                    }
                }

            };


            const resultbank = [
                {
                    idbank: 1,
                    namegroupxyzt: 'groupbank1',
                    masterbnkxyxt: 'mandiri',
                    namebankxxyy: 'mandiri1',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917333',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: true,

                },
                {
                    idbank: 2,
                    namegroupxyzt: 'groupbank1',
                    masterbnkxyxt: 'mandiri',
                    namebankxxyy: 'mandiri2',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917222',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: true,

                },
                {
                    idbank: 3,
                    namegroupxyzt: 'groupbank1',
                    masterbnkxyxt: 'bca',
                    namebankxxyy: 'bca1',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917811',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: true,

                },
                {
                    idbank: 4,
                    namegroupxyzt: 'groupbank1',
                    masterbnkxyxt: 'bca',
                    namebankxxyy: 'bca2',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917811',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: true,

                }
            ]

            const resultgroup = [{
                idgroup: 1,
                groupbank: "groupbank1",
                grouptype: true
            }
            ]

            const resultmaster = [
                {
                    idbnkmaster: 1,
                    bnkmstrxyxyx: "bca",
                    urllogoxxyx: "URL_logo_bank",
                    statusxyxyy: 1
                },
                {
                    idbnkmaster: 2,
                    bnkmstrxyxyx: "mandiri",
                    urllogoxxyx: "URL_logo_bank_mandiri",
                    statusxyxyy: 2
                },
            ]


            const mockcacheService = new CacheService();
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();

            const bnksRepository = {
                getbnks: jest.fn().mockResolvedValue(resultbank),
                getgroupbnks: jest.fn().mockResolvedValue(resultgroup),
                getmasterbnks: jest.fn().mockResolvedValue(resultmaster),
            };

            const getDataBankUseCase = new AddbnksUseCase({
                bnksRepository,
                cacheServices: mockcacheService
            });

            const getdatausecase = await getDataBankUseCase.getbankdt(params);

            expect(bnksRepository.getbnks).toBeCalledWith(params.groupname);
            expect(bnksRepository.getgroupbnks).toBeCalledWith(params.groupname);
            expect(bnksRepository.getmasterbnks).toBeCalledWith(params.groupname);
            expect(mockcacheService.delete).toBeCalledWith(`namegroup:${params.groupname}`);
            expect(mockcacheService.set).toBeCalledWith(`namegroup:${params.groupname}`, JSON.stringify(getdatausecase));
            expect(getdatausecase).toEqual(resultmockgroup);
        });
    });
});

















// describe('APK DATA RESERVER API POST GET DATA', () => {
//     /**
//      * membuat usecase untuk data apk
//      */
//     it('should orchestrating add data apk get correctly', async () => {
//         //arrange
//         const useCasePayload = {
//             namegroupxyzt: 'groupbank1',
//             namebankxxyy: 'bca',
//             statusxxyy: 1,
//             yyxxmethod: 'bank',
//             xynamarekx: 'florensia sitanggang',
//             norekxyxy: '0355917811',
//             barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
//             zwzwshowbarcode: 1,
//         };

//         const namegroup = 'groupbank1';
//         const mockbnksDataSettings = new AddBnksDp({
//             namegroupxyzt: useCasePayload.namegroupxyzt,
//             namebankxxyy: useCasePayload.namebankxxyy,
//             statusxxyy: useCasePayload.statusxxyy,
//             yyxxmethod: useCasePayload.yyxxmethod,
//             xynamarekx: useCasePayload.xynamarekx,
//             norekxyxy: useCasePayload.norekxyxy,
//             barcodexrxr: useCasePayload.barcodexrxr,
//             zwzwshowbarcode: useCasePayload.zwzwshowbarcode,
//         });

//         /** creating dependency of use case */
//         const mockcacheService = new CacheService();
//         const mockbnksRepository = new BnksRepository();

//         /** mocking needed function */

//         mockbnksRepository.checkbnks = jest.fn()
//             .mockImplementation(() => Promise.resolve('completed'));
//         mockbnksRepository.databnksdp = jest.fn()
//             .mockImplementation(() => Promise.resolve(namegroup));
//         mockcacheService.delete = jest.fn().mockResolvedValue();


//         const addbnksUseCase = new AddbnksUseCase({
//             bnksRepository: mockbnksRepository,
//             cacheServices: mockcacheService

//         });

//         const databnksusecase = await addbnksUseCase.execute(useCasePayload);

//         expect(databnksusecase).toStrictEqual('groupbank1');
//         expect(mockbnksRepository.checkbnks).toBeCalledWith(useCasePayload.norekxyxy, useCasePayload.namegroupxyzt, useCasePayload.xynamarekx);
//         expect(mockbnksRepository.databnksdp).toBeCalledWith(mockbnksDataSettings);
//         expect(mockcacheService.delete).toBeCalledWith(`namegroup:${namegroup}`);
//     });


// });

// describe('BANK DATA RESERVER API POST GET DATA', () => {
//     it('should get data apk caching successfully', async () => {
//         const params = {
//             groupname: 'groupbank1'
//         };

//         const resultmockgroup = {
//             masterdata: [
//                 {
//                     namegroupxyzt: 'groupbank1',
//                     namebankxxyy: 'bca',
//                     statusxxyy: 1,
//                     yyxxmethod: 'bank',
//                     xynamarekx: 'florensia sitanggang',
//                     norekxyxy: '0355917811',
//                     barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
//                     zwzwshowbarcode: 1
//                 },
//                 {
//                     namegroupxyzt: 'groupbank1',
//                     namebankxxyy: 'bca',
//                     statusxxyy: 1,
//                     yyxxmethod: 'bank',
//                     xynamarekx: 'florensia sitanggang',
//                     norekxyxy: '0355917812',
//                     barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
//                     zwzwshowbarcode: 1
//                 }
//             ],
//             headers: {
//                 'X-Data-Source': 'cache',
//             }
//         };

//         const mockcacheService = new CacheService();
//         mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmockgroup));

//         const addbnksUseCase = new AddbnksUseCase({
//             cacheServices: mockcacheService
//         });
//         const getdatausecase = await addbnksUseCase.getbanks(params);

//         expect(mockcacheService.get).toBeCalledWith(`namegroup:${params.groupname}`); +
//             expect(getdatausecase).toEqual(
//                 resultmockgroup

//             );
//     });

//     it('should get data bank successfully', async () => {
//         const params = {
//             groupname: 'groupbank1'
//         };

//         const resultmockgroup = {
//             masterdata: [
//                 {
//                     namegroupxyzt: 'groupbank1',
//                     namebankxxyy: 'bca',
//                     statusxxyy: 1,
//                     yyxxmethod: 'bank',
//                     xynamarekx: 'florensia sitanggang',
//                     norekxyxy: '0355917811',
//                     barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
//                     zwzwshowbarcode: 1
//                 },
//                 {
//                     namegroupxyzt: 'groupbank1',
//                     namebankxxyy: 'bca',
//                     statusxxyy: 1,
//                     yyxxmethod: 'bank',
//                     xynamarekx: 'florensia sitanggang',
//                     norekxyxy: '0355917812',
//                     barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
//                     zwzwshowbarcode: 1
//                 }
//             ]
//         };


//         const resultdata = [
//             {
//                 namegroupxyzt: 'groupbank1',
//                 namebankxxyy: 'bca',
//                 statusxxyy: 1,
//                 yyxxmethod: 'bank',
//                 xynamarekx: 'florensia sitanggang',
//                 norekxyxy: '0355917811',
//                 barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
//                 zwzwshowbarcode: 1,
//             },
//             {
//                 namegroupxyzt: 'groupbank1',
//                 namebankxxyy: 'bca',
//                 statusxxyy: 1,
//                 yyxxmethod: 'bank',
//                 xynamarekx: 'florensia sitanggang',
//                 norekxyxy: '0355917812',
//                 barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
//                 zwzwshowbarcode: 1,
//             }
//         ]


//         const mockcacheService = new CacheService();
//         mockcacheService.delete = jest.fn().mockResolvedValue();
//         mockcacheService.set = jest.fn().mockResolvedValue();

//         const bnksRepository = {
//             getdatabnksdp: jest.fn().mockResolvedValue(resultdata),
//         };

//         const getDataApkUseCase = new AddbnksUseCase({
//             bnksRepository,
//             cacheServices: mockcacheService
//         });

//         const getdatausecase = await getDataApkUseCase.getbanks(params);

//         expect(bnksRepository.getdatabnksdp).toBeCalledWith(params.groupname);
//         expect(mockcacheService.delete).toBeCalledWith(`namegroup:${params.groupname}`);
//         expect(mockcacheService.set).toBeCalledWith(`namegroup:${params.groupname}`, JSON.stringify(getdatausecase));

//         expect(getdatausecase).toEqual(resultmockgroup);
//     });
// });