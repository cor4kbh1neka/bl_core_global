const pool = require('../../database/postgres/pool');
const AddBnksTableTestHelper = require('../../../../tests/AddBnksTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/adduserendpoints', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await AddBnksTableTestHelper.cleanTable();
    });

    describe('WHEN POST /banks', () => {

        it('should response 201 and persisted banks data', async () => {
            // Arrange
            const requestPayload = {
                namegroupxyzt: 'groupbank1',
                namebankxxyy: 'bca',
                statusxxyy: 1,
                yyxxmethod: 'bank',
                xynamarekx: 'florensia sitanggang',
                norekxyxy: '0355917811',
                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                zwzwshowbarcode: 1,
            };

            // eslint-disable-next-line no-undef
            const server = await createServer(container);

            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/banks',
                payload: requestPayload,
            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');

        });
    });

    describe('WHEN POST /banks/{groupname}', () => {

        it('should response 201 and persisted bank', async () => {

            const server = await createServer(container);
            const groupname = 'groupbank1';

            await AddBnksTableTestHelper.addbks({ idbank: 4, namegroupxyzt: 'groupbank1', norekxyxy: '0355917810' });
            await AddBnksTableTestHelper.addbks({ idbank: 5, namegroupxyzt: 'groupbank1', norekxyxy: '0355917811' });


            const response = await server.inject({
                method: 'GET',
                url: `/banks/${groupname}`,

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
                url: `/banks/${groupname}`,

            })
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('data not found !');
        });
    });
});