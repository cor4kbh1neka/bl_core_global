const AddUserUseCase = require('../../../../Applications/use_case/AddUserUseCase');

class UsersHandler {
  constructor(container) {
    this._container = container;
    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserHandler = this.getUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }

  async getUserHandler(request, h) {
    const getDataUsecase = this._container.getInstance(AddUserUseCase.name);
    const datauser = await getDataUsecase.getdatabyu(request.params);

    const response = h.response({
      status: 'success',
      data: {
        datauser,
      },
    });
    response.code(200);
    return response;
  }
}

module.exports = UsersHandler;
