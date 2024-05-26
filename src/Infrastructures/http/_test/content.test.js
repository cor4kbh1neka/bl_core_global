const pool = require('../../database/postgres/pool');
const ContentMetatagTableHelper = require('../../../../tests/ContentMetatagTableHelper');
const ContentSiteMapTableHelper = require('../../../../tests/ContentSiteMapTableHelper');
const container = require('../../container');
const createServer = require('../createServer');


describe('ContentEndPoints', () => {
    afterAll(() => {
        pool.end();
    });

    afterEach(async () => {
        await ContentMetatagTableHelper.cleanTable();
        await ContentSiteMapTableHelper.cleanTable();

    });


    describe('CONTENT METATAG ENDPOINTS', () => {
        describe('ContentRepositoryPostgres.editmtdt', () => {
            it('should edit metatag success', async () => {
                const requestPayload = {
                    mttag: '<h2>welcome3</h2>',
                    artcl: '<h2>test arti0cle</h2>',
                    scrptlvc: 'http://deposit.home3',
                };
                const iddtmeta = 5;

                const server = await createServer(container);
                await ContentMetatagTableHelper.addContent({ iddtmeta: 5 });

                const response = await server.inject({
                    method: 'POST',
                    url: `/content/dtmttag/${iddtmeta}`,
                    payload: requestPayload,
                });
                // Assert

                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');


            });
            it('should edit metatag fail', async () => {
                const requestPayload = {
                    mttag: '<h2>welcome3</h2>',
                    artcl: '<h2>test arti0cle</h2>',
                    scrptlvc: 'http://deposit.home3',
                };
                const iddtmeta = 99;

                const server = await createServer(container);

                const response = await server.inject({
                    method: 'POST',
                    url: `/content/dtmttag/${iddtmeta}`,
                    payload: requestPayload,
                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail edit data !');

            });
        });

        describe('ContentRepositoryPostgres.getmtdt', () => {
            it('should get metatag success', async () => {
                const server = await createServer(container);
                await ContentMetatagTableHelper.addContent({ iddtmeta: 9 });
                const response = await server.inject({
                    method: 'GET',
                    url: `/content/dtmttag/gtdt`,
                });


                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
    });

    describe('CONTENT SITE MAP ENDPOINTS', () => {
        describe('ContentRepositoryPostgres.ADDsitemap', () => {
            it('should add sitemaps success', async () => {

                //arrange
                const requestPayload = {
                    urpage: 'sience',
                };
                const server = await createServer(container);
                const response = await server.inject({
                    method: 'POST',
                    url: `/content/stmp`,
                    payload: requestPayload,
                });
                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
        it('should add sitemaps fail', async () => {

            //arrange
            const requestPayload = {
                urpage: 'sience',
            };

            await ContentSiteMapTableHelper.addsitemap({ idstmp: 12, urpage: 'sience' });

            const server = await createServer(container);
            const response = await server.inject({
                method: 'POST',
                url: `/content/stmp`,
                payload: requestPayload,
            });
            //assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(400);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('path already exiested !');
        });
        describe('Contentrepository Edit sitemap', () => {
            it('should edit sitemap success', async () => {
                const requestPayload = {
                    urpage: 'basic',
                };
                const urpage = 'standard';
                const server = await createServer(container);
                await ContentSiteMapTableHelper.addsitemap({ idstmp: 32, urpage: 'standard' });

                const response = await server.inject({
                    method: 'POST',
                    url: `/content/stmp/${urpage}`,
                    payload: requestPayload,
                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });
            it('should edit metatag fail', async () => {
                const requestPayload = {
                    urpage: 'basicdua',
                };
                const paramurpage = 'standardtiga';
                const server = await createServer(container);
                const response = await server.inject({
                    method: 'POST',
                    url: `/content/stmp/${paramurpage}`,
                    payload: requestPayload,
                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail edit data !');

            });

        });

        describe('Contentrepository.edit sitemap', () => {
            it('should get metatag success', async () => {
                const server = await createServer(container);
                await ContentSiteMapTableHelper.addsitemap({ idstmp: 33, urpage: 'standard2' });
                await ContentSiteMapTableHelper.addsitemap({ idstmp: 3, urpage: 'standard3' });

                const response = await server.inject({
                    method: 'GET',
                    url: `/content/stmp`,
                });

                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });

        describe('Contentrepository. delete sitemap', () => {
            it('should delete metatag success', async () => {
                const requestPayload = {
                    urpage: 'standard5',
                };
                const server = await createServer(container);
                await ContentSiteMapTableHelper.addsitemap({ idstmp: 54, urpage: 'standard5' });

                const response = await server.inject({
                    method: 'DELETE',
                    url: `/content/stmp`,
                    payload: requestPayload,


                });

                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
            it('should delete metatag fail', async () => {
                const server = await createServer(container);
                const requestPayload = {
                    urpage: 'standard',
                };

                const response = await server.inject({
                    method: 'DELETE',
                    url: `/content/stmp`,
                    payload: requestPayload,

                });

                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail delete data !');

            });


        });

    });
});
