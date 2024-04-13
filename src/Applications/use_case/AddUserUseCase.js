const RegisterUser = require('../../Domains/users/entities/RegisterUser');
const UpdateDataUser = require('../../Domains/users/entities/UpdateDataUser');


class AddUserUseCase {
    constructor({ userRepository, passwordHash }) {
        this._userRepository = userRepository;
        this._passwordHash = passwordHash;
    }

    async execute(useCasePayload) {
        const registerUser = new RegisterUser(useCasePayload);
        await this._userRepository.verifydoublebankuser(registerUser);
        await this._userRepository.verifyAvailableUsername(registerUser);
        await this._userRepository.verifybankuser(registerUser);
        const userlogbase = await this._userRepository.addUser(registerUser);
        this._userRepository.addEventUser(userlogbase.xyuseridxy);
        this._userRepository.addReffUser(userlogbase.xyuseridxy);
        userlogbase.password = await this._passwordHash.hash(registerUser.password);
        return this._userRepository.addLogBase(userlogbase);
    }


    async getdatabyu(params) {
        const dataux = await this._userRepository.GetDataByUsername(params.xxuserxx);
        return dataux;
    }


    async UDataUser(useCasePayload, params) {
        const updatedData = new UpdateDataUser(useCasePayload);
        await this._userRepository.UDataUser(updatedData, params);
        return 'data berhasil di updated !';
    }
}

module.exports = AddUserUseCase;