const GetDataApk = require('../../Domains/apks/entities/GetDataApk');



class GetDataApkUseCase {
    constructor({ apkRepository }) {
        this._apkRepository = apkRepository;
    }

    async execute(params) {

        const { idapk, ...getDataApk } = await this._apkRepository.getapkdata(params.apkid);
        const { apkid, ...getEvent } = await this._apkRepository.getapkevent(params.apkid);
        const getNotice = await this._apkRepository.getapknotice(params.apkid);

        const dataapkfull = {
            ...getDataApk,
            ...getEvent,
            ...getNotice
        };
        return dataapkfull;

    }
}

module.exports = GetDataApkUseCase;