class VerifyUserAuthUseCase {
  constructor({ authenticationTokenManager, userRepository }) {
    this._authenticationTokenManager = authenticationTokenManager;
    this._userRepository = userRepository;
  }

  async execute(refreshToken) {
    this._verifyPayload(refreshToken);
    const datauid = await this._authenticationTokenManager.decodePayload(refreshToken);
    const datauidit = await this._userRepository.getDataBankByUsername(datauid.username);

    const combinedData = {
      ...datauid,
      ...datauidit
    };
    return combinedData;
  }

  _verifyPayload(refreshToken) {
    if (!refreshToken || refreshToken === undefined || refreshToken == null || refreshToken == '' || typeof refreshToken !== 'string') {
      throw new Error('REFRESH_VERIFY_OWNER_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
    }
  }
}

module.exports = VerifyUserAuthUseCase;
