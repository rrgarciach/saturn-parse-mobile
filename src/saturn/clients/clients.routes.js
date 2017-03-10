export default function routes($stateProvider) {

    $stateProvider
        .state('app.clients', {
            url: '/clients',
            views: {
                'menuContent': {
                    templateUrl: 'templates/clients-list.html',
                    controller: 'ClientsListCtrl',
                    controllerAs: 'vm'
                }
            },
            permission: ['Promoter']
        })
        .state('app.clients:view', {
            url: '/clients/view/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/clients-view.html',
                    controller: 'ClientsViewCtrl',
                    controllerAs: 'vm'
                }
            },
            permission: ['Promoter']
        })
        .state('app.clients:new', {
            url: '/clients/new',
            views: {
                'menuContent': {
                    templateUrl: 'templates/clients-form.html',
                    controller: 'ClientsFormCtrl',
                    controllerAs: 'vm'
                }
            },
            permission: ['Promoter']
        })
        .state('app.clients:edit', {
            url: '/clients/edit/:action:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/clients-form.html',
                    controller: 'ClientsFormCtrl',
                    controllerAs: 'vm'
                }
            },
            permission: ['Promoter']
        });

};
