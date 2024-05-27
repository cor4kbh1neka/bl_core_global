const pool = require('../../database/postgres/pool');
const ContentMetatagTableHelper = require('../../../../tests/ContentMetatagTableHelper');
const ContentSiteMapTableHelper = require('../../../../tests/ContentSiteMapTableHelper');
const ContentgeneralContentTableHelper = require('../../../../tests/ContentgeneralContentTableHelper');
const ContentSliderTableHelper = require('../../../../tests/ContentSliderTableHelper');
const ContentLinkTableHelpertest = require('../../../../tests/ContentLinkTableHelpertest');
const container = require('../../container');
const createServer = require('../createServer');


describe('ContentEndPoints', () => {
    afterAll(() => {
        pool.end();
    });

    afterEach(async () => {
        await ContentMetatagTableHelper.cleanTable();
        await ContentSiteMapTableHelper.cleanTable();
        await ContentgeneralContentTableHelper.cleanTable();
        await ContentSliderTableHelper.cleanTable();
        await ContentLinkTableHelpertest.cleanTable();

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

    describe('CONTENT GENERAL ENDPOINTS', () => {
        describe('Contentrepository. Edit Content General', () => {
            it('should edit content general success', async () => {
                const requestPayload = {
                    nmwebsite: 'nama website',
                    logrl: 'global-bola-logo.webp',
                    icrl: 'global-bola-logo.webp',
                    pkrl: 'https://apkdownload.com/',
                    rnntxt: 'GLOBALBOLA SITUS RESMI | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',
                };
                const idnmwebst = 77;

                const server = await createServer(container);
                await ContentgeneralContentTableHelper.addgeneralct({ idnmwebst: 77 });

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/ctgeneral/${idnmwebst}`,
                    payload: requestPayload,
                });
                // Assert

                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');


            });
            it('should edit content general fail', async () => {
                const requestPayload = {
                    nmwebsite: 'nama website',
                    logrl: 'global-bola-logo.webp',
                    icrl: 'global-bola-logo.webp',
                    pkrl: 'https://apkdownload.com/',
                    rnntxt: 'GLOBALBOLA SITUS RESMI | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',
                };
                const idnmwebst = 99;

                const server = await createServer(container);

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/ctgeneral/${idnmwebst}`,
                    payload: requestPayload,
                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail edit data !');

            });
        });

        describe('ContentRepositoryPostgres.get data general', () => {
            it('should get content general success', async () => {
                const server = await createServer(container);
                await ContentgeneralContentTableHelper.addgeneralct({ idnmwebst: 77 });
                const response = await server.inject({
                    method: 'GET',
                    url: `/content/ctgeneral`,
                });


                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
    });


    describe('CONTENT SLIDER ENDPOINTS', () => {
        describe('Contentrepository. Edit Content SLIDER', () => {
            it('should edit content SLIDER success', async () => {
                const requestPayload = {
                    ctsldrur: 'https://example.com/2',
                    ttlectsldr: 'example title 2',
                    trgturctsldr: 'https://example.com/2',
                    statusctsldr: '2',
                };
                const idctsldr = 77;

                const server = await createServer(container);
                await ContentSliderTableHelper.addslider({ idctsldr: 77 });

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/ctslider/${idctsldr}`,
                    payload: requestPayload,
                });
                // Assert

                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');


            });
            it('should edit content SLIDER fail', async () => {
                const requestPayload = {
                    ctsldrur: 'https://example.com/2',
                    ttlectsldr: 'example title 2',
                    trgturctsldr: 'https://example.com/2',
                    statusctsldr: '2',
                };
                const idctsldr = 99;

                const server = await createServer(container);

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/ctslider/${idctsldr}`,
                    payload: requestPayload,
                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail edit data !');

            });
        });

        describe('ContentRepositoryPostgres.get data SLIDER', () => {
            it('should get content SLIDER success', async () => {
                const server = await createServer(container);
                await ContentSliderTableHelper.addslider({ idnmwebst: 78 });
                const response = await server.inject({
                    method: 'GET',
                    url: `/content/ctslider`,
                });


                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
    });

    describe('CONTENT LINK ENDPOINTS', () => {
        describe('Contentrepository. Edit Content LINK', () => {
            it('should edit content LINK success', async () => {
                const requestPayload = {
                    ctlnkname: 'link alternatif55',
                    ctlnkdmn: 'https://example.com/55',
                    statusctlnk: '2',
                };
                const idctlnk = 77;

                const server = await createServer(container);
                await ContentLinkTableHelpertest.addlink({ idctlnk: 77 });

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/ctlink/${idctlnk}`,
                    payload: requestPayload,
                });
                // Assert

                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');


            });
            it('should edit content LINK fail', async () => {
                const requestPayload = {
                    ctlnkname: 'link alternatif55',
                    ctlnkdmn: 'https://example.com/55',
                    statusctlnk: '2',
                };
                const idctlnk = 99;

                const server = await createServer(container);

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/ctlink/${idctlnk}`,
                    payload: requestPayload,
                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail edit data !');

            });
        });

        describe('ContentRepositoryPostgres.get data LINK', () => {
            it('should get content SLIDER success', async () => {
                const server = await createServer(container);
                await ContentLinkTableHelpertest.addlink({ idctlnk: 78 });
                const response = await server.inject({
                    method: 'GET',
                    url: `/content/ctlink`,
                });


                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
    });
});
