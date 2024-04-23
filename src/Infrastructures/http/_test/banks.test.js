const pool = require('../../database/postgres/pool');
const AddBnksTableTestHelper = require('../../../../tests/AddBnksTableTestHelper');
const AddGroupTableTestHelper = require('../../../../tests/AddGroupTableTestHelper');
const AddMasterTableTestHelper = require('../../../../tests/AddMasterTableTestHelper');
const AddBanksTableTestHelper = require('../../../../tests/AddBanksTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/addBankEndpoints', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await AddBnksTableTestHelper.cleanTable();
        await AddGroupTableTestHelper.cleanTable();
        await AddMasterTableTestHelper.cleanTable();
        await AddBanksTableTestHelper.cleanTable();
    });

    describe('When add and get group bank /banks/group', () => {
        it('should repsonse 201 and persisted group bank data', async () => {
            const requestPayload = {
                namegroupxyzt: 'groupbank88',
                grouptype: 1,
                min_dp: 10,
                max_dp: 2500,
                min_wd: 30,
                max_wd: 50000,
            };

            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/banks/group',
                payload: requestPayload,
            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');

        });


        it('should repsonse 200 and get group bank data', async () => {


            const server = await createServer(container);

            await AddGroupTableTestHelper.addgroup({ idgroup: 3, groupbank: 'groupbank3' });
            await AddGroupTableTestHelper.addgroup({ idgroup: 4, groupbank: 'groupbank4' });
            // Action
            const response = await server.inject({
                method: 'GET',
                url: '/banks/group',
            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');

        });

        it('should repsonse 200 and delete group bank data', async () => {

            const groupid = '18';

            const server = await createServer(container);

            await AddGroupTableTestHelper.addgroup({ idgroup: 18, groupbank: 'groupbank8' });
            await AddGroupTableTestHelper.addgroup({ idgroup: 19, groupbank: 'groupbank9' });
            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/banks/group/${groupid}`,

            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');

        });

        it('should repsonse 404 when delete group bank data', async () => {

            const groupid = '20';

            const server = await createServer(container);
            // Action
            const response = await server.inject({
                method: 'DELETE',
                url: `/banks/group/${groupid}`,

            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');

        });

    });

    describe('Master Bank feature', () => {
        describe('Master Bank POST', () => {

            it('should repsonse 201 and persisted master bank data', async () => {
                const requestPayload = {
                    bnkmstrxyxyx: 'dana',
                    groupbank: 'groupbank1',
                    urllogoxxyx: 'https://www.coskoc.com/api/',
                    statusxyxyy: 1,
                    wdstatusxyxyy: 1
                };

                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'POST',
                    url: '/banks/master',
                    payload: requestPayload,
                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(201);
                expect(responseJson.status).toEqual('success');

            });

            it('should repsonse 400 when master already exist group bank data', async () => {

                const requestPayload = {
                    bnkmstrxyxyx: 'ovo',
                    groupbank: 'groupbank1',
                    urllogoxxyx: 'https://www.coskoc.com/api/',
                    statusxyxyy: 1,
                    wdstatusxyxyy: 1,
                };
                await AddMasterTableTestHelper.addmaster({ bnkmstrxyxyx: 'ovo', });

                const server = await createServer(container);
                // Action
                const response = await server.inject({
                    method: 'POST',
                    url: '/banks/master',
                    payload: requestPayload,
                });

                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
            });

        });
        describe('Master Bank PUT', () => {
            it('should repsonse 200 when edit and persisted master bank data', async () => {
                const mstrbnks = 'ovo';

                const requestPayload = {
                    bnkmstrxyxyx: 'ovo2',
                    groupbank: 'groupbank1',
                    urllogoxxyx: 'https://www.coskoc.com/api/',
                    statusxyxyy: 2,
                    wdstatusxyxyy: 1,
                };
                await AddMasterTableTestHelper.addmaster({ bnkmstrxyxyx: 'ovo', });

                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'PUT',
                    url: `/banks/master/${mstrbnks}`,
                    payload: requestPayload,
                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });
        });
        describe('Master Bank GET', () => {

            it('should repsonse 200 and get master bank data', async () => {


                const server = await createServer(container);

                await AddMasterTableTestHelper.addmaster({ idbnkmaster: 7, bnkmstrxyxyx: 'bca4' });
                await AddMasterTableTestHelper.addmaster({ idbnkmaster: 8, bnkmstrxyxyx: 'bca5' });
                // Action
                const response = await server.inject({
                    method: 'GET',
                    url: '/banks/master',
                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });


            describe('Master Bank DELETE', () => {
                it('should repsonse 200 and delete group bank data', async () => {

                    const idbnkmaster = '99';

                    const server = await createServer(container);

                    await AddMasterTableTestHelper.addmaster({ idbnkmaster: 99, bnkmstrxyxyx: 'bca' });
                    // Action
                    const response = await server.inject({
                        method: 'DELETE',
                        url: `/banks/master/${idbnkmaster}`,

                    });
                    // Assert
                    const responseJson = JSON.parse(response.payload);
                    expect(response.statusCode).toEqual(200);
                    expect(responseJson.status).toEqual('success');

                });

                it('should repsonse 404 when delete group bank data', async () => {

                    const idbnkmaster = '98';

                    const server = await createServer(container);
                    // Action
                    const response = await server.inject({
                        method: 'DELETE',
                        url: `/banks/master/${idbnkmaster}`,

                    });
                    // Assert
                    const responseJson = JSON.parse(response.payload);
                    expect(response.statusCode).toEqual(404);
                    expect(responseJson.status).toEqual('fail');

                });

            });
        });
    });

    describe(' Data Bank ', () => {
        describe('WHEN POST /banks', () => {

            it('should response 201 and persisted banks data', async () => {
                // Arrange
                const requestPayload = {
                    namegroupxyzt: ['groupbank1'],
                    masterbnkxyxt: 'mandiri',
                    namebankxxyy: 'mamdiri2',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensiaa sitanggang',
                    norekxyxy: '0355917844',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Scr44.png',
                };

                // eslint-disable-next-line no-undef
                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'POST',
                    url: '/banks/v2',
                    payload: requestPayload,
                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(201);
                expect(responseJson.status).toEqual('success');

            });
        });

        describe('Bank PUT', () => {
            it('should repsonse 200 when edit and persisted  bank data', async () => {
                const idbank = '4';

                const requestPayload = {
                    namegroupxyzt: ['groupbank1'],
                    masterbnkxyxt: 'bca',
                    namebankxxyy: 'bca4',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917811',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                };
                await AddBanksTableTestHelper.addbks({ idbank: '4' });

                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'PUT',
                    url: `/banks/v2/${idbank}`,
                    payload: requestPayload,
                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });
        });

    });


    describe('WHEN GET /banks/{groupname}', () => {

        it('should response 201 and persisted bank', async () => {

            const server = await createServer(container);
            const groupname = 'groupbank8';

            await AddBanksTableTestHelper.addbks({ idbank: 4, namegroupxyzt: ['groupbank8'], norekxyxy: '0355917810', masterbnkxyxt: 'mandiri', namebankxxyy: 'mandiri1' });
            await AddMasterTableTestHelper.addmaster({ idbnkmaster: 99, bnkmstrxyxyx: 'mandiri' });
            await AddGroupTableTestHelper.addgroup({ idgroup: 18, groupbank: 'groupbank8' });

            const response = await server.inject({
                method: 'GET',
                url: `/banks/v2/${groupname}`,

            })

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data).toBeDefined();
        });

        it('should  throw an error 404 when payload is not found', async () => {
            const server = await createServer(container);
            const groupname = 'groupbank555';

            // Action
            const response = await server.inject({
                method: 'GET',
                url: `/banks/v2/${groupname}`,

            })
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('data not found !');
        });


    });


    describe('WHEN GET /banks/exc/{groupname}', () => {

        it('should response 200 and persisted bank exc ', async () => {

            const server = await createServer(container);
            const groupname = 'groupbank2';

            await AddBanksTableTestHelper.addbks({ idbank: 7, namegroupxyzt: ['groupbank7'], norekxyxy: '0355917810', masterbnkxyxt: 'mandiri', namebankxxyy: 'mandiri2' });
            await AddBanksTableTestHelper.addbks({ idbank: 9, namegroupxyzt: ['groupbank7', 'groupbank2'], norekxyxy: '0355917810', masterbnkxyxt: 'mandiri', namebankxxyy: 'mandiri1' });
            await AddMasterTableTestHelper.addmaster({ idbnkmaster: 99, bnkmstrxyxyx: 'mandiri' });
            await AddGroupTableTestHelper.addgroup({ idgroup: 18, groupbank: 'groupbank7' }, { idgroup: 19, groupbank: 'groupbank2' });

            const response = await server.inject({
                method: 'GET',
                url: `/banks/exc/${groupname}`,

            })

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data).toBeDefined();
        });

        it('should  throw an error 404 when payload is not found', async () => {
            const server = await createServer(container);
            const groupname = 'groupbank555';

            // Action
            const response = await server.inject({
                method: 'GET',
                url: `/banks/exc/${groupname}`,

            })
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('data not found !');
        });


    });

























    // describe('WHEN POST /banks', () => {

    //     it('should response 201 and persisted banks data', async () => {
    //         // Arrange
    //         const requestPayload = {
    //             namegroupxyzt: 'groupbank1',
    //             namebankxxyy: 'bca',
    //             statusxxyy: 1,
    //             yyxxmethod: 'bank',
    //             xynamarekx: 'florensia sitanggang',
    //             norekxyxy: '0355917811',
    //             barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
    //             zwzwshowbarcode: 1,
    //         };

    //         // eslint-disable-next-line no-undef
    //         const server = await createServer(container);

    //         // Action
    //         const response = await server.inject({
    //             method: 'POST',
    //             url: '/banks',
    //             payload: requestPayload,
    //         });
    //         // Assert
    //         const responseJson = JSON.parse(response.payload);
    //         expect(response.statusCode).toEqual(201);
    //         expect(responseJson.status).toEqual('success');

    //     });
    // });

    // describe('WHEN POST /banks/{groupname}', () => {

    //     it('should response 201 and persisted bank', async () => {

    //         const server = await createServer(container);
    //         const groupname = 'groupbank1';

    //         await AddBnksTableTestHelper.addbks({ idbank: 4, namegroupxyzt: 'groupbank1', norekxyxy: '0355917810' });
    //         await AddBnksTableTestHelper.addbks({ idbank: 5, namegroupxyzt: 'groupbank1', norekxyxy: '0355917811' });


    //         const response = await server.inject({
    //             method: 'GET',
    //             url: `/banks/${groupname}`,

    //         })

    //         // Assert
    //         const responseJson = JSON.parse(response.payload);
    //         expect(response.statusCode).toEqual(200);
    //         expect(responseJson.status).toEqual('success');
    //         expect(responseJson.data).toBeDefined();
    //     });

    //     it('should  throw an error 404 when payload is not found', async () => {
    //         const server = await createServer(container);
    //         const groupname = 'groupbank555';

    //         // Action
    //         const response = await server.inject({
    //             method: 'GET',
    //             url: `/banks/${groupname}`,

    //         })
    //         // Assert
    //         const responseJson = JSON.parse(response.payload);
    //         expect(response.statusCode).toEqual(404);
    //         expect(responseJson.status).toEqual('fail');
    //         expect(responseJson.message).toEqual('data not found !');
    //     });


    // });
});