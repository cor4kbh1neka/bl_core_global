/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('mastergroup', {
        idgroup: {
            type: 'SERIAL',
            primaryKey: true,
        },
        groupbank: {
            type: 'VARCHAR(35)',
            notNull: true,
            unique: true,

        },
        grouptype: {
            type: 'INTEGER', // Menggunakan tipe INTEGER untuk grouptype
            notNull: true,
        }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('mastergroup');
};