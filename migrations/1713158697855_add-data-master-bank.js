/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('masterbank', {
        idbnkmaster: {
            type: 'SERIAL',
            primaryKey: true,
        },
        bnkmstrxyxyx: {
            type: 'VARCHAR(35)',
            notNull: true,
            unique: true,
        },
        groupbank: {
            type: 'VARCHAR(35)',
            notNull: true,
        },
        urllogoxxyx: {
            type: 'VARCHAR(130)',
            notNull: true,
        },
        statusxyxyy: {
            type: 'BOOLEAN',
            notNull: true,
            default: true,
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
    pgm.dropTable('masterbank');
};
