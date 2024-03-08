const InvariantError = require('../../Commons/exceptions/InvariantError');
const RegisteredUser = require('../../Domains/users/entities/RegisteredUser');
const RegisteredUserLog = require('../../Domains/users/entities/RegisteredUserLog');
const UserRepository = require('../../Domains/users/UserRepository');

class UserRepositoryPostgres extends UserRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;
    }

    async verifyAvailableUsername(registerUser) {
        const { xyusernamexxy, xxybanknumberxy, xyx11xuser_mailxxyy } = registerUser;
        // const query = {
        //     text: 'SELECT xyusernamexxy FROM users WHERE xyusernamexxy = $1',
        //     values: [username],
        // };

        const query = {
            text: 'SELECT xyusernamexxy, xxybanknumberxy, xyx11xuser_mailxxyy FROM users WHERE xyusernamexxy = $1 OR xxybanknumberxy = $2 OR xyx11xuser_mailxxyy = $3',
            values: [xyusernamexxy, xxybanknumberxy, xyx11xuser_mailxxyy],
        };

        const result = await this._pool.query(query);
        if (result.rowCount != 0) {
            throw new InvariantError('Register fail, your data already in our database !');
        }
    }

    async addUser(registerUser) {
        try {
            const { xyusernamexxy, xybanknamexyy, xybankuserxy, xxybanknumberxy, xyx11xuser_mailxxyy, xynumbphonexyyy } = registerUser;
            const xyuseridxy = `user${this._idGenerator()}`;
            const created_at = new Date().toISOString();
            const query = {
                text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING xyuseridxy, xyusernamexxy',
                values: [xyuseridxy, xyusernamexxy, xybanknamexyy, xybankuserxy, xxybanknumberxy, xyx11xuser_mailxxyy, xynumbphonexyyy, created_at],
            };

            const result = await this._pool.query(query);
            return new RegisteredUser({ ...result.rows[0] });
        } catch (err) {
            console.error(err.message);

        }
    }

    async addLogBase(registerUser) {
        try {
            const { xyuseridxy, password, xyusernamexxy } = registerUser;
            const username = xyusernamexxy;
            const id_logbase = `idlog${this._idGenerator()}`;
            const query = {
                text: 'INSERT INTO logbasxxyte VALUES($1, $2, $3, $4) RETURNING xyuseridxy, username',
                values: [id_logbase, xyuseridxy, username, password],
            };

            const result = await this._pool.query(query);
            return new RegisteredUserLog({ ...result.rows[0] });
        } catch (err) {
            console.error(err.message);

        }
    }

    async addEventUser(registerUser) {
        const xyuseridxy = registerUser;
        const id_event = `idev${this._idGenerator()}`;
        const query = {
            text: 'INSERT INTO events VALUES($1, $2)',
            values: [id_event, xyuseridxy],
        };

        await this._pool.query(query);
    }

    async addReffUser(registerUser) {
        const xyuseridxy = registerUser;
        const reffs_id = `idev${this._idGenerator()}`;
        const query = {
            text: 'INSERT INTO reffs VALUES($1, $2)',
            values: [reffs_id, xyuseridxy],
        };

        await this._pool.query(query);
    }


    // async getPasswordByUsername(username) {
    //     const query = {
    //         text: 'SELECT password FROM users WHERE username = $1',
    //         values: [username],
    //     };

    //     const result = await this._pool.query(query);

    //     if (!result.rowCount) {
    //         throw new InvariantError('username tidak ditemukan');
    //     }

    //     return result.rows[0].password;
    // }

    // async getIdByUsername(username) {
    //     const query = {
    //         text: 'SELECT id FROM users WHERE username = $1',
    //         values: [username],
    //     };

    //     const result = await this._pool.query(query);

    //     if (!result.rowCount) {
    //         throw new InvariantError('user tidak ditemukan');
    //     }

    //     const { id } = result.rows[0];

    //     return id;
    // }
}

module.exports = UserRepositoryPostgres;
