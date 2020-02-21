import * as path from 'path';

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
    emails: {
        confirmEmail: {
            subject: 'Please confirm your email',
            template: path.join(__dirname, '../assets/email-templates/confirm-email.ejs'),
            format: 'text'
        },
        forgotPassword: {
            subject: 'Your password reset link',
            template: path.join(__dirname, '../assets/email-templates/forgot-password.ejs'),
            format: 'text'
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