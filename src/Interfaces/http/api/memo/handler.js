const MemoUseCase = require('../../../../Applications/use_case/MemoUseCase');
// const GetDataApkUseCase = require('../../../../Applications/use_case/GetDataApkUseCase');

class MemoHandler {
  constructor(container) {
    this._container = container;

    this.postMemo = this.postMemo.bind(this);


  }

  /**
 * @param {memo} untuk master bank 
 * harus add group dulu baru master
 */

  async postMemo(request, h) {
    const addMemoUsecase = this._container.getInstance(MemoUseCase.name);
    const successmemo = await addMemoUsecase.addmemomem(request.payload);
    const response = h.response({
      status: 'success',
      data: successmemo
    });
    response.code(201);
    return response;
  }

}

module.exports = MemoHandler;
