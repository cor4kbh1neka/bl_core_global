const RegisterUser = require('../../Domains/users/entities/RegisterUser');


class AddUserUseCase {
    constructor({ userRepository, passwordHash }) {
        this._userRepository = userRepository;
        this._passwordHash = passwordHash;
    }

    async execute(useCasePayload) {
        const registerUser = new RegisterUser(useCasePayload);
        await this._userRepository.verifyAvailableUsername(registerUser);
        await this._userRepository.verifybankuser(registerUser);
        const userlogbase = await this._userRepository.addUser(registerUser);
        this._userRepository.addEventUser(userlogbase.xyuseridxy);
        this._userRepository.addReffUser(userlogbase.xyuseridxy);
        userlogbase.password = await this._passwordHash.hash(registerUser.password);
        return this._userRepository.addLogBase(userlogbase);
    }
}

module.exports = AddUserUseCase;