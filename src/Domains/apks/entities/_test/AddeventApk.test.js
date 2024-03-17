const AddEventApk = require('../AddEventApk.js');


describe('entities for APK get data', () => {

    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            posisi: '1',
            switchs: true,
            bannerurl: 'http://update.home',
            linkevent: 'http://peraturan.home',
            created_at: 'http://klasemen.home',
        };

        expect(() => new AddEventApk(payload)).toThrowError('ADD_EVENT_APK.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            icongif: 123,
            posisi: '1',
            switchs: true,
            bannerurl: 'http://update.home',
            linkevent: 'http://peraturan.home',
        };

        expect(() => new AddEventApk(payload)).toThrowError('ADD_EVENT_APK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            icongif: 'http://icongif.home#',
            posisi: '1a',
            switchs: true,
            bannerurl: 'http://update.home',
            linkevent: 'http://peraturan.home',
        };

        expect(() => new AddEventApk(payload)).toThrowError('ADD_EVENT_APK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
    });
    it('should add Apk data Correctly', () => {
        //arrange
        const payload = {
            icongif: 'http://icongif.home#',
            posisi: '1',
            switchs: true,
            bannerurl: 'http://update.home',
            linkevent: 'http://peraturan.home',
        };

        const { icongif, posisi, bannerurl, linkevent, switchs } = new AddEventApk(payload);

        // Assert
        expect(icongif).toEqual(payload.icongif);
        expect(posisi).toEqual(payload.posisi);
        expect(bannerurl).toEqual(payload.bannerurl);
        expect(linkevent).toEqual(payload.linkevent);
        expect(switchs).toEqual(payload.switchs);
    });
});