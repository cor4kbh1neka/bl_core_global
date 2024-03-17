const InvariantError = require('../../Commons/exceptions/InvariantError');
const ApkRepository = require('../../Domains/apks/ApkRepository');



class ApkDataRepositoryPostgres extends ApkRepository {
    constructor(pool) {
        super();
        this._pool = pool;
    }

    async datasettings(dataapks) {
        const { version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi } = dataapks;

        const created_at = new Date().toISOString();
        const query = {
            text: 'INSERT INTO dataapksettings (version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19 )',
            values: [version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi, created_at],
        };
        await this._pool.query(query);
    }

    async events(dataapks) {
        const { icongif, posisi, switchs, bannerurl, linkevent } = dataapks;
        const created_at = new Date().toISOString();
        const query = {
            text: 'INSERT INTO dataapkevent (icongif, posisi, switchs, bannerurl, linkevent, created_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING idevent',
            values: [icongif, posisi, switchs, bannerurl, linkevent, created_at],
        };

        const dataid = await this._pool.query(query);
        return dataid.rows[0];
    }

    async pemberitahuans(dataapks) {
        const { title, content } = dataapks;
        const created_at = new Date().toISOString();
        const query = {
            text: 'INSERT INTO dataapknotice (title, content, created_at) VALUES($1, $2, $3) RETURNING idnotice',
            values: [title, content, created_at],
        };
        const idnotice = await this._pool.query(query);
        return idnotice.rows[0];

    }
}

module.exports = ApkDataRepositoryPostgres;