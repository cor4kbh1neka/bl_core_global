class AddGroupBnks {
    constructor(payload) {
        this._verifyPayload(payload);

        const { namegroupxyzt, grouptype } = payload;

        this.namegroupxyzt = namegroupxyzt;
        this.grouptype = grouptype;
    }

    _verifyPayload({ namegroupxyzt, grouptype }) {
        if (!namegroupxyzt || !grouptype) {
            throw new Error('ADD_GROUP_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof namegroupxyzt !== 'string' || typeof grouptype !== 'boolean') {
            throw new Error('ADD_GROUP_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }


        if (!namegroupxyzt.match(/^[a-zA-Z0-9]+$/)) {
            throw new Error('ADD_GROUP_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = AddGroupBnks;
