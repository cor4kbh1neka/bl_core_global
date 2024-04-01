const AddBnksTableTestHelper = require('../../../../tests/AddBnksTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AddBnksDp = require('../../../Domains/banks/entities/AddBnksDp');
const pool = require('../../database/postgres/pool');
const ApkBnksRepositoryPostgres = require('../ApkBnksRepositoryPostgres');



describe('ApkRepositoryPostgres', () => {
  afterEach(async () => {
    await AddBnksTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('add data in bnks data settings', () => {
    it('should persist add data settings and return success', async () => {
      //arrange
      const addbks = new AddBnksDp({
        namegroupxyzt: 'groupbank1',
        namebankxxyy: 'bca',
        statusxxyy: 1,
        yyxxmethod: 'bank',
        xynamarekx: 'florensia sitanggang',
        norekxyxy: '0355917811',
        barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        zwzwshowbarcode: 1,
      });

      const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

      // Action
      await apkBnksRepositoryPostgres.databnksdp(addbks);
      // Assert
      const datasettings = await AddBnksTableTestHelper.findbks('groupbank1');
      expect(datasettings).toHaveLength(1);
    });

    it('should return 201 add bank correctly', async () => {
      //arrange
      const addbks = new AddBnksDp({
        namegroupxyzt: 'groupbank1',
        namebankxxyy: 'bca',
        statusxxyy: 1,
        yyxxmethod: 'bank',
        xynamarekx: 'florensia sitanggang',
        norekxyxy: '0355917811',
        barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        zwzwshowbarcode: 1,
      });

      const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

      // Action
      const data = await apkBnksRepositoryPostgres.databnksdp(addbks);
      // Assert
      expect(data).toStrictEqual('groupbank1');
    });

    it('should check data bnks have in database', async () => {
      //arrange
      const addbks = new AddBnksDp({
        namegroupxyzt: 'groupbank2',
        namebankxxyy: 'bca',
        statusxxyy: 1,
        yyxxmethod: 'bank',
        xynamarekx: 'florensia sitanggang',
        norekxyxy: '0355917812',
        barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        zwzwshowbarcode: 1,
      });

      const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

      // Action
      await AddBnksTableTestHelper.addbks({ idbank: 2, namegroupxyzt: 'groupbank2', norekxyxy: '0355917812', xynamarekx: 'florensia sitanggang' });
      // Assert
      await expect(apkBnksRepositoryPostgres.checkbnks(addbks.norekxyxy, addbks.namegroupxyzt, addbks.xynamarekx))
        .rejects.toThrow(InvariantError);
    });




    describe('get Data Bank', () => {
      it('should get Data apk data and success', async () => {
        const params = {
          groupname: 'groupbank1'
        }
        await AddBnksTableTestHelper.addbks({ idbank: 3, namegroupxyzt: 'groupbank1', norekxyxy: '0355917877' });
        await AddBnksTableTestHelper.addbks({ idbank: 4, namegroupxyzt: 'groupbank1', norekxyxy: '0355917878' });

        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        const getbankdata = await apkBnksRepositoryPostgres.getdatabnksdp(params.groupname);


        const databankarr = [];
        for (const key in getbankdata) {
          const { idbank, created_at, updated_at, ...bankdata } = getbankdata[key];
          databankarr.push({
            ...bankdata
          });
        }

        const databank = {
          masterdata: databankarr,
        };

        expect(databank).toStrictEqual({
          masterdata: [
            {
              namegroupxyzt: 'groupbank1',
              namebankxxyy: 'bca',
              statusxxyy: 1,
              yyxxmethod: 'bank',
              xynamarekx: 'florensia sitangg',
              norekxyxy: '0355917877',
              barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
              zwzwshowbarcode: 1
            },
            {
              namegroupxyzt: 'groupbank1',
              namebankxxyy: 'bca',
              statusxxyy: 1,
              yyxxmethod: 'bank',
              xynamarekx: 'florensia sitangg',
              norekxyxy: '0355917878',
              barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
              zwzwshowbarcode: 1
            }
          ]
        });

      });
    });
  });
});
