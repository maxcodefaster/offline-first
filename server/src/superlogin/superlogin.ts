import { Injectable, Provider } from '@nestjs/common';
import superloginConfig from 'src/config/superlogin-config';
import SuperLogin from '@maxcodefaster/superlogin';

export function createSuperlogin() {
    return new SuperLogin(superloginConfig);
}

export const superloginProvider: Provider = {
    provide: 'superlogin',
    useFactory: createSuperlogin
}
