export default class OrdersItemsCtrl {

    constructor($scope, $ionicHistory, $ionicModal, orderService, productService, itemService) {
        this.$scope = $scope;
        this.$ionicHistory = $ionicHistory;
        this.$ionicModal = $ionicModal;
        this.orderService = orderService;
        this.productService = productService;
        this.itemService = itemService;

        this.adminUser = true;

        this.init();
    }

    init() {
        /* When dealing with arrays for ng-repeat` that will be reloaded,
         we have to clear Cache in order to avoid an Error on iOS platform */
        this.$ionicHistory.clearCache()
            .then(() => {
                // get current Order:
                this.order = this.orderService.getCurrentOrder();

                // // Check if User is Client (Role ID 7):
                // if (sessionDataService.getRoleId() > 5) {
                //     vm.adminUser = false;
                //     vm.order.addressId = sessionDataService.getProfile().Client.mainAddressId;
                // } else {
                //     vm.adminUser = true;
                // }

                this.instantiateModals(); // Instantiate required Ionic modals

            });

    }

    // Search Product by typed SKU:
    searchProduct() {
        // Do not search if SKU has not 5 characters or more:
        if (this.searchSku.length > 4) {

            this.productService.getBySku(this.searchSku)
                .then(product => {
                    // bind found Product with item
                    this.item = this.itemService.factory();
                    this.item.set('product', product);
                    this.item.quantity = 1;
                    // @TODO: This part is useful to place promotional discounts:
                    this.item.discount = 0;

                })
                .catch(err => {
                    // If not Product was found, bind as default:
                    this.item = this.defaultItem
                });

        } else {
            // Bind default Order in view:
            this.item = this.defaultItem;
        }
    };

    instantiateModals() {
        // Instantiate New Item modal:
        this.$ionicModal.fromTemplateUrl('templates/order-new-item-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        })
            .then(modal => {
                // bind modal instance:
                this.$scope.newItemModal = modal;
            });

        // Instantiate Edit Item modal:
        this.$ionicModal.fromTemplateUrl('templates/order-edit-item-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        })
            .then(modal => {
                // bind modal instance:
                this.$scope.editItemModal = modal;
            });

        // Instantiate View Created Order modal:
        this.$ionicModal.fromTemplateUrl('templates/order-view-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up'
        })
            .then(modal => {
                // bind modal instance:
                this.$scope.createdOrderModal = modal;
            });

        // Cleanup the modal when we're done with it!
        this.$scope.$on('$destroy', function () {
            this.$scope.newItemModal.remove();
            this.$scope.editItemModal.remove();
            this.$scope.createdOrderModal.remove();
        });
    }

    openAddNewItem() {
        // Default item to be displayed at beginning:
        this.defaultItem = this.itemService.factory({
            product: this.productService.factory(),
            quantity: 1,
            price: 0,
            discount: 0
        });
        this.item = this.defaultItem;
        this.searchSku = '';
        this.$scope.newItemModal.show();
    }

    // Add selected Item to current Order:
    addNewItem() {
        // Add new Item from Order's Items array:
        this.order.items = this.order.items.concat([this.item]);
        // Update current Order:
        this.orderService.setCurrentOrder(this.order);
        console.log(this.order.items);
        this.closeAddNewItem();
    };

    // Close add new Product modal view:
    closeAddNewItem() {
        // Update current Order:
        this.order = this.orderService.getCurrentOrder();
        this.$scope.newItemModal.hide();
        this.item = this.defaultItem;
    };

}
