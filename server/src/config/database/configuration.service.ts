import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 * https://medium.com/the-crowdlinker-chronicle/creating-config-files-in-nestjs-dcd059ae15e4
 * @class
 */
@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) { }

    get host(): string {
        return this.configService.get<string>('database.host');
    }
    get port(): string {
        return this.configService.get<string>('database.port');
    }
    get username(): string {
        return this.configService.get<string>('database.username');
    }
    get password(): string {
        return String(this.configService.get<string>('database.password'));
    }
}