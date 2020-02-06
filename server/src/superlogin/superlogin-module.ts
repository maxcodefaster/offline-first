import { INestApplication, Module, DynamicModule } from "@nestjs/common";
import * as SuperLogin from '@maxcodefaster/superlogin';

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

        app.use(path, app.get('superlogin').router);
    }

}
