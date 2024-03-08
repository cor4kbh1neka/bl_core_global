const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const UsersLogTableTestHelper = require('../../../../tests/UsersLogTableTestHelper');
const UsersEventTableTestHelper = require('../../../../tests/UsersEventTableTestHelper');
const UsersReffsTableTestHelper = require('../../../../tests/UsersReffsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/adduserendpoints', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await UsersLogTableTestHelper.cleanTable();
        await UsersEventTableTestHelper.cleanTable();
        await UsersReffsTableTestHelper.cleanTable();
    });

    describe('WHEN POST /users', () => {
        it('should response 201 and persisted user data', async () => {
            // Arrange
            const requestPayload = {
                xyusernamexxy: 'fakeuser',
                password: 'secret',
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345678',
                xyx11xuser_mailxxyy: 'user@gmail.com',
                xynumbphonexyyy: '58469874451',
            };

            // eslint-disable-next-line no-undef
            const server = await createServer(container);



            // Action
            const response = await server.inject({
                method: 'POST',
                url: '/users',
                payload: requestPayload,
            });
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(201);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data.addedUser).toBeDefined();

        });



    });


});