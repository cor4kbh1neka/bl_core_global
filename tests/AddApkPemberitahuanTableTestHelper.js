/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AddApkPemberitahuanTableTestHelper = {
  async addnotice({
    title = 'fake title',
    content = 'ini ada content pemberitahuan', created_at = '2024-02-24T15:25:51.326Z'
  }) {
    const query = {
      text: 'INSERT INTO dataapknotice VALUES($1, $2, $3)',
      values: [title, content, created_at],
    };

    await pool.query(query);
  },

  async findnoticebyid(id) {
    const query = {
      text: 'SELECT * FROM dataapknotice WHERE idnotice = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM dataapknotice WHERE 1=1');
  },
};

module.exports = AddApkPemberitahuanTableTestHelper;
