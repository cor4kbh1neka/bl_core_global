// const AddBnksDp = require('../../Domains/banks/entities/AddBnksDp');
const AddMemo = require('../../Domains/memo/entities/AddMemo');


class MemoUseCase {
    constructor({ memoRepository, cacheServices }) {
        this._memoRepository = memoRepository;
        this._cacheService = cacheServices;
    }
    async addmemomem(useCasePayload) {
        const addmemo = new AddMemo(useCasePayload);
        const data = await this._memoRepository.addmemo(addmemo);
        await this._cacheService.delete(`ciamemo:memo`);
        return data;
    }

    async getmemodt() {
        try {
            const result = await this._cacheService.get(`ciamemo:memo`);
            const datamemo = JSON.parse(result);
            return datamemo;
        } catch (error) {
            const dtmemo = await this._memoRepository.getmemo();
            await this._cacheService.delete(`ciamemo:memo`);
            await this._cacheService.set(`ciamemo:memo`, JSON.stringify(dtmemo));
            return dtmemo;

        }
    }
    async getmemodtall(params) {
        try {
            const result = await this._cacheService.get(`ciamemoll:${params.statustype}`);
            const datamemo = JSON.parse(result);
            return datamemo;
        } catch (error) {
            const dtmemo = await this._memoRepository.getmemomem(params.statustype);
            await this._cacheService.delete(`ciamemoll:${params.statustype}`);
            await this._cacheService.set(`ciamemoll:${params.statustype}`, JSON.stringify(dtmemo));
            return dtmemo;

        }
    }

    async delmemodata(params) {
        await this._memoRepository.findmemo(params.idmemo);
        const data = await this._memoRepository.deletememo(params.idmemo)
        await this._cacheService.delete(`ciamemo:memo`);
        return data;
    }
}
module.exports = MemoUseCase;