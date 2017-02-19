'use strict';

import ordersModule from './orders/orders.module';
import clientsModule from './clients/clients.module';
import productsModule from './products/products.module';

import saturnTranslate from './saturn.translate';
import routes from './saturn.routes';

import LoginCtrl from './login/login.controller';
import loginTranslate from './login/login.translate';

export default angular.module('saturn', [
    ordersModule,
    clientsModule,
    productsModule
])
    .config(routes)
    .config(saturnTranslate)
    .controller('LoginCtrl', LoginCtrl)
    .config(loginTranslate)
    .name;
