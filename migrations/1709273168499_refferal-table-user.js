/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('reffs', {
        code_refs: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        userid: {
            type: 'VARCHAR(50)',
            refrences: 'users(id)',  // Menunjukkan foreign key ke tabel threads
            notnull: true,
            onDelete: 'CASCADE',// Tambahkan opsi ON DELETE CASCADE di sini
        },
        refferal: {
            type: 'VARCHAR(50)[]', //bisa masukan date dalam array 
        },
        commision: {
            type: 'DECIMAL(10, 2)',
        },
        transaction: {
            type: 'VARCHAR(50)',
        }
    })
};

exports.down = pgm => {
    pgm.dropTable('reffs');
};
