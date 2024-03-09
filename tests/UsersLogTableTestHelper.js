/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const UsersLogTableTestHelper = {
  async addLogBase({
    id_logbase = 'idlog123', xyuseridxy = 'user123', username = 'fakeuser', password = 'secret'
  }) {
    const query = {
      text: 'INSERT INTO logbasxxyte VALUES($1, $2, $3, $4)',
      values: [id_logbase, xyuseridxy, username, password],
    };

    await pool.query(query);
  },

  async findUsersByIdlogbase(id) {
    const query = {
      text: 'SELECT * FROM logbasxxyte WHERE xyuseridxy = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM logbasxxyte WHERE 1=1');
  },
};

module.exports = UsersLogTableTestHelper;
