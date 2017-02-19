// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
export default function routes($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'templates/menu.html',
            controller: 'MenuCtrl',
            controllerAs: 'vm'
        });

    // if no route states is matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/orders');

    // set home url:
    $urlRouterProvider.when('app/home', '/app/orders');


};
