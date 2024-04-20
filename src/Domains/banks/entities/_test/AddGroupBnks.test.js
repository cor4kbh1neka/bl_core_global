const AddGroupBnks = require('../AddGroupBnks.js');


describe('entities for APK data', () => {


    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            grouptype: 1
        };

        expect(() => new AddGroupBnks(payload)).toThrowError('ADD_GROUP_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            namegroupxyzt: 123,
            grouptype: 1,

        };

        expect(() => new AddGroupBnks(payload)).toThrowError('ADD_GROUP_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should send an error when not data restrict given', () => {
        //arrange
        const payload = {
            namegroupxyzt: "restrict characters",
            grouptype: 1,

        };

        expect(() => new AddGroupBnks(payload)).toThrowError('ADD_GROUP_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
    });


    it('should add bank dp data Correctly', () => {
        //arrange
        const payload = {
            namegroupxyzt: 'groupbank1',
            grouptype: 1,
        };

        const { namegroupxyzt, grouptype } = new AddGroupBnks(payload);

        // Assert
        expect(namegroupxyzt).toEqual(payload.namegroupxyzt);
        expect(grouptype).toEqual(payload.grouptype);

    });
});