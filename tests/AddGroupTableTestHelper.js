/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const AddGroupTableTestHelper = {
  async addgroup({
    idgroup = 1,
    groupbank = 'groupbank1',
  }) {
    const query = {
      text: 'INSERT INTO mastergroup  (idgroup,groupbank) VALUES($1, $2)',
      values: [idgroup, groupbank],
    };

    await pool.query(query);
  },

  async findgrp(namegroupxyzt) {
    const query = {
      text: 'SELECT * FROM mastergroup WHERE groupbank = $1',
      values: [namegroupxyzt],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM mastergroup WHERE 1=1');
  },
};

module.exports = AddGroupTableTestHelper;
