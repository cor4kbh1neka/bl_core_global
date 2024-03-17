const InvariantError = require('../../Commons/exceptions/InvariantError');
const ApkRepository = require('../../Domains/apks/ApkRepository');



class ApkDataRepositoryPostgres extends ApkRepository {
    constructor(pool, idGenerator) {
        super();
        this._pool = pool;
        this._idGenerator = idGenerator;

    }

    async datasettings(dataapks) {
        const { version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi } = dataapks;
        const apkid = `apk${this._idGenerator()}`;


        const created_at = new Date().toISOString();
        const query = {
            text: 'INSERT INTO dataapksettings (apkid ,version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi, created_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8 , $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19 , $20) RETURNING apkid',
            values: [apkid, version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi, created_at],
        };
        const data = await this._pool.query(query);
        return data.rows[0].apkid;
    }

    async events(dataapks, apkid) {
        const { icongif, posisi, switchs, bannerurl, linkevent } = dataapks;
        const created_at = new Date().toISOString();
        const query = {
            text: 'INSERT INTO dataapkevent (apkid,icongif, posisi, switchs, bannerurl, linkevent, created_at) VALUES($1, $2, $3, $4, $5, $6,$7) RETURNING idevent',
            values: [apkid, icongif, posisi, switchs, bannerurl, linkevent, created_at],
        };

        const data = await this._pool.query(query);
        return data.rows[0].idevent;

    }

    async pemberitahuans(dataapks, apkid) {
        const { title, content } = dataapks;
        const created_at = new Date().toISOString();
        const query = {
            text: 'INSERT INTO dataapknotice (apkid,title, content, created_at) VALUES($1, $2, $3,$4) RETURNING idnotice',
            values: [apkid, title, content, created_at],
        };
        const data = await this._pool.query(query);
        return data.rows[0].idnotice;


    }
}

module.exports = ApkDataRepositoryPostgres;