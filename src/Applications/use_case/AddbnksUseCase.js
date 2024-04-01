const AddBnksDp = require('../../Domains/banks/entities/AddBnksDp');


class AddbnksUseCase {
    constructor({ bnksRepository, cacheServices }) {
        this._bnksRepository = bnksRepository;
        this._cacheService = cacheServices;

    }

    async execute(useCasePayload) {

        const databks = new AddBnksDp(useCasePayload);

        await this._bnksRepository.checkbnks(databks.norekxyxy, databks.namegroupxyzt);
        const namegroup = await this._bnksRepository.databnksdp(databks);
        await this._cacheService.delete(`namegroup:${namegroup}`);
        return namegroup;
    }


    async getbanks(params) {
        try {
            // mendapatkan catatan dari cache
            const result = await this._cacheService.get(`namegroup:${params.groupname}`);
            const dataapk = JSON.parse(result);
            const data = {
                data: dataapk,
                headers: {
                    'X-Data-Source': 'cache',
                },
            };
            return data;
        } catch (error) {
            const getbankdata = await this._bnksRepository.getdatabnksdp(params.groupname);
            const databankarr = [];
            for (const key in getbankdata) {
                const { idbank, created_at, updated_at, ...bankdata } = getbankdata[key];
                databankarr.push({
                    ...bankdata
                });
            }
            const databank = {
                masterdata: databankarr,
            };
            // console.log('ini params apk id' + params.apkid);
            await this._cacheService.delete(`namegroup:${params.groupname}`);
            await this._cacheService.set(`namegroup:${params.groupname}`, JSON.stringify(databank));
            return databank;
        };
    }
}
module.exports = AddbnksUseCase;