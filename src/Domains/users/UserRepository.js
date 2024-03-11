class UserRepository {
    async addUser(registerUser) {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
    async addLogBase(registerUser) {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async addEventUser(registerUser) {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async addReffUser(registerUser) {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async verifyAvailableUsername(registerUser) {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
    async verifybankuser(registerUser) {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
    async verifydoublebankuser(registerUser) {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async getPasswordByUsername(username) {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }

    async getIdByUsername(username) {
        throw new Error('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    }
}

module.exports = UserRepository;
