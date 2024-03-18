const GetDataApk = require('../../../Domains/apks/entities/GetDataApk');
const ApkRepository = require('../../../Domains/apks/ApkRepository');
const GetDataApkUseCase = require('../GetDataApkUseCase');




describe('APK DATA RESERVER API POST GET DATA', () => {
    /**
     * membuat usecase untuk data apk 
     */

    it('should get data apk successfully', async () => {

        const params = {
            apkid: 'apk123'
        };

        const resultmocksettings =
        {
            apkid: 'apk123',
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
            apkid: 'apk123',
            icongif: 'http://icongif.home#',
            posisi: '1',
            switchs: true,
            bannerurl: 'http://update.home',
            linkevent: 'http://peraturan.home',
            apkid: 'apk123',
            title: 'fake title',
            content: 'ini ada content pemberitahuan',
            created_at: '2024-02-24T15:25:51.326Z',
            updated_at: '2024-02-24T15:25:51.326Z'
        };


        const mockDatasettings =
        {
            apkid: 'apk123',
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
            created_at: '2024-02-24T15:25:51.326Z',
            updated_at: '2024-02-24T15:25:51.326Z'
        };


        const mockdataevent = {
            apkid: 'apk123',
            icongif: 'http://icongif.home#',
            posisi: '1',
            switchs: true,
            bannerurl: 'http://update.home',
            linkevent: 'http://peraturan.home',
        };

        const mockdatapemberitahuan = {
            apkid: 'apk123',
            title: 'fake title',
            content: 'ini ada content pemberitahuan',
        };


        /** creating dependency of use case */
        const mockapkRepository = new ApkRepository();

        /** mocking needed function */
        mockapkRepository.getapkdata = jest.fn()
            .mockImplementation(() => Promise.resolve(mockDatasettings));
        mockapkRepository.getapkevent = jest.fn()
            .mockImplementation(() => Promise.resolve(mockdataevent));
        mockapkRepository.getapknotice = jest.fn()
            .mockImplementation(() => Promise.resolve(mockdatapemberitahuan));



        const getDataApkUseCase = new GetDataApkUseCase({
            apkRepository: mockapkRepository,
        });

        const dataapkusecase = await getDataApkUseCase.execute(params);

        expect(mockapkRepository.getapkdata).toBeCalledWith(params.apkid);
        expect(mockapkRepository.getapkdata).toBeCalledWith(params.apkid);
        expect(mockapkRepository.getapkdata).toBeCalledWith(params.apkid);
        expect(dataapkusecase).toEqual(resultmocksettings);
    });

});