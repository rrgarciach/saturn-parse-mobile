'use strict';
// next lines is commented due that Ionic is already loading angular. Will fix later.
// import angular from 'angular';
import ngParse from 'angular-parse';

import saturnModule from './saturn/saturn.module';
import servicesModule from './services/services.module';

import MenuCtrl from './menu/menu.controller';
import menuTranslate from './menu/menu.translate';

import routes from './app.routes';
import run from './app.run';

angular.module('app', [
    'ionic',
    'pascalprecht.translate',
    saturnModule,
    servicesModule,
    ngParse
])
    .controller('MenuCtrl', MenuCtrl)
    .config(menuTranslate)
    .config(routes)
    .run(run);
