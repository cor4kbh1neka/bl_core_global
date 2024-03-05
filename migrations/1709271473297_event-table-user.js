/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('events', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        userid: {
            type: 'VARCHAR(50)',
            refrences: 'users(id)',  // Menunjukkan foreign key ke tabel threads
            notnull: true,
            onDelete: 'CASCADE',// Tambahkan opsi ON DELETE CASCADE di sini
        },
        imlek: {
            type: 'VARCHAR(50)',
        },
        agustus: {
            type: 'VARCHAR(50)',
        },
        lebaran: {
            type: 'VARCHAR(50)',
        },
        spinner: {
            type: 'VARCHAR(50)',
        },
        is_delete: {
            type: 'VARCHAR(7)',
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('events');
};
