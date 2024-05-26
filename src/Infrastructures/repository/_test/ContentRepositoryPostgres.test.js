const ContentMetatagTableHelper = require('../../../../tests/ContentMetatagTableHelper');
const ContentSiteMapTableHelper = require('../../../../tests/ContentSiteMapTableHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const EditContent = require('../../../Domains/contnt/entities/EditContent');
const AddSitemap = require('../../../Domains/contnt/entities/AddSitemap');
const pool = require('../../database/postgres/pool');
const ContentRepositoryPostgres = require('../ContentRepositoryPostgres');

describe('ContentRepositoryPostgres', () => {
  afterEach(async () => {
    await ContentMetatagTableHelper.cleanTable();
    await ContentSiteMapTableHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });


  describe('METATAG REPOSITORY', () => {
    describe('ContentRepositoryPostgres.editmtdt', () => {
      it('should edit metatag fail', async () => {

        const useCasePayload = new EditContent({
          mttag: '<h2>welcome2</h2>',
          artcl: '<h2>test article2</h2>',
          scrptlvc: 'http://deposit.home2',
        });
        const params = {
          iddtmeta: 4
        }

        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        await expect(contentRepositoryPostgres.editmtdt(useCasePayload, params.iddtmeta))
          .rejects
          .toThrowError(InvariantError);
      });

      it('should edit metatag success', async () => {
        //arrange
        const useCasePayload = new EditContent({
          mttag: '<h2>welcome</h2>',
          artcl: '<h2>test article</h2>',
          scrptlvc: 'http://deposit.home',
        });
        const params = {
          iddtmeta: 4
        }

        // Action
        await ContentMetatagTableHelper.addContent({ iddtmeta: 4 });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await contentRepositoryPostgres.editmtdt(useCasePayload, params.iddtmeta);
        const metatag = await ContentMetatagTableHelper.findcontent(4);
        expect(metatag).toHaveLength(1);

      });
    });
    describe('ContentRepositoryPostgres.getdatameta', () => {

      it('should get datameta success', async () => {
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentMetatagTableHelper.addContent({ iddtmeta: 7 });
        const metatag = await contentRepositoryPostgres.gettmtdt();
        expect(metatag).toEqual({
          iddtmeta: 7,
          mttag: '<h2>welcome</h2>',
          artcl: '<h2>test article</h2>',
          scrptlvc: 'http://deposit.home',
        });
      });
    });
  });

  describe('SITEMAP REPOSITORY', () => {
    describe('SITEMAP ADD FEATURES', () => {
      it('should check data sitemap have in database', async () => {
        //arrange
        const useCasePayload = new AddSitemap({
          urpage: 'test',
        });
        // Arrange
        await ContentSiteMapTableHelper.addsitemap({ idstmp: 78 });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        // Action & Assert
        await expect(contentRepositoryPostgres.checkstmp(useCasePayload.urpage)).resolves.not.toThrow(InvariantError);
      });

      it('should not throw InvariantError if sitemap not available', async () => {
        //arrange
        const useCasePayload = new AddSitemap({
          urpage: 'tools',
        });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentSiteMapTableHelper.addsitemap({ idstmp: 99, urpage: 'tools' });
        await expect(contentRepositoryPostgres.checkstmp(useCasePayload.urpage))
          .rejects.toThrowError(InvariantError);
      });
      it('should add sitemap success', async () => {

        //arrange
        const useCasePayload = new AddSitemap({
          urpage: 'tolkit',
        });

        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        await contentRepositoryPostgres.addstmp(useCasePayload.urpage);
        const metatag = await ContentSiteMapTableHelper.findsitemap(useCasePayload.urpage);
        expect(metatag).toHaveLength(1);
      })
    });
    describe('SITEMAP EDIT FEATURES', () => {
      it('should edit SITEMAP fail', async () => {
        //arrange
        const useCasePayload = new AddSitemap({
          urpage: 'landing2',

        });
        const params = {
          urpage: 'landing'
        }

        // Action
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await expect(contentRepositoryPostgres.editstmp(useCasePayload.urpage, params.urpage))
          .rejects.toThrowError(InvariantError);
      });
      it('should edit SITEMAP success', async () => {
        //arrange
        const useCasePayload = new AddSitemap({
          urpage: 'landing2',

        });
        const params = {
          urpage: 'landing'
        }

        // Action
        await ContentSiteMapTableHelper.addsitemap({ idstmp: 4, urpage: 'landing' });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await contentRepositoryPostgres.editstmp(useCasePayload.urpage, params.urpage);
        const metatag = await ContentSiteMapTableHelper.findsitemap(useCasePayload.urpage);
        expect(metatag).toHaveLength(1);

      });
    });

    describe('SITEMAP GET FEATURES', () => {
      it('should get SITEMAP success', async () => {
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentSiteMapTableHelper.addsitemap({ idstmp: 8, urpage: 'landing' });
        const metatag = await contentRepositoryPostgres.getstmp();
        expect(metatag).toEqual([{
          idstmp: 8,
          urpage: 'landing',
          updated_at: "2024-05-25",
        }]);
      });
    });

    describe('SITEMAP DELETE FEATURES', () => {

      it('should check data bnks have in database', async () => {
        //arrange
        const usecasepayload = {
          urgrup: 'índexempat'
        }

        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        // Action
        await ContentSiteMapTableHelper.addsitemap({ idstmp: 9, urpage: 'índextiga' });
        // Assert
        await expect(contentRepositoryPostgres.delstmp(usecasepayload.urgrup))
          .rejects.toThrow(InvariantError);
      });
      it('should return data group', async () => {
        const usecasepayload = {
          urgrup: 'índextiga'
        }

        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        // Action
        await ContentSiteMapTableHelper.addsitemap({ idstmp: 9, urpage: 'índextiga' });
        // Assert
        const datadelete = await contentRepositoryPostgres.delstmp(usecasepayload.urgrup);

        expect(datadelete).toStrictEqual("Sitemap deleted successfully !");
      });
    });
  })
});



