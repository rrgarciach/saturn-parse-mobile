export default class OrdersViewCtrl {

    constructor($state, $stateParams, $ionicLoading, orderService) {
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.orderService = orderService;
        this.$ionicLoading = $ionicLoading;

        this.adminUser = true;

        this.$ionicLoading.show({template: 'Procesando...'});
        this.orderService.getById(this.$stateParams.id)
            .then(order => {
                this.order = order;
                this.$ionicLoading.hide();
            });
    }

    editOrder() {
        this.$state.go('app.orders:edit:items', {
            action: 'edit',
            id: this.$stateParams.id
        });
    }

}
