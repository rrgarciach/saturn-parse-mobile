'use strict';
// next lines is commented due that Ionic is already loading angular. Will fix later.
// import angular from 'angular';
import ngParse from 'angular-parse';

import run from './app.run';
import config from './app.config';
import routes from './app.routes';

import centsCurrency from './filters/cents-currency.filter';

import registerModels from './app.models';

import MenuCtrl from './menu/menu.controller';
import menuTranslate from './menu/menu.translate';

import saturnModule from './saturn/saturn.module';
import servicesModule from './services/services.module';

angular.module('app', [
    'ionic',
    'pascalprecht.translate',
    saturnModule,
    servicesModule,
    ngParse
])
    .config(config)
    .config(menuTranslate)
    .config(routes)
    .run(run)
    .filter('centsCurrency', centsCurrency)
    .config(registerModels)
    .controller('MenuCtrl', MenuCtrl);
