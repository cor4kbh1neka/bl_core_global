const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const UsersLogTableTestHelper = require('../../../../tests/UsersLogTableTestHelper');
const UsersEventTableTestHelper = require('../../../../tests/UsersEventTableTestHelper');
const UsersReffsTableTestHelper = require('../../../../tests/UsersReffsTableTestHelper');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const RegisterUserLog = require('../../../Domains/users/entities/RegisterUserLog');
const RegisteredUser = require('../../../Domains/users/entities/RegisteredUser');
const pool = require('../../database/postgres/pool');
const UserRepositoryPostgres = require('../UserRepositoryPostgres');

describe('UserRepositoryPostgres', () => {
    afterEach(async () => {
        await UsersTableTestHelper.cleanTable();
        await UsersLogTableTestHelper.cleanTable();
        await UsersEventTableTestHelper.cleanTable();
        await UsersReffsTableTestHelper.cleanTable();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('verifyAvailableUsername function', () => {
        it('should throw InvariantError when username not available', async () => {
            const registerUser = {
                xyusernamexxy: 'fakeuser',
                xxybanknumberxy: '12345678',
                xyx11xuser_mailxxyy: 'user@gmail.com',
            };

            // Arrange
            await UsersTableTestHelper.addUser({ xyusernamexxy: 'fakeuser' }); // memasukan user baru dengan username dicoding
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

            // Action & Assert
            await expect(userRepositoryPostgres.verifyAvailableUsername(registerUser)).rejects.toThrowError(InvariantError);
        });

        it('should not throw InvariantError when username available', async () => {
            // Arrange
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

            // Action & Assert
            await expect(userRepositoryPostgres.verifyAvailableUsername('usertest2')).resolves.not.toThrowError(InvariantError);
        });
    });

    describe('addUser function', () => {
        it('should persist register user and return registered user correctly', async () => {
            // Arrange
            const registerUser = new RegisterUser({
                xyusernamexxy: 'fakeuser',
                password: 'secret',
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345678',
                xyx11xuser_mailxxyy: 'user@gmail.com',
                xynumbphonexyyy: '58469874451',
            });
            const fakeIdGenerator = () => '123'; // stub!
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            await userRepositoryPostgres.addUser(registerUser);

            // Assert
            const users = await UsersTableTestHelper.findUsersById('user123');
            expect(users).toHaveLength(1);
        });

        it('should return registered user correctly', async () => {
            // Arrange
            const registerUser = new RegisterUser({
                xyusernamexxy: 'fakeuser',
                password: 'secret',
                xybanknamexyy: 'abc',
                xybankuserxy: 'fake name',
                xxybanknumberxy: '12345678',
                xyx11xuser_mailxxyy: 'user@gmail.com',
                xynumbphonexyyy: '58469874451',
            });
            const fakeIdGenerator = () => '123'; // stub!
            const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

            // Action
            const registeredUser = await userRepositoryPostgres.addUser(registerUser);

            // Assert
            expect(registeredUser).toStrictEqual(new RegisteredUser({
                xyuseridxy: 'user123',
                xyusernamexxy: 'fakeuser',
            }));
        });

        describe('add userevent ', () => {
            it('should persist userevent user and return registered user correctly', async () => {
                const registerUserLog = 'user123';
                const fakeIdGenerator = () => '123'; // stub!
                const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

                // Action
                await userRepositoryPostgres.addEventUser(registerUserLog);

                // Assert
                const users = await UsersEventTableTestHelper.findUsersByIdevent('user123');
                expect(users).toHaveLength(1);
            });

        });



        describe('add userreffs ', () => {
            it('should persist userreffs user and return registered user correctly', async () => {
                const registerUserLog = 'user123';
                const fakeIdGenerator = () => '123'; // stub!
                const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

                // Action
                await userRepositoryPostgres.addReffUser(registerUserLog);

                // Assert
                const users = await UsersReffsTableTestHelper.findUsersByIdreffs('user123');
                expect(users).toHaveLength(1);
            });

        });



        describe('add userlogbase ', () => {
            it('should persist logbase user and return registered user correctly', async () => {
                const registerUserLog = new RegisterUserLog({
                    xyuseridxy: 'user123',
                    xyusernamexxy: 'fakeuser',
                    password: 'secret',
                });
                const fakeIdGenerator = () => '123'; // stub!
                const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

                // Action
                await userRepositoryPostgres.addLogBase(registerUserLog);

                // Assert
                const users = await UsersLogTableTestHelper.findUsersByIdlogbase('user123');
                expect(users).toHaveLength(1);
            });

        });
    });

    //   describe('getPasswordByUsername', () => {
    //     it('should throw InvariantError when user not found', () => {
    //       // Arrange
    //       const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

    //       // Action & Assert
    //       return expect(userRepositoryPostgres.getPasswordByUsername('dicoding'))
    //         .rejects
    //         .toThrowError(InvariantError);
    //     });

    //     it('should return username password when user is found', async () => {
    //       // Arrange
    //       const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});
    //       await UsersTableTestHelper.addUser({
    //         username: 'dicoding',
    //         password: 'secret_password',
    //       });

    //       // Action & Assert
    //       const password = await userRepositoryPostgres.getPasswordByUsername('dicoding');
    //       expect(password).toBe('secret_password');
    //     });
    //   });

    //   describe('getIdByUsername', () => {
    //     it('should throw InvariantError when user not found', async () => {
    //       // Arrange
    //       const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

    //       // Action & Assert
    //       await expect(userRepositoryPostgres.getIdByUsername('dicoding'))
    //         .rejects
    //         .toThrowError(InvariantError);
    //     });

    //     it('should return user id correctly', async () => {
    //       // Arrange
    //       await UsersTableTestHelper.addUser({ id: 'user-321', username: 'dicoding' });
    //       const userRepositoryPostgres = new UserRepositoryPostgres(pool, {});

    //       // Action
    //       const userId = await userRepositoryPostgres.getIdByUsername('dicoding');

    //       // Assert
    //       expect(userId).toEqual('user-321');
    //     });
    // });
});