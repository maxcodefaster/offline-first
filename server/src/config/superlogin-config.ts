import * as path from 'path';

export const superloginConfig = {
    dbServer: {
        protocol: 'http://',
        host: process.env.COUCHDB_HOST + ':' + process.env.COUCHDB_PORT,
        user: process.env.COUCHDB_USR,
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
    },
    local: {
        sendConfirmEmail: true,
        requireEmailConfirm: true,
        confirmEmailRedirectURL: 'http://localhost:8100/signup-verification',
      },
    mailer: {
        fromEmail: 'noreply@offline-first.com',
        options: {
            service: 'Gmail',
            auth: {
                user: process.env.MAILER_USR,
                pass: process.env.MAILER_PW
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