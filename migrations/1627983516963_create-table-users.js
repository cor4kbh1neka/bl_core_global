/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    Buser: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    Bnumber: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    BnumberUser: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    Umail: {
      type: 'VARCHAR(50)',
    },
    Nhp: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    is_verified: {
      type: 'Boolean',
      notNull: true,
    },
    is_favorite: {
      type: 'VARCHAR(50)[]',
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    last_login: {
      type: 'TEXT',
    },
    updated_at: {
      type: 'TEXT',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
