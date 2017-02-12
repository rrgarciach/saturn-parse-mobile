export default function routes($stateProvider) {

    $stateProvider
        .state('app.orders', {
            url: '/orders',
            views: {
                'menuContent': {
                    templateUrl: 'templates/orders-list.html',
                    controller: 'OrdersListCtrl',
                    controllerAs: 'vm'
                }
            }
        })
        .state('app.orders:id', {
            url: '/orders/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/orders-view.html',
                    controller: 'OrdersViewCtrl',
                    controllerAs: 'vm'
                }
            }
        });

};
