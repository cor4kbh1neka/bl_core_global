const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const MemoRepository = require('../../Domains/memo/MemoRepository');



class MemoRepositoryPostgres extends MemoRepository {
    constructor(pool) {
        super();
        this._pool = pool;

    }


    async addmemo(addmemo) {
        // try {
        const { statustype, statuspriority, subject, memo } = addmemo
        const query = {
            text: 'INSERT INTO memodata  (statustype, statuspriority,subject,memo) VALUES($1, $2 , $3, $4) ',
            values: [statustype, statuspriority, subject, memo],
        };

        await this._pool.query(query);
        return "Add memo Success !";
    }

}

module.exports = MemoRepositoryPostgres;