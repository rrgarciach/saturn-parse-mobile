export default class OrdersViewCtrl {

    constructor($state, $stateParams, $ionicLoading, $ionicPopup, orderService) {
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$ionicLoading = $ionicLoading;
        this.$ionicPopup = $ionicPopup;
        this.orderService = orderService;

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

    promptDeleteOrder() {
        this.$ionicPopup.confirm({
            title: 'Eliminar Órden',
            template: '¿Está seguro que desea eliminar esta órden?',
            inputType: false,
            cancelText: 'No',
            okText: 'Si',
            okType: 'button-assertive',
        })
            .then(res => {
                if (res) this.deleteOrder();
            })
    }

    deleteOrder() {
        this.orderService.remove(this.order)
            .then(() => {
                this.$state.go('app.orders');
                this.$ionicPopup.alert({
                    title: 'Órden Eliminada',
                    okText: 'Aceptar'
                });
            });
    }

}
