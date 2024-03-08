const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const UserRepository = require('../../../Domains/users/UserRepository');
const PasswordHash = require('../../security/PasswordHash');
const AddUserUseCase = require('../AddUserUseCase');

describe('UserRepository', () => {
    /**
     * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
     */

    it('should orchestracing the add user action correctly', async () => {

        const useCasePayload = {

            xyusernamexxy: 'fakeuser',
            password: 'secret',
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            xyx11xuser_mailxxyy: 'user@gmail.com',
            xynumbphonexyyy: '58469874451',
        };
        const mockRegisteredUser = new RegisteredUser({
            id_logbase: 'baseid123',
            xyuseridxy: 'user123',
            xyusernamexxy: useCasePayload.xyusernamexxy,
        });


        /** creating dependency of use case */
        const mockUserRepository = new UserRepository();
        const mockPasswordHash = new PasswordHash();

        /** mocking needed function */
        mockUserRepository.verifyAvailableUsername = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockPasswordHash.hash = jest.fn()
            .mockImplementation(() => Promise.resolve('secret'));
        mockUserRepository.addUser = jest.fn()
            .mockImplementation(() => Promise.resolve(mockRegisteredUser));

        const getUserUseCase = new AddUserUseCase({
            userRepository: mockUserRepository,
            passwordHash: mockPasswordHash,
        });


        // Action
        const registeredUser = await getUserUseCase.execute(useCasePayload);

        expect(registeredUser).toStrictEqual(new RegisteredUser({
            id_logbase: 'baseid123',
            xyuseridxy: 'user123',
            xyusernamexxy: useCasePayload.xyusernamexxy,
        }));
        expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload.username);
        expect(mockPasswordHash.hash).toBeCalledWith(useCasePayload.password);
        expect(mockUserRepository.addUser).toBeCalledWith(new RegisterUser({
            xyusernamexxy: useCasePayload.xyusernamexxy,
            password: 'secret',
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            xyx11xuser_mailxxyy: 'user@gmail.com',
            xynumbphonexyyy: '58469874451',
        }));
    });

});