export default class OrdersNewCtrl {

    constructor($ionicLoading, clientService) {
        this.$ionicLoading = $ionicLoading;
        this.clientService = clientService;
    }

    searchClient() {
        console.log(this.searchFolio)
        // Do not search if Client Folio has not 3 characters or more:
        if (this.searchFolio.toString().length > 2) {
            this.$ionicLoading.show({
                template: 'Procesando...'
            });
            this.clientService.getByFolio(this.searchFolio)
                .then(clients => {
                    this.client = clients[0];
                    this.$ionicLoading.hide();
                });
        }
    }

}
