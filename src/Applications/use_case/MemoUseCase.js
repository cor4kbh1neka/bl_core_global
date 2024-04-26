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
        await this._cacheService.delete(`memo:memo`);
        return data;
    }

    async getmemodt() {
        try {
            const result = await this._cacheService.get(`memo:memo`);
            const datamemo = JSON.parse(result);
            return datamemo;
        } catch (error) {
            const dtmemo = await this._memoRepository.getmemo();
            await this._cacheService.delete(`memo:memo`);
            await this._cacheService.set(`memo:memo`, JSON.stringify(dtmemo));
            return dtmemo;

        }
    }

    async delmemodata(params) {
        await this._memoRepository.findmemo(params.idmemo);
        const data = await this._memoRepository.deletememo(params.idmemo)
        await this._cacheService.delete(`memo:memo`);
        return data;
    }
}
module.exports = MemoUseCase;