import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    host: process.env.COUCHDB_HOST,
    port: process.env.COUCHDB_PORT,
    username: process.env.COUCHDB_ADMIN,
    password: process.env.COUCHDB_PW,
}));