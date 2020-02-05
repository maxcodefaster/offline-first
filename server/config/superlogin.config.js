module.exports = {
    dbServer: {
        protocol: 'http://',
        host: process.env.COUCHDB_HOST,
        user: process.env.COUCHDB_ADMIN,
        password: process.env.COUCHDB_PW,
        cloudant: false,
        userDB: 'users',
        couchAuthDB: '_users'
    },
    security: {
        maxFailedLogins: 5,
        lockoutTime: 600,
        tokenLife: 604800, // one week
        loginOnRegistration: false,
        defaultRoles: ['user']
    },
    mailer: {
        fromEmail: 'gmail.user@gmail.com',
        options: {
            service: 'Gmail',
            auth: {
                user: 'gmail.user@gmail.com',
                pass: 'userpass'
            }
        }
    },
    userDBs: {
        defaultDBs: {
            shared: ['shared'],
            private: ['private']
        }
    },
    providers: {
        local: true
    },
    userModel: {
        whitelist: ['isAdmin'],
        isAdmin: false,
    },
};