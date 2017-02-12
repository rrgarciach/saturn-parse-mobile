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
        .state('app.orders:view', {
            url: '/orders/view/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/orders-view.html',
                    controller: 'OrdersViewCtrl',
                    controllerAs: 'vm'
                }
            }
        })
        .state('app.orders:new', {
            url: '/orders/new',
            views: {
                'menuContent': {
                    templateUrl: 'templates/orders-new.html',
                    controller: 'OrdersNewCtrl',
                    controllerAs: 'vm'
                }
            }
        })
        .state('app.orders:new:items', {
            url: '/orders/new/items',
            views: {
                'menuContent': {
                    templateUrl: 'templates/orders-new-items.html',
                    controller: 'OrdersItemsCtrl',
                    controllerAs: 'vm'
                }
            }
        });

};
