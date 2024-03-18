const AdddataApkUseCase = require('../../../../Applications/use_case/AdddataApkUseCase');
const GetDataApkUseCase = require('../../../../Applications/use_case/GetDataApkUseCase');

class ApkHandler {
  constructor(container) {
    this._container = container;
    this.postApkHandler = this.postApkHandler.bind(this);
    this.getApkHandler = this.getApkHandler.bind(this);
  }

  async postApkHandler(request, h) {
    const addApkUseCase = this._container.getInstance(AdddataApkUseCase.name);
    const dataid = await addApkUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        dataid// Mengubah objek thread menjadi array dengan satu elemen
      },
    });
    response.code(201);
    return response;
  }
  async getApkHandler(request, h) {
    const getDataApkUseCase = this._container.getInstance(GetDataApkUseCase.name);
    const dataapk = await getDataApkUseCase.execute(request.params);
    const response = h.response({
      status: 'success',
      data: {
        dataapk// Mengubah objek thread menjadi array dengan satu elemen
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = ApkHandler;
