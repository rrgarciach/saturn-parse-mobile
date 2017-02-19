export default class ClientsViewCtrl {

    constructor($state, $stateParams, $ionicLoading, $ionicPopup, clientService) {
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$ionicLoading = $ionicLoading;
        this.$ionicPopup = $ionicPopup;
        this.clientService = clientService;

        this.adminUser = true;
        this._init();
    }

    _init() {
        this.$ionicLoading.show({template: 'Procesando...'});
        this.clientService.getById(this.$stateParams.id)
            .then(client => {
                this.client = client;
                this.$ionicLoading.hide();
            });
    }

    editClient() {
        this.$state.go('app.client:edit', {
            action: 'edit',
            id: this.$stateParams.id
        });
    }

}
