const pool = require('../../database/postgres/pool');
const AddMemoTableTestHelper = require('../../../../tests/AddMemoTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/addBankEndpoints', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await AddMemoTableTestHelper.cleanTable();
    });

    describe('When add and get MEMO', () => {
        describe('MEMO Add', () => {

            it('should repsonse 201 and persisted group bank data', async () => {
                const requestPayload = {
                    statustype: 1,
                    statuspriority: 1,
                    subject: 'ini contoh subject 50 character',
                    memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
                };

                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'POST',
                    url: '/memo',
                    payload: requestPayload,
                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(201);
                expect(responseJson.status).toEqual('success');

            });
        });
        describe('WHEN get /memo', () => {


            it('should  throw an error 404 when payload is not found', async () => {
                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'GET',
                    url: `/memo`,

                })
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(404);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('data not found !');
            });
            it('should response 201 and persisted memoget', async () => {

                const server = await createServer(container);

                await AddMemoTableTestHelper.addmemo({ idmemo: 3 });
                await AddMemoTableTestHelper.addmemo({ idmemo: 4 });


                const response = await server.inject({
                    method: 'GET',
                    url: `/memo`,

                })

                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });

        });
    });
});