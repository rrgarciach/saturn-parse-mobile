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
        });

};
