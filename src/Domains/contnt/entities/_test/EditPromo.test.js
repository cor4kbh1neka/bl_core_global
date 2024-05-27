const EditPromo = require('../EditPromo');


describe('entities for content SOCMED', () => {

    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            ttlectprm: 'example title 2',
            trgturctprm: 'https://example.com',
            statusctprm: '1',
        };

        expect(() => new EditPromo(payload)).toThrowError('EDIT_PROMO.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            ctprmur: 'https://example.com/3',
            ttlectprm: 'example title 2',
            trgturctprm: 'https://example.com',
            statusctprm: 1,
        };

        expect(() => new EditPromo(payload)).toThrowError('EDIT_PROMO.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            ctprmur: 'https://example.com/3',
            ttlectprm: 'example title 2',
            trgturctprm: 'https://example.com',
            statusctprm: '1$%a',
        };

        expect(() => new EditPromo(payload)).toThrowError('EDIT_PROMO.CONTAIN_RESTRICTED_CHARACTER');
    });



    it('should edit data SOCMED Correctly', () => {
        //arrange
        const payload = {
            ctprmur: 'https://example.com/3',
            ttlectprm: 'example title 2',
            trgturctprm: 'https://example.com',
            statusctprm: '1',
        };


        const editPromo = new EditPromo(payload);

        // Assert
        expect(editPromo).toBeInstanceOf(EditPromo);
        expect(editPromo.ctprmur).toEqual(payload.ctprmur);
        expect(editPromo.ttlectprm).toEqual(payload.ttlectprm);
        expect(editPromo.trgturctprm).toEqual(payload.trgturctprm);
        expect(editPromo.statusctprm).toEqual(payload.statusctprm);


    });
});
