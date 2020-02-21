export const superloginConfig = {
    dbServer: {
        protocol: 'http://',
        host: 'localhost:5984',
        user: 'admin',
        password: 'couchdb',
        cloudant: false,
        userDB: 'users',
        couchAuthDB: '_users'
    },
    security: {
        maxFailedLogins: 5,
        lockoutTime: 600,
        tokenLife: 604800, // one week
        loginOnRegistration: true,
    },
    mailer: {
        fromEmail: 'max.heichling@gmail.com',
        options: {
            service: 'Gmail',
            auth: {
                user: 'max.heichling@gmail.com',
                pass: 'pomodoro25'
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
        whitelist: ['role'],
        role: 'user',
    },
};