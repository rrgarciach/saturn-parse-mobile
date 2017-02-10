'use strict';

import ordersModule from './orders/orders.module';

import routes from './saturn.routes';

import LoginCtrl from './login/login.controller';
import loginTranslate from './login/login.translate';

export default angular.module('saturn', [
  ordersModule,
])
  .config(routes)
  .controller('LoginCtrl', LoginCtrl)
  .config(loginTranslate)
  .name;
