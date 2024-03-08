class RegisteredUser {
    constructor(payload) {
        this._verifyPayload(payload);

        const { id_logbase, xyuseridxy, xyusernamexxy } = payload;

        this.id_logbase = id_logbase;
        this.xyuseridxy = xyuseridxy;
        this.xyusernamexxy = xyusernamexxy;
    }

    _verifyPayload({ id_logbase, xyuseridxy, xyusernamexxy }) {
        if (!id_logbase || !xyuseridxy || !xyusernamexxy) {
            throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof id_logbase !== 'string' || typeof xyuseridxy !== 'string' || typeof xyusernamexxy !== 'string') {
            throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = RegisteredUser;
