const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisterUserLog = require('../../../Domains/users/entities/RegisterUserLog');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const RegisteredUserLog = require('../../../Domains/users/entities/RegisteredUserLog');
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
            xyuseridxy: 'user123',
            xyusernamexxy: useCasePayload.xyusernamexxy,
        });
        const mockRegisteredLogbase = new RegisteredUserLog({
            xyuseridxy: mockRegisteredUser.xyuseridxy,
            username: useCasePayload.xyusernamexxy,
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
        mockUserRepository.addEventUser = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockUserRepository.addReffUser = jest.fn()
            .mockImplementation(() => Promise.resolve());
        mockUserRepository.addLogBase = jest.fn()
            .mockImplementation(() => Promise.resolve(mockRegisteredLogbase));


        const getUserUseCase = new AddUserUseCase({
            userRepository: mockUserRepository,
            passwordHash: mockPasswordHash,
        });


        // Action
        const registeredUserLog = await getUserUseCase.execute(useCasePayload);

        expect(registeredUserLog).toStrictEqual(new RegisteredUserLog({
            xyuseridxy: 'user123',
            username: useCasePayload.xyusernamexxy,
        }));
        expect(mockUserRepository.verifyAvailableUsername).toBeCalledWith(useCasePayload);

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

        expect(mockUserRepository.addEventUser).toBeCalledWith('user123'
        );


        expect(mockUserRepository.addReffUser).toBeCalledWith('user123');


        expect(mockUserRepository.addLogBase).toBeCalledWith(new RegisterUserLog({
            xyuseridxy: 'user123',
            xyusernamexxy: 'fakeuser',
            password: 'secret',
        }));
    });

});