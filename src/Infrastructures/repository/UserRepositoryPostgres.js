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
        const { xyusernamexxy } = registerUser;

        // const query = {
        //     text: 'SELECT xyusernamexxy, xxybanknumberxy, xyx11xuser_mailxxyy FROM users WHERE xyusernamexxy = $1 OR xxybanknumberxy = $2 OR xyx11xuser_mailxxyy = $3',
        //     values: [xyusernamexxy, xxybanknumberxy, xyx11xuser_mailxxyy],
        // };
        const query = {
            text: 'SELECT xyusernamexxy FROM users WHERE xyusernamexxy = $1 ',
            values: [xyusernamexxy],
        };

        const result = await this._pool.query(query);
        if (result.rowCount != 0) {
            throw new InvariantError('Register fail, username already in our database !');
        }
    }

    async verifybankuser(registerUser) {
        const { xxybanknumberxy, xybanknamexyy } = registerUser;
        const query = {
            text: 'SELECT  xxybanknumberxy , xybanknamexyy FROM users WHERE xxybanknumberxy = $1 AND xybanknamexyy = $2',
            values: [xxybanknumberxy, xybanknamexyy],
        };

        const result = await this._pool.query(query);
        if (result.rowCount == 0) {
            // if (result.rows[0].xxybanknumberxy == xxybanknumberxy && result.rows[0].xybanknamexyy == xybanknamexyy) {
            // }
            return;
        } else {
            throw new InvariantError('Register fail, rekening number already in our database !');
        }
    }

    async addUser(registerUser) {
        const { xyusernamexxy, xybanknamexyy, xybankuserxy, xxybanknumberxy, xyx11xuser_mailxxyy, xynumbphonexyyy } = registerUser;
        const xyuseridxy = `user${this._idGenerator()}`;
        const created_at = new Date().toISOString();
        const query = {
            text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING xyuseridxy, xyusernamexxy',
            values: [xyuseridxy, xyusernamexxy, xybanknamexyy, xybankuserxy, xxybanknumberxy, xyx11xuser_mailxxyy, xynumbphonexyyy, created_at],
        };

        const result = await this._pool.query(query);
        return new RegisteredUser({ ...result.rows[0] });

    }

    async addLogBase(registerUser) {
        const { xyuseridxy, password, xyusernamexxy } = registerUser;
        const username = xyusernamexxy;
        const id_logbase = `idlog${this._idGenerator()}`;
        const query = {
            text: 'INSERT INTO logbasxxyte VALUES($1, $2, $3, $4) RETURNING xyuseridxy, username',
            values: [id_logbase, xyuseridxy, username, password],
        };

        const result = await this._pool.query(query);
        return new RegisteredUserLog({ ...result.rows[0] });
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


    async getPasswordByUsername(username) {
        const query = {
            text: 'SELECT password FROM logbasxxyte WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new InvariantError('username tidak ditemukan');
        }

        return result.rows[0].password;
    }

    async getIdByUsername(username) {
        const query = {
            text: 'SELECT xyuseridxy FROM logbasxxyte WHERE username = $1',
            values: [username],
        };

        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new InvariantError('user tidak ditemukan');
        }

        const { xyuseridxy } = result.rows[0];

        return xyuseridxy;
    }
}

module.exports = UserRepositoryPostgres;
