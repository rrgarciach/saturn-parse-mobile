'use strict';

export default function routes($stateProvider) {

    $stateProvider
      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl',
              controllerAs: 'vm'
          }
        }
      });

  };
