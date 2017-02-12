export default class OrdersNewCtrl {

    constructor($state, $ionicLoading, clientService) {
        this.$state = $state;
        this.$ionicLoading = $ionicLoading;
        this.clientService = clientService;
    }

    searchClient() {
        // Do not search if Client Folio has not 3 characters or more:
        if (this.searchFolio.toString().length > 2) {
            this.$ionicLoading.show({
                template: 'Procesando...'
            });
            this.clientService.getByFolio(this.searchFolio)
                .then(client => {
                    this.client = client;
                    this.$ionicLoading.hide();
                });
        }
    }

    startNewOrder() {
        this.clientService.startNewOrder(this.client);
        this.$state.go('app.orders:new:items');
    }

}
