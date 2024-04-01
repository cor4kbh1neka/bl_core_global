const AddbnksUseCase = require('../../../../Applications/use_case/AddbnksUseCase');
// const GetDataApkUseCase = require('../../../../Applications/use_case/GetDataApkUseCase');

class BnksHandler {
  constructor(container) {
    this._container = container;
    this.postBanksHandler = this.postBanksHandler.bind(this);
    this.getBanksHandler = this.getBanksHandler.bind(this);
    // this.postApkNoticeHandler = this.postApkNoticeHandler.bind(this);
    // this.getApkHandler = this.getApkHandler.bind(this);
  }

  async postBanksHandler(request, h) {
    const addBanksUsecase = this._container.getInstance(AddbnksUseCase.name);
    const groupbnks = await addBanksUsecase.execute(request.payload);
    const response = h.response({
      status: 'success',
      data: groupbnks
    });
    response.code(201);
    return response;
  }

  async getBanksHandler(request, h) {
    const addBanksUsecase = this._container.getInstance(AddbnksUseCase.name);
    const databank = await addBanksUsecase.getbanks(request.params);
    const response = h.response({
      status: 'success',
      data: {
        databank// Mengubah objek thread menjadi array dengan satu elemen
      },
    });
    response.code(200);
    return response;
  }

  // async postApkNoticeHandler(request, h) {
  //   const addApkUseCase = this._container.getInstance(AdddataApkUseCase.name);
  //   const dataid = await addApkUseCase.executenotice(request.payload);

  //   const response = h.response({
  //     status: 'success',
  //     data: {
  //       dataid// Mengubah objek thread menjadi array dengan satu elemen
  //     },
  //   });
  //   response.code(201);
  //   return response;
  // }
  // async getApkHandler(request, h) {
  //   const getDataApkUseCase = this._container.getInstance(GetDataApkUseCase.name);
  //   const dataapk = await getDataApkUseCase.execute(request.params);
  //   const response = h.response({
  //     status: 'success',
  //     data: dataapk.data
  //   });
  //   response.code(200);
  //   return response;
  // }
}

module.exports = BnksHandler;
