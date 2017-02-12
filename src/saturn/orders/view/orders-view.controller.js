export default class OrdersViewCtrl {

    constructor($stateParams, $ionicLoading, orderService) {
        this.$stateParams = $stateParams;
        this.orderService = orderService;
        this.$ionicLoading = $ionicLoading;

        this.adminUser = true;

        this.$ionicLoading.show({
            template: 'Procesando...'
        });
        this.orderService.getById(this.$stateParams.id)
            .then(order => {
                this.order = order;
                this.$ionicLoading.hide();
            });
    }

}
