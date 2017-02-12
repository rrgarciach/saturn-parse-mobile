'use strict';
// next lines is commented due that Ionic is already loading angular. Will fix later.
// import angular from 'angular';
import ngParse from 'angular-parse';

import run from './app.run';
import { parseConfig } from './app.config';
import routes from './app.routes';

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
    .config(menuTranslate)
    .config(routes)
    .config(parseConfig)
    .run(run)
    .controller('MenuCtrl', MenuCtrl);
