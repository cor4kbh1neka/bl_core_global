const UserRepository = require('../../../Domains/users/UserRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const VerifyUserAuthUseCase = require('../VerifyUserAuthUseCase');

describe('RefreshAuthenticationUseCase', () => {
  it('should throw error if use case payload not contain refresh token', async () => {
    // Arrange
    const useCasePayload = '';
    const refreshAuthenticationUseCase = new VerifyUserAuthUseCase({});

    // Action & Assert
    await expect(refreshAuthenticationUseCase.execute(useCasePayload))
      .rejects
      .toThrowError('REFRESH_VERIFY_OWNER_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN');
  });


  it('should orchestrating the refresh authentication action correctly', async () => {
    // Arrange
    const useCasePayload = 'some_refresh_token';
    const datauid = { username: 'dicoding', id: 'user-123', iat: '1710139445' };

    const resultuid = {
      username: 'dicoding',
      id: 'user-123',
      iat: '1710139445',
      bank: 'bca',
      nama_rek: 'jaya kuku',
      norek: '777777747474',
      group: 'groupbank1',
      groupwd: 'groupbankwd1'
    };

    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockUserRepository = new UserRepository();
    // Mocking

    mockAuthenticationTokenManager.decodePayload = jest.fn()
      .mockImplementation(() => Promise.resolve({ username: 'dicoding', id: 'user-123', iat: '1710139445' }));
    mockUserRepository.getDataBankByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve({ bank: 'bca', nama_rek: 'jaya kuku', norek: '777777747474', group: 'groupbank1', groupwd: 'groupbankwd1' }));

    // Create the use case instace
    const refreshAuthenticationUseCase = new VerifyUserAuthUseCase({
      authenticationTokenManager: mockAuthenticationTokenManager,
      userRepository: mockUserRepository,
    });

    // Action
    const payload = await refreshAuthenticationUseCase.execute(useCasePayload);
    // Assert

    expect(mockAuthenticationTokenManager.decodePayload)
      .toBeCalledWith(useCasePayload);
    expect(mockUserRepository.getDataBankByUsername)
      .toBeCalledWith(datauid.username);

    expect(payload).toEqual(resultuid);
  });
});
