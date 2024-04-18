const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const BnksRepository = require('../../Domains/banks/BnksRepository');



class ApkBnksRepositoryPostgres extends BnksRepository {
    constructor(pool) {
        super();
        this._pool = pool;

    }


    async addgrp(addgroup) {
        // try {
        const { namegroupxyzt, grouptype } = addgroup
        const query = {
            text: 'INSERT INTO mastergroup (groupbank, grouptype) VALUES($1, $2) RETURNING groupbank',
            values: [namegroupxyzt, grouptype],
        };
        const data = await this._pool.query(query);
        return data.rows[0].groupbank;
        // } catch (err) {
        //     console.error(err.message);

        // }
    }
    async getdtGroup() {
        const grouquery = {
            text: 'SELECT * FROM mastergroup',
            values: [],
        };
        const data = await this._pool.query(grouquery);
        // console.log(data.rows);
        // const groupbankArray = data.rows.map(row => row.groupbank);
        return data.rows;
    }
    async findgroup(params) {
        // Kueri untuk mencari dataapknotice
        const noticeQuery = {
            text: 'SELECT * FROM mastergroup WHERE idgroup = $1',
            values: [params],
        };
        const databank = await this._pool.query(noticeQuery);
        if (!databank.rowCount) {
            throw new NotFoundError('data not found !');
        }
        return databank.rows;
    }
    async delgroup(params) {
        // Kueri untuk mencari dataapknotice
        const noticeQuery = {
            text: 'DELETE FROM mastergroup WHERE idgroup = $1',
            values: [params],
        };
        await this._pool.query(noticeQuery);
        return "success delete group";
    }
    async chckmstr(params) {
        // Kueri untuk mencari dataapknotice
        const noticeQuery = {
            text: 'SELECT * FROM masterbank WHERE bnkmstrxyxyx = $1',
            values: [params],
        };
        const datamaster = await this._pool.query(noticeQuery);

        if (datamaster.rowCount != 0) {
            throw new InvariantError('data already exist !');
        }
    }
    async addmstr(usecasepayload) {

        const { bnkmstrxyxyx, groupbank, urllogoxxyx, statusxyxyy } = usecasepayload
        const created_at = new Date().toISOString();

        // Kueri untuk mencari dataapknotice
        const query = {
            text: 'INSERT INTO masterbank (bnkmstrxyxyx, groupbank, urllogoxxyx, statusxyxyy, created_at) VALUES($1, $2 , $3, $4, $5) RETURNING  bnkmstrxyxyx',
            values: [bnkmstrxyxyx, groupbank, urllogoxxyx, statusxyxyy, created_at],
        };
        const datamaster = await this._pool.query(query);
        return datamaster.rows[0];
    }
    async putmstrbnk(usecasepayload, params) {


        const { bnkmstrxyxyx, groupbank, urllogoxxyx, statusxyxyy } = usecasepayload;

        // Kueri untuk mencari dataapknotice
        const query = {
            text: 'UPDATE masterbank SET bnkmstrxyxyx = $1, groupbank = $2, urllogoxxyx = $3, "statusxyxyy" = $4 WHERE bnkmstrxyxyx = $5',
            values: [bnkmstrxyxyx, groupbank, urllogoxxyx, statusxyxyy, params],
        };

        const datamaster = await this._pool.query(query);

        if (!datamaster.rowCount) {
            throw new InvariantError('fail edit data !');
        }
        return "Master Bank Edit Success !";

    }
    async getmstrbnk() {

        const grouquery = {
            text: 'SELECT bnkmstrxyxyx,idbnkmaster,groupbank,statusxyxyy,urllogoxxyx FROM masterbank',
            values: [],
        };

        const data = await this._pool.query(grouquery);
        return data.rows;
    }

    async findmstr(params) {
        // Kueri untuk mencari dataapknotice
        const noticeQuery = {
            text: 'SELECT * FROM masterbank WHERE idbnkmaster = $1',
            values: [params],
        };
        const databank = await this._pool.query(noticeQuery);
        if (!databank.rowCount) {
            throw new NotFoundError('data not found !');
        }
        return databank.rows;
    }

    async delmstrbnk(params) {
        // Kueri untuk mencari dataapknotice
        const noticeQuery = {
            text: 'DELETE FROM masterbank WHERE idbnkmaster = $1',
            values: [params],
        };
        await this._pool.query(noticeQuery);
        return "success delete master bank";
    }
    async addbnks(databks) {

        const { namegroupxyzt, namebankxxyy, masterbnkxyxt, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr } = databks;
        let zwzwshowbarcode = ""
        if (barcodexrxr.length > 2) {
            zwzwshowbarcode = true;
        } else {
            zwzwshowbarcode = false;
        }
        const created_at = new Date().toISOString();

        const query = {
            text: 'INSERT INTO databnk (namegroupxyzt, namebankxxyy, masterbnkxyxt, yyxxmethod, xynamarekx, norekxyxy , barcodexrxr , zwzwshowbarcode,created_at ) VALUES($1, $2, $3, $4, $5, $6,$7, $8, $9) RETURNING  masterbnkxyxt , namegroupxyzt ,namebankxxyy ,xynamarekx, norekxyxy',
            values: [namegroupxyzt, namebankxxyy, masterbnkxyxt, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr, zwzwshowbarcode, created_at],
        };
        const data = await this._pool.query(query);
        return data.rows[0];

    }

    async chckbnks(namebankxxyy, xynamarekx, norekxyxy) {
        // Kueri untuk mencari dataapknotice
        const noticeQuery = {
            text: 'SELECT * FROM databnk WHERE namebankxxyy = $1 AND xynamarekx = $2 AND norekxyxy = $3',
            values: [namebankxxyy, xynamarekx, norekxyxy],
        };
        const databank = await this._pool.query(noticeQuery);
        if (databank.rowCount != 0) {
            throw new InvariantError('data already in database !');
        }
    }

    async putbnks(usecasepayload, params) {


        const { namegroupxyzt, masterbnkxyxt, namebankxxyy, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr } = usecasepayload;

        let zwzwshowbarcode = ""
        if (barcodexrxr.length > 2) {
            zwzwshowbarcode = true;
        } else {
            zwzwshowbarcode = false;
        }
        // Kueri untuk mencari dataapknotice
        const query = {
            text: 'UPDATE databnk SET namegroupxyzt = $1, masterbnkxyxt = $2, namebankxxyy = $3, "yyxxmethod" = $4 , "xynamarekx" = $5 , "norekxyxy" = $6 , "barcodexrxr" = $7 , "zwzwshowbarcode" = $8 WHERE idbank = $9 RETURNING namegroupxyzt',
            values: [namegroupxyzt, masterbnkxyxt, namebankxxyy, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr, zwzwshowbarcode, params],
        };


        const databnk = await this._pool.query(query);

        if (!databnk.rowCount) {
            throw new InvariantError('fail edit data !');
        }
        return databnk.rows[0];

    }

    async getbnks(params) {
        const query = {
            text: 'SELECT idbank,masterbnkxyxt,namebankxxyy,namegroupxyzt,xynamarekx,norekxyxy,yyxxmethod,barcodexrxr,zwzwshowbarcode FROM databnk WHERE namegroupxyzt = $1',
            values: [params],
        };
        const data = await this._pool.query(query);

        if (!data.rowCount) {
            throw new NotFoundError('data not found !');
        }

        // const newDataRows = data.rows.map((obj) => {
        //     // Menyalin objek kecuali properti updated_at dan created_at
        //     const { created_at, updated_at, ...newObj } = obj;
        //     return newObj;
        // });

        // // Menggabungkan data kembali dengan properti baru
        // const newData = {
        //     ...data,
        //     rows: newDataRows,
        // };
        return data.rows;
    }

    async getgroupbnks(params) {
        // Kueri untuk mencari dataapknotice
        const noticeQuery = {
            text: 'SELECT * FROM mastergroup WHERE groupbank = $1',
            values: [params],
        };
        const databank = await this._pool.query(noticeQuery);
        if (!databank.rowCount) {
            throw new NotFoundError('data not found !');
        }
        return databank.rows;
    }


    async getmasterbnks(params) {
        // Kueri untuk mencari dataapknotice
        const noticeQuery = {
            text: 'SELECT idbnkmaster,bnkmstrxyxyx,groupbank,urllogoxxyx,statusxyxyy  FROM masterbank WHERE groupbank = $1',
            values: [params],
        };
        const databank = await this._pool.query(noticeQuery);
        if (!databank.rowCount) {
            throw new NotFoundError('data not found !');
        }
        return databank.rows;
    }















    // async databnksdp(databks) {

    //     const { namegroupxyzt, namebankxxyy, statusxxyy, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr, zwzwshowbarcode } = databks;
    //     const created_at = new Date().toISOString();
    //     const query = {
    //         text: 'INSERT INTO datagroupdp (namegroupxyzt, namebankxxyy, statusxxyy, yyxxmethod, xynamarekx, norekxyxy , barcodexrxr , zwzwshowbarcode,created_at ) VALUES($1, $2, $3, $4, $5, $6,$7, $8, $9) RETURNING namegroupxyzt',
    //         values: [namegroupxyzt, namebankxxyy, statusxxyy, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr, zwzwshowbarcode, created_at],
    //     };
    //     const data = await this._pool.query(query);
    //     return data.rows[0].namegroupxyzt;

    // }
    // async checkbnks(rek, namegroup, databks) {
    //     const query = {
    //         text: 'SELECT * FROM datagroupdp WHERE norekxyxy = $1 AND namegroupxyzt = $2 AND  xynamarekx = $3',
    //         values: [rek, namegroup, databks],
    //     };
    //     const data = await this._pool.query(query);

    //     if (data.rowCount === 1) {
    //         throw new InvariantError('Data Bank sudah ada , mohon cek lagi !');
    //     }
    // }


    // async getdatabnksdp(params) {
    //     // Kueri untuk mencari dataapknotice
    //     const noticeQuery = {
    //         text: 'SELECT * FROM datagroupdp WHERE namegroupxyzt = $1',
    //         values: [params],
    //     };
    //     const databank = await this._pool.query(noticeQuery);

    //     if (!databank.rowCount) {
    //         throw new NotFoundError('data not found !');
    //     }
    //     return databank.rows;
    // }
}

module.exports = ApkBnksRepositoryPostgres;