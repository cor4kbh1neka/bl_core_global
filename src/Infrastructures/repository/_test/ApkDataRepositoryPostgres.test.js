const AddApkEventTableTestHelper = require('../../../../tests/AddApkEventTableTestHelper');
const AddApkPemberitahuanTableTestHelper = require('../../../../tests/AddApkPemberitahuanTableTestHelper');
const AddDataApkTableTestHelper = require('../../../../tests/AddDataApkTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AddApk = require('../../../Domains/apks/entities/AddApk');
const AddeventApk = require('../../../Domains/apks/entities/AddeventApk');
const AddPemberitahuanApk = require('../../../Domains/apks/entities/AddPemberitahuanApk');
const pool = require('../../database/postgres/pool');
const ApkDataRepositoryPostgres = require('../ApkDataRepositoryPostgres');


describe('ApkRepositoryPostgres', () => {
  afterEach(async () => {
    await AddApkEventTableTestHelper.cleanTable();
    await AddApkPemberitahuanTableTestHelper.cleanTable();
    await AddDataApkTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('add data in apk data settings', () => {
    it('should persist add data settings and return success', async () => {
      //arrange
      const addApk = new AddApk({
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
      });
      const fakeIdGenerator = () => '123'; // stub!

      const apkDataRepositoryPostgres = new ApkDataRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await apkDataRepositoryPostgres.datasettings(addApk);
      // Assert
      const datasettings = await AddDataApkTableTestHelper.findVersion('1.0.1');
      expect(datasettings).toHaveLength(1);
    });

    it('should return 201 add apk correctly', async () => {
      //arrange
      const addApk = new AddApk({
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
      });
      const fakeIdGenerator = () => '123'; // stub!

      const apkDataRepositoryPostgres = new ApkDataRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      const data = await apkDataRepositoryPostgres.datasettings(addApk);
      // Assert
      expect(data).toStrictEqual('apk123');
    });



    it('should persist add event apk data and success', async () => {
      const addeventApk = new AddeventApk({
        icongif: 'http://icongif.home',
        posisi: '1',
        switchs: true,
        bannerurl: 'http://update.home',
        linkevent: 'http://peraturan.home',
      });
      const apkDataRepositoryPostgres = new ApkDataRepositoryPostgres(pool);

      // Action
      const idevent = await apkDataRepositoryPostgres.events(addeventApk);
      // Assert
      const dataevent = await AddApkEventTableTestHelper.findeventbyid(idevent);
      expect(dataevent).toHaveLength(1);
    });

    it('should persist add pemberitahuan apk data and success', async () => {
      const addPemberitahuanApk = new AddPemberitahuanApk({
        title: 'fake title',
        content: 'ini ada content pemberitahuan',
      });
      const apkDataRepositoryPostgres = new ApkDataRepositoryPostgres(pool);

      // Action
      const idnotice = await apkDataRepositoryPostgres.pemberitahuans(addPemberitahuanApk);
      // Assert
      const dataevent = await AddApkPemberitahuanTableTestHelper.findnoticebyid(idnotice);
      expect(dataevent).toHaveLength(1);
    });
  });

  describe('get Data Apk', () => {
    it('should get Data apk data and success', async () => {
      const params = {
        apkid: 'apk1234'
      }
      await AddDataApkTableTestHelper.addapk({ apkid: 'apk1234', created_at: '2024-02-24T15:25:51.326Z' });
      await AddApkEventTableTestHelper.addevent({ apkid: 'apk1234', created_at: '2024-02-24T15:25:51.326Z' });
      await AddApkPemberitahuanTableTestHelper.addnotice({ apkid: 'apk1234', created_at: '2024-02-24T15:25:51.326Z' });

      const apkDataRepository = new ApkDataRepositoryPostgres(pool, {});

      const { idapk, ...getDataApk } = await apkDataRepository.getapkdata(params.apkid);
      const getNotice = await apkDataRepository.getapknotice(params.apkid);
      const { idevent, ...getEvent } = await apkDataRepository.getapkevent(params.apkid);

      const mergedData = {
        ...getDataApk,
        ...getEvent,
        ...getNotice
      };
      expect(mergedData).toStrictEqual({
        apkid: 'apk1234',
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
        icongif: 'http://icongif.home',
        posisi: '1',
        switchs: true,
        bannerurl: 'http://update.home',
        linkevent: 'http://peraturan.home',
        title: 'fake title',
        content: 'ini ada content pemberitahuan',
        created_at: '2024-02-24T15:25:51.326Z',
        updated_at: null
      });

    });
  });
});


