const InvariantError = require('../../Commons/exceptions/InvariantError');
const BnksRepository = require('../../Domains/banks/BnksRepository');



class ApkBnksRepositoryPostgres extends BnksRepository {
    constructor(pool) {
        super();
        this._pool = pool;

    }

    async databnksdp(databks) {

        const { namegroupxyzt, namebankxxyy, statusxxyy, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr, zwzwshowbarcode } = databks;
        const created_at = new Date().toISOString();
        const query = {
            text: 'INSERT INTO datagroupdp (namegroupxyzt, namebankxxyy, statusxxyy, yyxxmethod, xynamarekx, norekxyxy , barcodexrxr , zwzwshowbarcode,created_at ) VALUES($1, $2, $3, $4, $5, $6,$7, $8, $9) RETURNING namegroupxyzt',
            values: [namegroupxyzt, namebankxxyy, statusxxyy, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr, zwzwshowbarcode, created_at],
        };
        const data = await this._pool.query(query);
        return data.rows[0].namegroupxyzt;

    }


    async checkbnks(rek, namegroup, databks) {
        const query = {
            text: 'SELECT * FROM datagroupdp WHERE norekxyxy = $1 AND namegroupxyzt = $2 AND  xynamarekx = $3',
            values: [rek, namegroup, databks],
        };
        const data = await this._pool.query(query);

        if (data.rowCount === 1) {
            throw new InvariantError('Data Bank sudah ada , mohon cek lagi !');
        }
    }



    async getdatabnksdp(params) {
        // Kueri untuk mencari dataapknotice
        const noticeQuery = {
            text: 'SELECT * FROM datagroupdp WHERE namegroupxyzt = $1',
            values: [params],
        };
        const databank = await this._pool.query(noticeQuery);
        return databank.rows;
    }


}

module.exports = ApkBnksRepositoryPostgres;