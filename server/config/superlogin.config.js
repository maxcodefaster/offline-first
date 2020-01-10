module.exports = {
    dbServer: {
        protocol: 'http://',
        host: '127.0.0.1:5984',
        user: 'admin',
        password: 'couchdb',
        cloudant: false,
        userDB: 'gesaqs-users',
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
            shared: ['gesaqs'],
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