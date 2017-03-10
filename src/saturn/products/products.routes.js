export default function routes($stateProvider) {

    $stateProvider
        .state('app.products:upload', {
            url: '/products/upload',
            views: {
                'menuContent': {
                    templateUrl: 'templates/products-upload.html',
                    controller: 'ProductsUploadCtrl',
                    controllerAs: 'vm'
                }
            },
            permission: ['Manager']
        });

};
