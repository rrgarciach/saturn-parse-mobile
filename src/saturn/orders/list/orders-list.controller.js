export default class OrdersListCtrl {

    constructor($scope, $state, ENV, $ionicModal, $ionicPopup, $ionicLoading, orderService, orderDownloadService) {
        this.$scope = $scope;
        this.$state = $state;
        this.ENV = ENV;
        this.$ionicModal = $ionicModal;
        this.$ionicPopup = $ionicPopup;
        this.$ionicLoading = $ionicLoading;
        this.orderService = orderService;
        this.orderDownloadService = orderDownloadService;

        this._init();
    }

    _init() {
        // Cleanup the modal when we're done with it!
        this.$scope.$on('$destroy', () => {
            this.$scope.filtersModal.remove();
            this.$scope.orderViewModal.remove();
        });

        this.$scope.$on('$stateChangeSuccess', () => {
            this.loadMore();
        });

        this.filter = {
            offset: 0,
            limit: 10,
            // desc: true,
            // orderBy: 'Order.id',
            // searchBy: 'client',
            // searchValue: '',
        };
        this.moreData = true;
        this.orders = [];

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
                this.$scope.orderViewModal = modal;
            });
    }

    viewOrder(order) {
        this.$ionicLoading.show({
            template: 'Procesando...'
        });
        this.$scope.order = order;
        this.$scope.orderViewModal.show();
        this.$ionicLoading.hide();
        // this.orderService.getOderById(id)
        //     .then(function (order) {
        //         this.$scope.order = order;
        //         this.$scope.orderViewModal.show();
        //         this.$ionicLoading.hide();
        //     })
        //     .catch(function () {
        //         // @TODO: Handle error
        //     });
    }

    closeOrder() {
        this.$scope.orderViewModal.hide();
    }

    openFiltersModal() {
        this.$scope.filtersModal.show();
    }

    closeFiltersModal() {
        this.$scope.filtersModal.hide();
    }

    applyFilters() {
        this.orders = [];
        this.filter.offset = 0;
        this.loadMore();
        this.$scope.filtersModal.hide();
    }

    loadMore() {
        this.getOders();
    }

    getOders() {
        this.$ionicLoading.show({
            template: 'Procesando...'
        });
        this.orderService.getAll(this.filter)
            .then(orders => {
                this.filter.offset += 10;
                this.orders = this.orders.concat(orders); // Iterate received orders
                this.$scope.$broadcast('scroll.infiniteScrollComplete');
                this.$ionicLoading.hide();
                this.moreData = orders.length > 0; // Check if there's no more data
            })
            .catch(() => {
                this.$ionicPopup.alert({
                    title: 'Error de conexión',
                    template: 'Ha ocurrido un error. Revise su conexión a Internet.',
                    okText: 'Volver'
                });
            });
    }

}
