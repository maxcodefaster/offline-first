import { INestApplication, Module, DynamicModule } from "@nestjs/common";
import * as SuperLogin from '@maxcodefaster/superlogin';
import { json } from "body-parser";

@Module({})
export class SuperloginModule {

    static forRoot(options: any): DynamicModule {
        const prov = {
            provide: 'superlogin',
            useFactory: () => {
                return new SuperLogin(options);
            }
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
