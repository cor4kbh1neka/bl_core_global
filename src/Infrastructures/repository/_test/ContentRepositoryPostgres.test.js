const ContentMetatagTableHelper = require('../../../../tests/ContentMetatagTableHelper');
const ContentSiteMapTableHelper = require('../../../../tests/ContentSiteMapTableHelper');
const ContentgeneralContentTableHelper = require('../../../../tests/ContentgeneralContentTableHelper');
const ContentSliderTableHelper = require('../../../../tests/ContentSliderTableHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const EditGeneral = require('../../../Domains/contnt/entities/EditGeneral');
const EditContent = require('../../../Domains/contnt/entities/EditContent');
const AddSitemap = require('../../../Domains/contnt/entities/AddSitemap');
const EditSlider = require('../../../Domains/contnt/entities/EditSlider');
const pool = require('../../database/postgres/pool');
const ContentRepositoryPostgres = require('../ContentRepositoryPostgres');

describe('ContentRepositoryPostgres', () => {
  afterEach(async () => {
    await ContentMetatagTableHelper.cleanTable();
    await ContentSiteMapTableHelper.cleanTable();
    await ContentgeneralContentTableHelper.cleanTable();
    await ContentSliderTableHelper.cleanTable();
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

  describe('GENERAL CONTENT REPOSITORY', () => {
    describe('GENERAL CONTENT REPOSITORY EDIT FEATURES', () => {

      it('should edit content fail', async () => {
        //arrange
        const useCasePayload = new EditGeneral({
          nmwebsite: 'nama website',
          logrl: 'global-bola-logo.webp',
          icrl: 'global-bola-logo.webp',
          pkrl: 'https://apkdownload.com/',
          rnntxt: 'GLOBALBOLA SITUS RESMI | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',
        });
        const params = {
          idnmwebst: 4
        }

        // Action
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await expect(contentRepositoryPostgres.editgeneral(useCasePayload, params.idnmwebst))
          .rejects.toThrowError(InvariantError);
      });
      it('should edit content success', async () => {
        //arrange
        const useCasePayload = new EditGeneral({
          nmwebsite: 'nama website',
          logrl: 'global-bola-logo.webp',
          icrl: 'global-bola-logo.webp',
          pkrl: 'https://apkdownload.com/',
          rnntxt: 'GLOBALBOLA SITUS RESMI | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',
        });
        const params = {
          idnmwebst: 4
        }

        // Action
        await ContentgeneralContentTableHelper.addgeneralct({ idnmwebst: 4 });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await contentRepositoryPostgres.editgeneral(useCasePayload, params.idnmwebst);
        const metatag = await ContentgeneralContentTableHelper.findctgeneral(params.idnmwebst);
        expect(metatag).toHaveLength(1);

      });

    })

    describe('ContentRepositoryPostgres.getdatameta', () => {

      it('should get datameta success', async () => {
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentgeneralContentTableHelper.addgeneralct({ nmwebsite: 'sarutobi' });
        const ctgeneral = await contentRepositoryPostgres.getgeneral();
        expect(ctgeneral).toEqual({
          idnmwebst: 1,
          nmwebsite: 'sarutobi',
          logrl: 'global-bola-logo.webp2',
          icrl: 'global-bola-logo.webp2',
          pkrl: 'https://apkdownload.com/2',
          rnntxt: 'GLOBALBOLA SITUS RESMI22 | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',
        });
      });
    });


  });

  describe('SLIDER CONTENT REPOSITORY', () => {
    describe('SLIDER CONTENT REPOSITORY EDIT FEATURES', () => {

      it('should edit content fail', async () => {
        //arrange
        const useCasePayload = new EditSlider({
          ctsldrur: 'https://example.com/2',
          ttlectsldr: 'example title 2',
          trgturctsldr: 'https://example.com/2',
          statusctsldr: '2',
        });
        const params = {
          idctsldr: 5
        }

        // Action
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await expect(contentRepositoryPostgres.editslider(useCasePayload, params.idctsldr))
          .rejects.toThrowError(InvariantError);
      });
      it('should edit content success', async () => {
        //arrange
        const useCasePayload = new EditSlider({
          ctsldrur: 'https://example.com/2',
          ttlectsldr: 'example title 2',
          trgturctsldr: 'https://example.com/2',
          statusctsldr: '2',
        });
        const params = {
          idctsldr: 6
        }

        // Action
        await ContentSliderTableHelper.addslider({ idctsldr: 6 });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await contentRepositoryPostgres.editslider(useCasePayload, params.idctsldr);
        const dataslider = await ContentSliderTableHelper.findslider(params.idctsldr);
        expect(dataslider).toHaveLength(1);

      });

    })

    describe('ContentRepositoryPostgres.getslider', () => {

      it('should get slider success', async () => {
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentSliderTableHelper.addslider({ idctsldr: 5, ctsldrur: 'https=//example.com/2' });
        const ctgeneral = await contentRepositoryPostgres.getslider();
        expect(ctgeneral).toEqual({
          idctsldr: 5,
          ctsldrur: 'https=//example.com/2',
          ttlectsldr: 'example title 2',
          trgturctsldr: 'https=//example.com/2',
          statusctsldr: '2',
        });
      });
    });
  });
});



