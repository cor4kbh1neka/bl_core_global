/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('dataapknotice', {
        idnotice: {
            type: 'SERIAL',
            primaryKey: true,
        },
        title: {
            type: 'VARCHAR(75)',
            notNull: true,
        },
        content: {
            type: 'text',
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
    pgm.dropTable('dataapknotice');
};
