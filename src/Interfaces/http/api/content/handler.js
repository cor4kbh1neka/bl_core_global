const ContentUseCase = require('../../../../Applications/use_case/ContentUseCase');

class ContentHandler {
  constructor(container) {
    this._container = container;
    this.putcontentMtTagHandler = this.putcontentMtTagHandler.bind(this);
    this.getcontentMtTagHandler = this.getcontentMtTagHandler.bind(this);
    this.postcontentSiteMapTagHandler = this.postcontentSiteMapTagHandler.bind(this);
    this.putcontentSiteMapTagHandler = this.putcontentSiteMapTagHandler.bind(this);
    this.getcontentSiteMapTagHandler = this.getcontentSiteMapTagHandler.bind(this);
    this.delcontentSiteMapTagHandler = this.delcontentSiteMapTagHandler.bind(this);
    this.putctGeneralTagHandler = this.putctGeneralTagHandler.bind(this);
    this.getctGeneralTagHandler = this.getctGeneralTagHandler.bind(this);
    this.putctSliderTagHandler = this.putctSliderTagHandler.bind(this);
    this.getctSliderTagHandler = this.getctSliderTagHandler.bind(this);
  }

  async putcontentMtTagHandler(request, h) {
    const editmttagcontentUseCase = this._container.getInstance(ContentUseCase.name);
    const dataid = await editmttagcontentUseCase.editmttag(request.payload, request.params);

    const response = h.response({
      status: 'success',
      data: dataid
    });
    response.code(200);
    return response;
  }
  async getcontentMtTagHandler(request, h) {
    const getmtcontentUseCase = this._container.getInstance(ContentUseCase.name);
    const datameta = await getmtcontentUseCase.getmttag();
    const response = h.response({
      status: 'success',
      data: datameta
    });
    response.code(200);
    return response;
  }
  async postcontentSiteMapTagHandler(request, h) {
    const postsitempcontentUseCase = this._container.getInstance(ContentUseCase.name);
    const datasitemap = await postsitempcontentUseCase.addstmp(request.payload);

    const response = h.response({
      status: 'success',
      data: datasitemap
    });
    response.code(200);
    return response;
  }
  async putcontentSiteMapTagHandler(request, h) {
    const putmttagcontentUseCase = this._container.getInstance(ContentUseCase.name);
    const datasitemap = await putmttagcontentUseCase.editstmpusecase(request.payload, request.params);

    const response = h.response({
      status: 'success',
      data: datasitemap
    });
    response.code(200);
    return response;
  }

  async getcontentSiteMapTagHandler(request, h) {
    const putmttagcontentUseCase = this._container.getInstance(ContentUseCase.name);
    const datameta = await putmttagcontentUseCase.getstmp();
    const response = h.response({
      status: 'success',
      data: datameta
    });
    response.code(200);
    return response;
  }
  async delcontentSiteMapTagHandler(request, h) {
    const delcontentSiteMapTagHandler = this._container.getInstance(ContentUseCase.name);
    const datameta = await delcontentSiteMapTagHandler.delstmp(request.payload);
    const response = h.response({
      status: 'success',
      data: datameta
    });
    response.code(200);
    return response;
  }

  async putctGeneralTagHandler(request, h) {
    const putctGeneralTagHandler = this._container.getInstance(ContentUseCase.name);
    const datactGeneral = await putctGeneralTagHandler.editgeneral(request.payload, request.params);
    const response = h.response({
      status: 'success',
      data: datactGeneral
    });
    response.code(200);
    return response;
  }
  async getctGeneralTagHandler(request, h) {
    const getctGeneralTagHandler = this._container.getInstance(ContentUseCase.name);
    const datactGeneral = await getctGeneralTagHandler.getgeneral();
    const response = h.response({
      status: 'success',
      data: datactGeneral
    });
    response.code(200);
    return response;
  }

  async putctSliderTagHandler(request, h) {
    const putctSliderTagHandler = this._container.getInstance(ContentUseCase.name);
    const dataslider = await putctSliderTagHandler.editslider(request.payload, request.params);
    const response = h.response({
      status: 'success',
      data: dataslider
    });
    response.code(200);
    return response;
  }
  async getctSliderTagHandler(request, h) {
    const getctSliderTagHandler = this._container.getInstance(ContentUseCase.name);
    const getslider = await getctSliderTagHandler.getslider();
    const response = h.response({
      status: 'success',
      data: getslider
    });
    response.code(200);
    return response;
  }
}

module.exports = ContentHandler;
