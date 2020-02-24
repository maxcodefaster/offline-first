import { INestApplication, Module, DynamicModule } from "@nestjs/common";
import * as SuperLogin from '@maxcodefaster/superlogin';
import { json } from "body-parser";
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import path = require("path");
import { ConfigService } from "@nestjs/config";

@Module({})
export class SuperloginModule {

    private readonly envConfig;

    constructor() {
        // const filePath = `${process.env.NODE_ENV || 'development'}.env`;
        // const envFile = path.resolve(__dirname, '../../', filePath);
        // this.envConfig = dotenv.parse(fs.readFileSync(envFile));
    }

    static forRoot(options: any): DynamicModule {
        const prov = {
            provide: 'superlogin',
            useFactory: () => {
                options.dbServer.host = process.env.COUCHDB_HOST + ':' + process.env.COUCHDB_PORT;
                options.dbServer.user = process.env.COUCHDB_USR;
                options.dbServer.password = process.env.COUCHDB_PW;
                options.mailer.options.auth.user = process.env.MAILER_USR;
                options.mailer.options.auth.pass = process.env.MAILER_PW;
                return new SuperLogin(options);
            },
        };
        return {
            module: SuperloginModule,
            providers: [
                prov
            ],
            exports: [
                prov
            ]
        };
    }

    static setup(path: string, app: INestApplication) {
        const httpAdapter = app.getHttpAdapter();
        if (httpAdapter && httpAdapter.getType() !== 'express') {
            throw new Error('Express is not supported!');
        }

        const jsonParseMiddleware = json();
        app.use((req: any, res: any, next: any) => {
            // do not parse json bodies if we are hitting file uploading controller
            if (req.path.indexOf("/v1/files") === 0) {
                next();
            } else {
                jsonParseMiddleware(req, res, next);
            }
        });

        app.use(path, app.get('superlogin').router);

    }

}
