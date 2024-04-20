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
        urllogoxxyx: {
            type: 'VARCHAR(130)',
            notNull: true,
        },
        statusxyxyy: {
            type: 'INTEGER',
            notNull: true,
            default: 1,
        },
        created_at: {
            type: 'TEXT',
        },
        updated_at: {
            type: 'TEXT',
        },
    });
    pgm.sql(`
    INSERT INTO masterbank (bnkmstrxyxyx, urllogoxxyx,statusxyxyy) VALUES
    ('bca', 'iniContohLogo',1),
    ('bni','iniContohLogo', 1),
    ('bri','iniContohLogo', 1),
    ('mandiri','iniContohLogo', 2),
    ('cimb','iniContohLogo', 1),
    ('danamon','iniContohLogo', 1),
    ('panin','iniContohLogo', 1),
    ('permata','iniContohLogo', 1),
    ('bsi','iniContohLogo', 1),
    ('dana','iniContohLogo', 1),
    ('gopay','iniContohLogo', 1),
    ('ovo','iniContohLogo', 1),
    ('pulsa','iniContohLogo', 1),
    ('linkaja','iniContohLogo', 1),
    ('qris','iniContohLogo', 1)
`);
};



exports.down = (pgm) => {
    pgm.dropTable('masterbank');
};
