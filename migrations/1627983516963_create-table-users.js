/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    xyuseridxy: {
      type: 'VARCHAR(16)',
      primaryKey: true,
    },
    xyusernamexxy: {
      type: 'VARCHAR(16)',
      notNull: true,
      unique: true,
    },
    xybanknamexyy: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    xybankuserxy: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    xxybanknumberxy: {
      type: 'VARCHAR(20)',
      unique: true,
      notNull: true,
    },
    xyx11xuser_mailxxyy: {
      type: 'VARCHAR(50)',
    },
    xynumbphonexyyy: {
      type: 'VARCHAR(15)',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
