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
}
module.exports = MemoUseCase;