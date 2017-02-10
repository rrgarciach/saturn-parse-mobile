'use strict';

export default function routes($stateProvider) {

  $stateProvider
    .state('app.orders', {
      url: '/orders',
      views: {
        'menuContent': {
          templateUrl: 'templates/orders-list.html',
          controller: 'OrdersListCtrl as vm',
        }
      }
    });

};
