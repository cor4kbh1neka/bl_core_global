const AddApk = require('../../Domains/apks/entities/AddApk');
const AddeventApk = require('../../Domains/apks/entities/AddeventApk');
const AddPemberitahuanApk = require('../../Domains/apks/entities/AddPemberitahuanApk');


class AdddataApkUseCase {
    constructor({ apkRepository }) {
        this._apkRepository = apkRepository;
    }

    async execute(useCasePayload) {
        const dataapks = new AddApk(useCasePayload);
        const dataevent = new AddeventApk(useCasePayload);
        const dataPemberitahuans = new AddPemberitahuanApk(useCasePayload);
        const apkid = await this._apkRepository.datasettings(dataapks);
        this._apkRepository.events(dataevent, apkid);
        this._apkRepository.pemberitahuans(dataPemberitahuans, apkid);
        return 'success';
    }
}

module.exports = AdddataApkUseCase;