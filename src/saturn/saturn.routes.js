'use strict';

export default function routes($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl as vm',
          }
        }
      });

  };
