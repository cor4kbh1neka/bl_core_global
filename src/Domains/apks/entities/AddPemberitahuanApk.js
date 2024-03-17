class AddPemberitahuanApk {
    constructor(payload) {
        this._verifyPayload(payload);

        const { title, content } = payload;

        this.title = title;
        this.content = content;

    }

    _verifyPayload({ title, content }) {
        if (!title || !content) {
            throw new Error('ADD_PEMBERITAHUAN_APK.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof title !== 'string' || typeof content !== 'string') {
            throw new Error('ADD_PEMBERITAHUAN_APK.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (title.length > 100) {
            throw new Error('ADD_PEMBERITAHUAN_APK.PEMBERITAHUAN_TITLE_LIMIT_CHAR');
        }
        if (content.length > 200) {
            throw new Error('ADD_PEMBERITAHUAN_APK.PEMBERITAHUAN_CONTENT_LIMIT_CHAR');
        }


    }
}

module.exports = AddPemberitahuanApk;
