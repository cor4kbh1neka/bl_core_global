const pool = require('../../database/postgres/pool');
const AddApkEventTableTestHelper = require('../../../../tests/AddApkEventTableTestHelper');
const AddApkPemberitahuanTableTestHelper = require('../../../../tests/AddApkPemberitahuanTableTestHelper');
const AddDataApkTableTestHelper = require('../../../../tests/AddDataApkTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/adduserendpoints', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await AddApkEventTableTestHelper.cleanTable();
        await AddApkPemberitahuanTableTestHelper.cleanTable();
        await AddDataApkTableTestHelper.cleanTable();
    });

    describe('WHEN POST /users', () => {

        // it('should  throw an error 400 when payload is not valid', async () => {
        //     const requestPayload = {
        //         xyusernamexxy: 'fake user',
        //         password: 'secret',
        //         xybanknamexyy: 'abc',
        //         xybankuserxy: 'fake name',
        //         xxybanknumberxy: '12345678',
        //         xyx11xuser_mailxxyy: 'user@gmail.com',
        //         xynumbphonexyyy: '58469874451',
        //     };
        //     const server = await createServer(container);

        //     // Action
        //     const response = await server.inject({
        //         method: 'POST',
        //         url: '/users',
        //         payload: requestPayload,
        //     });
        //     // Assert
        //     const responseJson = JSON.parse(response.payload);
        //     expect(response.statusCode).toEqual(400);
        //     expect(responseJson.status).toEqual('fail');
        //     expect(responseJson.message).toEqual('register fail , input restricted !');
        // });

        it('should response 201 and persisted user data', async () => {
            // Arrange
            const requestPayload = {
                version: '1.0.1',
                home: 'http://home.home',
                deposit: 'http://deposit.home',
                server1: 'http://server1.home',
                server2: 'http://server2.home',
                server3: 'http://server3.home',
                update: 'http://update.home',
                peraturan: 'http://peraturan.home',
                klasemen: 'http://klasemen.home',
                promosi: 'http://promosi.home',
                livescore: 'http://livescore.home',
                livechat: 'http://livechat.home',
                whatsapp1: 'http://whatsapp1.home',
                whatsapp2: 'http://whatsapp2.home',
                facebook: 'http://facebook.home',
                telegram: 'http://telegram.home',
                instagram: 'http://instagram.home',
                prediksi: 'http://prediksi.home',

            };

            // eslint-disable-next-line no-undef
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/apks/settings',
                payload: requestPayload,
            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');

        });

        it('should response 201 and persisted event data', async () => {
            // Arrange
            const requestPayload = {

                apkid: 'apk123',
                icongif: 'http://icongif.home',
                posisi: '1',
                switchs: true,
                bannerurl: 'http://update.home',
                linkevent: 'http://peraturan.home',

            };

            // eslint-disable-next-line no-undef
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/apks/settings/event',
                payload: requestPayload,
            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');

        });


        it('should response 201 and persisted notice data', async () => {
            // Arrange
            const requestPayload = {
                apkid: 'apk123',
                title: 'fake title',
                content: 'ini ada content pemberitahuanontent',
            };

            // eslint-disable-next-line no-undef
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/apks/settings/notice',
                payload: requestPayload,
            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');

        });

    });
    describe('WHEN get /apks/settings/{apkid}', () => {
        it('should response 201 and persisted comment', async () => {

            const server = await createServer(container);
            const apkid = 'apk12345';

            await AddDataApkTableTestHelper.addapk({ apkid: 'apk12345', created_at: '2024-02-24T15:25:51.326Z' });
            await AddApkEventTableTestHelper.addevent({ apkid: 'apk12345', created_at: '2024-02-24T15:25:51.326Z' });
            await AddApkPemberitahuanTableTestHelper.addnotice({ apkid: 'apk12345', created_at: '2024-02-24T15:25:51.326Z' });

            const response = await server.inject({
                method: 'GET',
                url: `/apks/settings/${apkid}`,

            })

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data).toBeDefined();
        });

    });


});