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
            }
        })
        .state('app.clients:view', {
            url: '/clients/view/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/clients-view.html',
                    controller: 'ClientsViewCtrl',
                    controllerAs: 'vm'
                }
            }
        });

};
