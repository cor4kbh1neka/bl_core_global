/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('ctscmed', {
        idctscmed: {
            type: 'SERIAL',
            primaryKey: true,
        },
        ctscmedur: {
            type: 'VARCHAR(256)',
            notNull: true,
        },
        nmectscmed: {
            type: 'VARCHAR(126)',
            notNull: true,
        },
        trgturctscmed: {
            type: 'VARCHAR(256)',
            notNull: true,
        },
        statusctscmed: {
            type: 'VARCHAR(8)',
            notNull: true,
        },
        created_at: {
            type: 'TEXT',
        },
        updated_at: {
            type: 'TEXT',
        },
    });
    pgm.sql(`
    INSERT INTO ctscmed (ctscmedur , nmectscmed,trgturctscmed,statusctscmed ) VALUES
    ('https://example.com/' , 'whatsapp1' ,'https://example.com/', '1'),
    ('https://example.com/2' , 'whatsapp2' ,'https://example.com/2', '1'),
    ('https://example.com/3' , 'whatsapp2' ,'https://example.com/2', '1'),
    ('https://example.com/4' , 'whatsapp2' ,'https://example.com/2', '1'),
    ('https://example.com/5' , 'whatsapp2' ,'https://example.com/2', '1'),
    ('https://example.com/6' , 'whatsapp2' ,'https://example.com/2', '1'),
    ('https://example.com/7' , 'whatsapp2' ,'https://example.com/2', '1'),
    ('https://example.com/8' , 'whatsapp2' ,'https://example.com/2', '1'),
    ('https://example.com/9' , 'whatsapp2' ,'https://example.com/2', '1'),
    ('https://example.com/10' , 'whatsapp3' ,'https://example.com/3', '1')
`)
};

exports.down = (pgm) => {
    pgm.dropTable('ctscmed');
};
