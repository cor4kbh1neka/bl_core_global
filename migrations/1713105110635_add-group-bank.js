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
    pgm.sql(`
    INSERT INTO mastergroup (groupbank, grouptype) VALUES
    ('groupbank1', 1),
    ('nongroup', 1),
    ('groupbankwd1', 2),
    ('nongroupwd', 2)
`);
};

exports.down = (pgm) => {
    pgm.dropTable('mastergroup');
};