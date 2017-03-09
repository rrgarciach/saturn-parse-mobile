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
            },
            authenticate: true
        })
        .state('app.orders:view', {
            url: '/orders/view/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/orders-view.html',
                    controller: 'OrdersViewCtrl',
                    controllerAs: 'vm'
                }
            },
            authenticate: true
        })
        .state('app.orders:new', {
            url: '/orders/new',
            views: {
                'menuContent': {
                    templateUrl: 'templates/order-new-client.html',
                    controller: 'OrdersNewClientCtrl',
                    controllerAs: 'vm'
                }
            },
            authenticate: true
        })
        .state('app.orders:new:items', {
            url: '/orders/new/items',
            views: {
                'menuContent': {
                    templateUrl: 'templates/orders-items.html',
                    controller: 'OrdersItemsCtrl',
                    controllerAs: 'vm'
                }
            },
            authenticate: true
        })
        .state('app.orders:edit:items', {
            url: '/orders/edit/items/:action:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/orders-items.html',
                    controller: 'OrdersItemsCtrl',
                    controllerAs: 'vm'
                }
            },
            authenticate: true
        })
        .state('app.orders:download', {
            url: '/orders/download',
            views: {
                'menuContent': {
                    templateUrl: 'templates/orders-download.html',
                    controller: 'OrdersDownloadCtrl',
                    controllerAs: 'vm'
                }
            },
            authenticate: true
        });

};
