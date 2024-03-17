const AdddataApkUseCase = require('../../../../Applications/use_case/AdddataApkUseCase');

class ApkHandler {
  constructor(container) {
    this._container = container;

    this.postApkHandler = this.postApkHandler.bind(this);
  }

  async postApkHandler(request, h) {
    const addApkUseCase = this._container.getInstance(AdddataApkUseCase.name);
    await addApkUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
    });
    response.code(201);
    return response;
  }
}

module.exports = ApkHandler;
