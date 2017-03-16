export default class ClientsListCtrl {

    constructor($scope, $ionicModal, $ionicPopup, $ionicLoading, clientService) {
        this.$scope = $scope;
        this.$ionicModal = $ionicModal;
        this.$ionicPopup = $ionicPopup;
        this.$ionicLoading = $ionicLoading;
        this.clientService = clientService;

        // Cleanup the modal when we're done with it!
        this.$scope.$on('$destroy', () => {
            this.$scope.filtersModal.remove();
            this.$scope.clientViewModal.remove();
        });

        this.$scope.$on('$stateChangeSuccess', () => {
            this.loadMore();
        });

        this.init();
    }

    // viewOrder(order) {
    //     this.$ionicLoading.show({
    //         template: 'Procesando...'
    //     });
    //     this.$scope.order = order;
    //     this.$scope.clientViewModal.show();
    //     this.$ionicLoading.hide();
    // }

    // closeOrder() {
    //     this.$scope.clientViewModal.hide();
    // }

    openFiltersModal() {
        this.$scope.filtersModal.show();
    }

    closeFiltersModal() {
        this.$scope.filtersModal.hide();
    }

    applyFilters() {
        this.clients = [];
        this.filter.offset = 0;
        this.loadMore();
        this.$scope.filtersModal.hide();
    }

    loadMore() {
        this.getClients();
    }

    getClients() {
        this.$ionicLoading.show({
            template: 'Procesando...'
        });
        this.clientService.getAll(this.filter)
            .then(clients => {
                this.filter.offset += 10;
                this.clients = this.clients.concat(clients); // Iterate received orders
                this.$scope.$broadcast('scroll.infiniteScrollComplete');
                this.$ionicLoading.hide();
                this.moreData = clients.length > 0; // Check if there's no more data
            });
    }

    init() {
        this.options = {
            searchBy: [
                {model: 'Client', value: 'folio', label: 'No. de Cliente'},
                {model: 'Profile', value: 'firstName', label: 'Nombre'},
                {model: 'Profile', value: 'lastName', label: 'Apellido'},
            ]
        };

        this.filter = {
            offset: 0,
            limit: 10,
            desc: true,
            // orderBy: 'folio',
            searchBy: this.options.searchBy[0],
            searchValue: '',
        };
        this.moreData = true;
        this.clients = [];

        this.$ionicModal.fromTemplateUrl('templates/orders-list-filter-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        })
            .then(modal => {
                this.$scope.filtersModal = modal;
            });

        this.$ionicModal.fromTemplateUrl('templates/order-view-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        })
            .then(modal => {
                this.$scope.clientViewModal = modal;
            });
    }

}
