const AddBnksTableTestHelper = require('../../../../tests/AddBnksTableTestHelper');
const AddBanksTableTestHelper = require('../../../../tests/AddBanksTableTestHelper');
const AddGroupTableTestHelper = require('../../../../tests/AddGroupTableTestHelper');
const AddMasterTableTestHelper = require('../../../../tests/AddMasterTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddBnksDp = require('../../../Domains/banks/entities/AddBnksDp');
const AddBnks = require('../../../Domains/banks/entities/AddBnks');
const AddGroupBnks = require('../../../Domains/banks/entities/AddGroupBnks');
const AddMasterBnks = require('../../../Domains/banks/entities/AddMasterBnks');
const pool = require('../../database/postgres/pool');
const ApkBnksRepositoryPostgres = require('../ApkBnksRepositoryPostgres');



describe('DataBank repository', () => {
  afterEach(async () => {
    await AddBnksTableTestHelper.cleanTable();
    await AddGroupTableTestHelper.cleanTable();
    await AddMasterTableTestHelper.cleanTable();
    await AddBanksTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('GROUP data bank group', () => {

    describe('add group bank in data', () => {
      it('should add data group and return group', async () => {
        //arrange
        const addgroup = new AddGroupBnks({
          namegroupxyzt: 'groupbank2',
          grouptype: 1,
          min_dp: 10,
          max_dp: 2500,
          min_wd: 30,
          max_wd: 50000,
        });

        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        // Action
        await apkBnksRepositoryPostgres.addgrp(addgroup);

        const groupdata = await AddGroupTableTestHelper.findgrp(addgroup.namegroupxyzt);
        expect(groupdata).toHaveLength(1);

      });

    });

    describe('get data group', () => {
      it('should return data group', async () => {


        await AddGroupTableTestHelper.addgroup({ idgroup: 3, groupbank: 'groupbank3' });
        await AddGroupTableTestHelper.addgroup({ idgroup: 4, groupbank: 'groupbank4' });

        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        const getbankdata = await apkBnksRepositoryPostgres.getdtGroup();

        expect(getbankdata).toStrictEqual([{ "idgroup": 3, "grouptype": 1, min_dp: 10, max_dp: 2500, min_wd: 30, max_wd: 50000, groupbank: "groupbank3" }, { "idgroup": 4, "grouptype": 1, groupbank: "groupbank4", min_dp: 10, max_dp: 2500, min_wd: 30, max_wd: 50000, }]);
      });

    });
    describe('delete data group', () => {
      it('should check data bnks have in database', async () => {
        //arrange
        params = {
          idgroup: 17
        }

        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        // Action
        await AddGroupTableTestHelper.addgroup({ idgroup: 13, groupbank: 'groupbank7' });
        // Assert
        await expect(apkBnksRepositoryPostgres.findgroup(params.idgroup))
          .rejects.toThrow(NotFoundError);
      });
      it('should return data group', async () => {
        params = {
          idgroup: 12
        }
        await AddGroupTableTestHelper.addgroup({ idgroup: 12, groupbank: 'groupbank3' });

        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        await apkBnksRepositoryPostgres.findgroup(params.idgroup);
        const datadelete = await apkBnksRepositoryPostgres.delgroup(params.idgroup);

        expect(datadelete).toStrictEqual("success delete group");
      });

    });
  });

  describe('MASTER data bank group', () => {
    describe('add Master bank success', () => {
      it('should check data master have in database', async () => {
        const useCasePayload = {
          bnkmstrxyxyx: 'cimbniaga',
        };
        // Arrange
        await AddMasterTableTestHelper.addmaster({ bnkmstrxyxyx: 'cimbniaga' }); // memasukan user baru dengan username dicoding
        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);
        // Action & Assert
        await expect(apkBnksRepositoryPostgres.chckmstr(useCasePayload.bnkmstrxyxyx)).rejects.toThrowError(InvariantError);
      });

      it('should not throw InvariantError if bankmaster not available', async () => {
        // Arrange
        const useCasePayload = {
          bnkmstrxyxyx: 'bri',
        };
        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);
        await AddMasterTableTestHelper.addmaster({ bnkmstrxyxyx: 'cimbniaga' });
        await expect(apkBnksRepositoryPostgres.chckmstr(useCasePayload.bnkmstrxyxyx))
          .resolves.not.toThrow(InvariantError);
      });


      it('should add data master bank successfully', async () => {

        const useCasePayload = new AddMasterBnks({
          bnkmstrxyxyx: 'mandiri',
          urllogoxxyx: 'https://www.coskoc.com/api/',
          statusxyxyy: 1,
        });

        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        // Action
        await apkBnksRepositoryPostgres.addmstr(useCasePayload);

        const groupdata = await AddMasterTableTestHelper.findmster(useCasePayload.bnkmstrxyxyx);
        expect(groupdata).toHaveLength(1);
      });
    });
    describe('EDIT Master bank data success', () => {

      it('should edit data master bank fail', async () => {
        const params = {
          mstrbnks: 'danamon'

        }
        const useCasePayload = new AddMasterBnks({
          bnkmstrxyxyx: 'mandiri',
          urllogoxxyx: 'https://www.coskoc.com/api/',
          statusxyxyy: 2,
        });
        // Arrange
        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        // Action & Assert
        await expect(apkBnksRepositoryPostgres.putmstrbnk(useCasePayload, params.mstrbnks))
          .rejects
          .toThrowError(InvariantError);
      });

      it('should edit data master bank successfully', async () => {
        const params = {
          mstrbnks: "mandiri",
        }

        const useCasePayload = new AddMasterBnks({
          bnkmstrxyxyx: 'mandiri',
          urllogoxxyx: 'https://www.coskoc.com/api/',
          statusxyxyy: 2,
        });

        await AddMasterTableTestHelper.addmaster({ bnkmstrxyxyx: 'mandiri' });


        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        // Action
        const dataresulteditmster = await apkBnksRepositoryPostgres.putmstrbnk(useCasePayload, params.mstrbnks);
        expect(dataresulteditmster).toStrictEqual("Master Bank Edit Success !");
      });
    });
    describe('get data master', () => {
      it('should return data group', async () => {

        await AddMasterTableTestHelper.addmaster({ idbnkmaster: 5, bnkmstrxyxyx: 'bca2' });
        await AddMasterTableTestHelper.addmaster({ idbnkmaster: 6, bnkmstrxyxyx: 'bca3' });

        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        const getbankdata = await apkBnksRepositoryPostgres.getmstrbnk();

        expect(getbankdata).toStrictEqual([{
          idbnkmaster: 5,
          bnkmstrxyxyx: 'bca2',
          urllogoxxyx: 'https://www.coskoc.com/api/',
          statusxyxyy: 1,
        }, {
          idbnkmaster: 6,
          bnkmstrxyxyx: 'bca3',
          urllogoxxyx: 'https://www.coskoc.com/api/',
          statusxyxyy: 1,
        }]);
      });

    });
    describe('delete data master', () => {
      it('should check data master bnks have in database', async () => {
        //arrange
        params = {
          idbnkmaster: 18
        }

        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        // Action
        await AddMasterTableTestHelper.addmaster({ idbnkmaster: 17, bnkmstrxyxyx: 'bca14' });        // Assert
        await expect(apkBnksRepositoryPostgres.findmstr(params.idbnkmaster))
          .rejects.toThrow(NotFoundError);
      });
      it('should return data group', async () => {
        params = {
          idbnkmaster: 13
        }
        await AddMasterTableTestHelper.addmaster({ idbnkmaster: 13, bnkmstrxyxyx: 'bca15' });        // Assert

        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        await apkBnksRepositoryPostgres.findmstr(params.idbnkmaster);
        const datadelete = await apkBnksRepositoryPostgres.delmstrbnk(params.idbnkmaster);

        expect(datadelete).toStrictEqual("success delete master bank");
      });
    });
  });


  describe('BANK DATA', () => {
    describe('add bank success', () => {
      it('should persist add data settings and return success', async () => {
        //arrange
        const addbks = new AddBnks({
          namegroupxyzt: ['groupbank1'],
          masterbnkxyxt: 'bca',
          namebankxxyy: 'bca1',
          yyxxmethod: 'bank',
          xynamarekx: 'florensia sitanggang',
          norekxyxy: '0355917811',
          barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        });

        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        // Action
        const databank = await apkBnksRepositoryPostgres.addbnks(addbks);
        // Assert
        const datasettings = await AddBanksTableTestHelper.findbanks(databank.namebankxxyy, databank.xynamarekx, databank.norekxyxy);
        expect(datasettings).toHaveLength(1);
      });

      it('should persist add data settings and return success', async () => {
        //arrange
        const addbks = new AddBnks({
          namegroupxyzt: ['groupbank1'],
          masterbnkxyxt: 'bca',
          namebankxxyy: 'bca1',
          yyxxmethod: 'bank',
          xynamarekx: 'florensia sitanggang',
          norekxyxy: '0355917811',
          barcodexrxr: '0',
        });

        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        // Action
        const databank = await apkBnksRepositoryPostgres.addbnks(addbks);
        // Assert
        const datasettings = await AddBanksTableTestHelper.findbanks(databank.namebankxxyy, databank.xynamarekx, databank.norekxyxy);
        expect(datasettings).toHaveLength(1);
      });

      it('should return 201 add bank correctly', async () => {
        //arrange
        const addbks = new AddBnks({
          namegroupxyzt: ['groupbank1'],
          masterbnkxyxt: 'bca',
          namebankxxyy: 'bca1',
          yyxxmethod: 'bank',
          xynamarekx: 'florensia sitanggang',
          norekxyxy: '0355917811',
          barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        });
        resultmockdoneadd = {
          masterbnkxyxt: 'bca',
          namegroupxyzt: ['groupbank1'],
          namebankxxyy: 'bca1',
          norekxyxy: '0355917811',
          xynamarekx: 'florensia sitanggang',

        };
        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);
        // Action
        const data = await apkBnksRepositoryPostgres.addbnks(addbks);
        // Assert
        expect(data).toStrictEqual(resultmockdoneadd);
      });

      it('should check data bank have in database', async () => {
        const addbks = new AddBnks({
          namegroupxyzt: 'groupbank1',
          masterbnkxyxt: 'bca',
          namebankxxyy: 'bca2',
          yyxxmethod: 'bank',
          xynamarekx: 'flsia sitanggang',
          norekxyxy: '0322917811',
          barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        });
        // Arrange
        await AddBanksTableTestHelper.addbks({
          namebankxxyy: 'bca2',
          xynamarekx: 'flsia sitanggang',
          norekxyxy: '0322917811'
        });

        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);
        // Action & Assert
        await expect(apkBnksRepositoryPostgres.chckbnks(addbks.namebankxxyy, addbks.xynamarekx, addbks.norekxyxy)).rejects.toThrowError(InvariantError);
      });

      it('should not throw InvariantError if bank not available', async () => {
        // Arrange
        const addbks = new AddBnks({
          namegroupxyzt: 'groupbank1',
          masterbnkxyxt: 'bca',
          namebankxxyy: 'bca1',
          yyxxmethod: 'bank',
          xynamarekx: 'florensia sitanggang',
          norekxyxy: '0355917811',
          barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        });
        // Arrange
        await AddBanksTableTestHelper.addbks({
          namebankxxyy: 'bri',
          xynamarekx: 'floresa sitangg',
          norekxyxy: '0355927821',
        });

        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);
        // Action & Assert
        await expect(apkBnksRepositoryPostgres.chckbnks(addbks.namebankxxyy, addbks.xynamarekx, addbks.norekxyxy)).resolves.not.toThrow(InvariantError);
      });
    });

    describe('EDIT Master bank data success', () => {

      it('should edit data bank fail', async () => {
        const params = {
          idbank: 2,
        }
        const useCasePayload = new AddBnks({
          namegroupxyzt: ['groupbank1'],
          masterbnkxyxt: 'bca',
          namebankxxyy: 'bca1',
          yyxxmethod: 'bank',
          xynamarekx: 'florensia sitanggang',
          norekxyxy: '0355917811',
          barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        });
        // Arrange
        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        // Action & Assert
        await expect(apkBnksRepositoryPostgres.putbnks(useCasePayload, params.idbank))
          .rejects
          .toThrowError(InvariantError);
      });

      it('should edit data bank successfully with value true in barcode', async () => {
        const params = {
          idbank: 2,
        }

        const useCasePayload = new AddBnks({
          namegroupxyzt: ['groupbank1'],
          masterbnkxyxt: 'bca',
          namebankxxyy: 'bca1',
          yyxxmethod: 'bank',
          xynamarekx: 'florensia sitanggang',
          norekxyxy: '0355917811',
          barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        });

        await AddBanksTableTestHelper.addbks({
          idbank: 2, barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
          zwzwshowbarcode: true,
        });


        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        // Action
        const dataresulteditmster = await apkBnksRepositoryPostgres.putbnks(useCasePayload, params.idbank);
        expect(dataresulteditmster).toStrictEqual("Bank Edit Success !");
      });
      it('should edit data bank successfullywith value false in barcode', async () => {
        const params = {
          idbank: 3,
        }

        const useCasePayload = new AddBnks({
          namegroupxyzt: ['groupbank1'],
          masterbnkxyxt: 'bca',
          namebankxxyy: 'bca1',
          yyxxmethod: 'bank',
          xynamarekx: 'florensia sitanggang',
          norekxyxy: '0355917811',
          barcodexrxr: '0',
        });

        await AddBanksTableTestHelper.addbks({
          idbank: 3, barcodexrxr: '0'
        });


        const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

        // Action
        const dataresulteditmster = await apkBnksRepositoryPostgres.putbnks(useCasePayload, params.idbank);
        expect(dataresulteditmster).toStrictEqual("Bank Edit Success !");
      });
    });

    describe('GET bank', () => {
      describe('GET bank bank data success', () => {
        it('should get data bank data', async () => {
          const params = {
            groupname: 'groupbank1'
          };

          await AddBanksTableTestHelper.addbks({
            idbank: 1, namebankxxyy: 'bca1',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
            zwzwshowbarcode: true,
          });
          await AddBanksTableTestHelper.addbks({
            idbank: 2, namebankxxyy: 'bca2',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
            zwzwshowbarcode: true,
          });
          const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

          const getbankdata = await apkBnksRepositoryPostgres.getbnks(params.groupname);

          expect(getbankdata).toStrictEqual([
            {
              idbank: 1,
              namegroupxyzt: ['groupbank1'],
              masterbnkxyxt: 'bca',
              namebankxxyy: 'bca1',
              yyxxmethod: 'bank',
              xynamarekx: 'florensia sitangg',
              norekxyxy: '0355917811',
              barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
              zwzwshowbarcode: true,

            },
            {
              idbank: 2,
              namegroupxyzt: ['groupbank1'],
              masterbnkxyxt: 'bca',
              namebankxxyy: 'bca2',
              yyxxmethod: 'bank',
              xynamarekx: 'florensia sitangg',
              norekxyxy: '0355917811',
              barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
              zwzwshowbarcode: true,

            }]);
        });

        it('should get data bank bank fail', async () => {
          const params = {
            groupname: 'groupbank1'
          };

          // Arrange
          const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

          // Action & Assert
          await expect(apkBnksRepositoryPostgres.getbnks(params.groupname))
            .rejects
            .toThrowError(NotFoundError);
        });

      });
      describe('get data bank except group', () => {
        it('should get data bank data except group', async () => {
          const params = {
            groupname: 'groupbank2'
          };

          await AddBanksTableTestHelper.addbks({
            idbank: 1, namebankxxyy: 'bca1',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
            zwzwshowbarcode: true,
          });
          await AddBanksTableTestHelper.addbks({
            idbank: 2, namebankxxyy: 'bca2',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
            zwzwshowbarcode: true,
          });
          const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

          const getbankdata = await apkBnksRepositoryPostgres.getbnkex(params.groupname);

          expect(getbankdata).toStrictEqual([
            {
              idbank: 1,
              namegroupxyzt: ['groupbank1'],
              masterbnkxyxt: 'bca',
              namebankxxyy: 'bca1',
              yyxxmethod: 'bank',
              xynamarekx: 'florensia sitangg',
              norekxyxy: '0355917811',
              barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
              zwzwshowbarcode: true,

            },
            {
              idbank: 2,
              namegroupxyzt: ['groupbank1'],
              masterbnkxyxt: 'bca',
              namebankxxyy: 'bca2',
              yyxxmethod: 'bank',
              xynamarekx: 'florensia sitangg',
              norekxyxy: '0355917811',
              barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
              zwzwshowbarcode: true,

            }]);
        });
        it('should get data bank bank fail except group', async () => {
          const params = {
            groupname: 'groupbank5'
          };

          // Arrange
          const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

          // Action & Assert
          await expect(apkBnksRepositoryPostgres.getbnkex(params.groupname))
            .rejects
            .toThrowError(NotFoundError);
        });
      });
      describe('get data group', () => {
        it('should return data group', async () => {
          const params = {
            groupname: 'groupbank5'
          };

          await AddGroupTableTestHelper.addgroup({ idgroup: 5, groupbank: 'groupbank5' });
          const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);
          const getbankdata = await apkBnksRepositoryPostgres.getgroupbnks(params.groupname);
          expect(getbankdata).toStrictEqual([{ "idgroup": 5, "grouptype": 1, groupbank: "groupbank5", min_dp: 10, max_dp: 2500, min_wd: 30, max_wd: 50000 }]);
        });

        it('should get data bank bank fail', async () => {
          const params = {
            groupname: 'groupbank1'
          };

          // Arrange
          const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

          // Action & Assert
          await expect(apkBnksRepositoryPostgres.getgroupbnks(params.groupname))
            .rejects
            .toThrowError(NotFoundError);
        });

      });

      describe('get all data group except', () => {
        it('should return data group', async () => {
          const params = {
            groupname: 'groupbank5'
          };

          await AddGroupTableTestHelper.addgroup({ idgroup: 5, groupbank: 'groupbank5' });
          await AddGroupTableTestHelper.addgroup({ idgroup: 6, groupbank: 'groupbank6' });
          const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);
          const getbankdata = await apkBnksRepositoryPostgres.getgroupbnkex(params.groupname);
          expect(getbankdata).toStrictEqual([{ idgroup: 5, "grouptype": 1, groupbank: 'groupbank5', min_dp: 10, max_dp: 2500, min_wd: 30, max_wd: 50000 }, { idgroup: 6, "grouptype": 1, groupbank: 'groupbank6', min_dp: 10, max_dp: 2500, min_wd: 30, max_wd: 50000 }]);
        });

        it('should get data bank bank fail', async () => {
          const params = {
            groupname: 'groupbank7'
          };

          // Arrange
          const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

          // Action & Assert
          await expect(apkBnksRepositoryPostgres.getgroupbnkex(params.groupname))
            .rejects
            .toThrowError(NotFoundError);
        });

      });

      describe('get data master', () => {
        it('should return data master ', async () => {

          const params = {
            groupname: 'groupbank5'
          };
          await AddMasterTableTestHelper.addmaster({ idbnkmaster: 5 });

          const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

          const getbankdata = await apkBnksRepositoryPostgres.getmasterbnks(params.groupname);

          expect(getbankdata).toStrictEqual([{
            idbnkmaster: 5,
            bnkmstrxyxyx: 'bca',
            urllogoxxyx: 'https://www.coskoc.com/api/',
            statusxyxyy: 1,
          }
          ]);
        });
        it('should get dat master bank fail', async () => {
          const params = {
            groupname: 'groupbank1'
          };

          // Arrange
          const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

          // Action & Assert
          await expect(apkBnksRepositoryPostgres.getmasterbnks(params.groupname))
            .rejects
            .toThrowError(NotFoundError);
        });


      });
    });
  });























  // describe('add data in bnks data settings', () => {
  //   it('should persist add data settings and return success', async () => {
  //     //arrange
  //     const addbks = new AddBnksDp({
  //       namegroupxyzt: 'groupbank1',
  //       namebankxxyy: 'bca',
  //       statusxxyy: 1,
  //       yyxxmethod: 'bank',
  //       xynamarekx: 'florensia sitanggang',
  //       norekxyxy: '0355917811',
  //       barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
  //       zwzwshowbarcode: 1,
  //     });

  //     const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

  //     // Action
  //     await apkBnksRepositoryPostgres.databnksdp(addbks);
  //     // Assert
  //     const datasettings = await AddBnksTableTestHelper.findbks('groupbank1');
  //     expect(datasettings).toHaveLength(1);
  //   });

  //   it('should return 201 add bank correctly', async () => {
  //     //arrange
  //     const addbks = new AddBnksDp({
  //       namegroupxyzt: 'groupbank1',
  //       namebankxxyy: 'bca',
  //       statusxxyy: 1,
  //       yyxxmethod: 'bank',
  //       xynamarekx: 'florensia sitanggang',
  //       norekxyxy: '0355917811',
  //       barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
  //       zwzwshowbarcode: 1,
  //     });

  //     const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

  //     // Action
  //     const data = await apkBnksRepositoryPostgres.databnksdp(addbks);
  //     // Assert
  //     expect(data).toStrictEqual('groupbank1');
  //   });

  //   it('should check data bnks have in database', async () => {
  //     //arrange
  //     const addbks = new AddBnksDp({
  //       namegroupxyzt: 'groupbank2',
  //       namebankxxyy: 'bca',
  //       statusxxyy: 1,
  //       yyxxmethod: 'bank',
  //       xynamarekx: 'florensia sitanggang',
  //       norekxyxy: '0355917812',
  //       barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
  //       zwzwshowbarcode: 1,
  //     });

  //     const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

  //     // Action
  //     await AddBnksTableTestHelper.addbks({ idbank: 2, namegroupxyzt: 'groupbank2', norekxyxy: '0355917812', xynamarekx: 'florensia sitanggang' });
  //     // Assert
  //     await expect(apkBnksRepositoryPostgres.checkbnks(addbks.norekxyxy, addbks.namegroupxyzt, addbks.xynamarekx))
  //       .rejects.toThrow(InvariantError);
  //   });




  // describe('get Data Bank', () => {

  //   it('should throw NotFoundError when data bank not found', async () => {
  //     // Arrange
  //     const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

  //     // Action & Assert
  //     await expect(apkBnksRepositoryPostgres.getdatabnksdp('groupbank111112'))
  //       .rejects
  //       .toThrowError(NotFoundError);
  //   });
  //   it('should get Data apk data and success', async () => {
  //     const params = {
  //       groupname: 'groupbank1'
  //     }
  //     await AddBnksTableTestHelper.addbks({ idbank: 3, namegroupxyzt: 'groupbank1', norekxyxy: '0355917877' });
  //     await AddBnksTableTestHelper.addbks({ idbank: 4, namegroupxyzt: 'groupbank1', norekxyxy: '0355917878' });

  //     const apkBnksRepositoryPostgres = new ApkBnksRepositoryPostgres(pool);

  //     const getbankdata = await apkBnksRepositoryPostgres.getdatabnksdp(params.groupname);


  //     const databankarr = [];
  //     for (const key in getbankdata) {
  //       const { idbank, created_at, updated_at, ...bankdata } = getbankdata[key];
  //       databankarr.push({
  //         ...bankdata
  //       });
  //     }

  //     const databank = {
  //       masterdata: databankarr,
  //     };

  //     expect(databank).toStrictEqual({
  //       masterdata: [
  //         {
  //           namegroupxyzt: 'groupbank1',
  //           namebankxxyy: 'bca',
  //           statusxxyy: 1,
  //           yyxxmethod: 'bank',
  //           xynamarekx: 'florensia sitangg',
  //           norekxyxy: '0355917877',
  //           barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
  //           zwzwshowbarcode: 1
  //         },
  //         {
  //           namegroupxyzt: 'groupbank1',
  //           namebankxxyy: 'bca',
  //           statusxxyy: 1,
  //           yyxxmethod: 'bank',
  //           xynamarekx: 'florensia sitangg',
  //           norekxyxy: '0355917878',
  //           barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
  //           zwzwshowbarcode: 1
  //         }
  //       ]
  //     });

  //   });
  // });
  // });
});
