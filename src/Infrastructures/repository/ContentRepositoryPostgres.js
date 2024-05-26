const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const ContentRepository = require('../../Domains/contnt/ContentRepository');

class ContentRepositoryPostgres extends ContentRepository {
    constructor(pool) {
        super();
        this._pool = pool;
    }


    /**
     * Updates the 'datameta' table with the provided values.
     *
     * @param {Object} usecasepayload - An object containing the values to be updated.
     * @param {string} usecasepayload.mttag - The new value for the 'mttag' column.
     * @param {string} usecasepayload.artcl - The new value for the 'artcl' column.
     * @param {string} usecasepayload.scrptlvc - The new value for the 'scrptlvc' column.
     * @return {Promise<void>} - A promise that resolves when the update is successful.
     * @throws {InvariantError} - If the update operation fails.
     */
    async editmtdt(usecasepayload, params) {
        const { mttag, artcl, scrptlvc } = usecasepayload
        // Kueri untuk mencari dataapknotice
        const query = {
            text: 'UPDATE datameta SET mttag = $1, artcl = $2, scrptlvc = $3 WHERE iddtmeta = $4',
            values: [mttag, artcl, scrptlvc, params],
        };

        const datameta = await this._pool.query(query);
        if (!datameta.rowCount) {
            throw new InvariantError('fail edit data !');
        }
        return;

    }

    async gettmtdt() {
        const query = {
            text: 'SELECT iddtmeta ,mttag ,artcl, scrptlvc FROM datameta ',
            values: [],
        };
        const result = await this._pool.query(query);
        return result.rows[0];

    }

    async checkstmp(urpage) {
        const query = {
            text: 'SELECT * FROM stmp WHERE urpage = $1',
            values: [urpage],
        };
        const result = await this._pool.query(query);
        if (result.rowCount != 0) {
            throw new InvariantError('path already exiested !');
        }
    }

    async addstmp(urpage) {
        const created_at = new Date().toISOString();
        const updated_at = new Date().toISOString().split('T')[0];

        const query = {
            text: 'INSERT INTO stmp  (urpage , created_at, updated_at) VALUES($1, $2, $3)',
            values: [urpage, created_at, updated_at]
        };

        await this._pool.query(query);
        return;
    }

    async editstmp(payload, params) {
        const query = {
            text: 'UPDATE stmp SET urpage = $1 WHERE urpage = $2',
            values: [payload, params],
        };
        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new InvariantError('fail edit data !');
        }

        return;
    }

    async getstmp() {
        const query = {
            text: 'SELECT idstmp ,urpage ,updated_at FROM stmp ',
            values: [],
        };
        const result = await this._pool.query(query);
        return result.rows;
    }

    async delstmp(urpage) {
        const query = {
            text: 'DELETE FROM stmp WHERE urpage = $1',
            values: [urpage],
        };
        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new InvariantError('fail delete data !');
        }
        return "Sitemap deleted successfully !";
    }
    async editgeneral(payload, params) {
        const query = {
            text: 'UPDATE ctgeneral SET nmwebsite = $1, logrl = $2, icrl = $3, pkrl = $4, rnntxt = $5 WHERE idnmwebst = $6',
            values: [payload.nmwebsite, payload.logrl, payload.icrl, payload.pkrl, payload.rnntxt, params],
        };
        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new InvariantError('fail edit data !');
        }
        return "general data updated";

    }

    async getgeneral() {
        const query = {
            text: 'SELECT idnmwebst, nmwebsite, logrl, icrl, pkrl, rnntxt FROM ctgeneral ',
            values: [],
        };
        const result = await this._pool.query(query);
        return result.rows[0];
    }

    async editslider(payload, params) {
        const query = {
            text: 'UPDATE ctsldr SET ctsldrur = $1,ttlectsldr= $2, trgturctsldr = $3, statusctsldr = $4 WHERE idctsldr = $5',
            values: [payload.ctsldrur, payload.ttlectsldr, payload.trgturctsldr, payload.statusctsldr, params],
        };
        const result = await this._pool.query(query);
        if (!result.rowCount) {
            throw new InvariantError('fail edit data !');
        }
        return "slider data updated";
    }

    async getslider() {
        const query = {
            text: 'SELECT idctsldr, ctsldrur, ttlectsldr, trgturctsldr, statusctsldr FROM ctsldr ',
            values: [],
        };
        const result = await this._pool.query(query);
        return result.rows[0];
    }

}

module.exports = ContentRepositoryPostgres;
