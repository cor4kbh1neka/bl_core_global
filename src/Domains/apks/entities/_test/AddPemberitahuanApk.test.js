const AddPemberitahuanApk = require('../AddPemberitahuanApk.js');


describe('entities for APK get data', () => {

    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            content: 'ini ada content pemberitahuan',
        };

        expect(() => new AddPemberitahuanApk(payload)).toThrowError('ADD_PEMBERITAHUAN_APK.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            title: 123,
            content: 'ini ada content pemberitahuan',
        };

        expect(() => new AddPemberitahuanApk(payload)).toThrowError('ADD_PEMBERITAHUAN_APK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should send an error when length too much', () => {
        //arrange
        const payload = {
            title: 'ini ada content pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuan',
            content: 'fake title',

        };

        expect(() => new AddPemberitahuanApk(payload)).toThrowError('ADD_PEMBERITAHUAN_APK.PEMBERITAHUAN_TITLE_LIMIT_CHAR');
    });

    it('should send an error when length too much', () => {
        //arrange
        const payload = {
            title: 'fake title',
            content: 'ini ada content pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuanontent pemberitahuan ',
        };

        expect(() => new AddPemberitahuanApk(payload)).toThrowError('ADD_PEMBERITAHUAN_APK.PEMBERITAHUAN_CONTENT_LIMIT_CHAR');
    });


    it('should add Apk data Correctly', () => {
        //arrange
        const payload = {
            title: 'fake title',
            content: 'ini ada content pemberitahuan',
        };

        const { title, content } = new AddPemberitahuanApk(payload);

        // Assert
        expect(title).toEqual(payload.title);
        expect(content).toEqual(payload.content);
    });
});