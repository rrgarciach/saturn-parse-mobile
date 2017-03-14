export default class OrdersItemsCtrl {

    constructor($scope, $stateParams, $location, $ionicHistory, $ionicModal, $ionicLoading, $ionicPopup, sessionService, orderService, productService, itemService) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$location = $location;
        this.$ionicHistory = $ionicHistory;
        this.$ionicModal = $ionicModal;
        this.$ionicLoading = $ionicLoading;
        this.$ionicPopup = $ionicPopup;
        this.sessionService = sessionService;
        this.orderService = orderService;
        this.productService = productService;
        this.itemService = itemService;

        this.adminUser = true;

        this.screenTitle = 'new_order';
        this._init();
    }

    _init() {
        /* When dealing with arrays for ng-repeat` that will be reloaded,
         we have to clear Cache in order to avoid an Error on iOS platform */
        this.$ionicHistory.clearCache()
            .then(() => {
                switch (this.$stateParams.action) {
                    case 'new':
                    default:
                        this._initNew();
                        break;
                    case 'edit':
                        this._initEdit();
                        break;
                }
            });

        this.status = [
            {id: 1, name: 'CAPTURADO'},
            {id: 2, name: 'PROCESADO'},
            {id: 3, name: 'SURTIENDO'},
            {id: 4, name: 'SUTRIDO'},
            {id: 5, name: 'PENDIENTE DE ENTREGA'},
            {id: 6, name: 'EN RUTA PARA ENTREGA'},
            {id: 7, name: 'ENTREGADO'},
            {id: 8, name: 'CANCELADO'},
            {id: 9, name: 'CANCELADO POR EL CLIENTE'},
            {id: 10, name: 'CANCELADO POR EL PROMOTOR'}
        ];

    }

    _initNew() {
        this.screenTitle = 'new_order';
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

    }

    statusIsEditable() {
        return this.sessionService.userHasRole('Manager');
    }

    _initEdit() {
        this.screenTitle = 'edit_order';
        this.$ionicLoading.show({template: 'Procesando...'});
        this.orderService.getById(this.$stateParams.id)
            .then(order => {
                this.order = order;
                this.instantiateModals(); // Instantiate required Ionic modals
                this.$ionicLoading.hide();
            });
    }

    // Search Product by typed SKU:
    searchProduct() {
        // Do not search if SKU has not 5 characters or more:
        if (this.searchSku.length > 4) {

            this.$ionicLoading.show({template: 'Procesando...'});
            this.productService.getBySku(this.searchSku)
                .then(product => {
                    if (product) {
                        // bind found Product with item
                        this.item = this.itemService.factory();
                        this.item.product = product;
                        this.item.quantity = 1;
                        // @TODO: This part is useful to place promotional discounts:
                        this.item.discount = 0;

                    } else {
                        this.item = this.defaultItem;
                    }
                    this.$ionicLoading.hide();

                })
                .catch(err => {
                    // If not Product was found, bind as default:
                    this.item = this.defaultItem;
                    this.$ionicLoading.hide();
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
            animation: 'slide-in-up',
            focusFirstInput: true
        })
            .then(modal => {
                // bind modal instance:
                this.$scope.newItemModal = modal;
            });

        // Instantiate Edit Item modal:
        this.$ionicModal.fromTemplateUrl('templates/order-new-item-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        })
            .then(modal => {
                // bind modal instance:
                this.$scope.editItemModal = modal;
            });

        // Instantiate View Created Order modal:
        this.$ionicModal.fromTemplateUrl('templates/order-view-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        })
            .then(modal => {
                // bind modal instance:
                this.$scope.createdOrderModal = modal;
            });

        // Instantiate Order's Notes modal:
        this.$ionicModal.fromTemplateUrl('templates/order-new-notes-modal.html', {
            scope: this.$scope,
            animation: 'slide-in-up',
            focusFirstInput: true
        })
            .then(modal => {
                // bind modal instance:
                this.$scope.orderNotesModal = modal;
            });

        // Cleanup the modal when we're done with it!
        this.$scope.$on('$destroy', () => {
            this.$scope.newItemModal.remove();
            this.$scope.editItemModal.remove();
            this.$scope.createdOrderModal.remove();
        });
    }

    openAddNewItem() {
        this.actionLabel = 'add_item';
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
    _addNewItem() {
        // Add new Item from Order's Items array:
        this.order.items = this.order.items.concat([this.item]);
        // Update current Order:
        this.orderService.setCurrentOrder(this.order);
        this._closeAddNewItem();
    };

    // Close add new Product modal view:
    _closeAddNewItem() {
        // Update current Order:
        this.order = this.orderService.getCurrentOrder();
        this.$scope.newItemModal.hide();
        this.item = this.defaultItem;
    };

    // Save current Order:
    saveCurrentOrder() {
        // Show loading:
        this.$ionicLoading.show({
            template: 'Procesando...'
        });
        this.orderService.save(this.order)
            .then(order => {
                // Search for created Order:
                this.orderService.getById(order.id)
                    .then(_order => {
                        this.$scope.order = _order;
                        this.openOrder();
                        // Hide loading:
                        this.$ionicLoading.hide();
                        this.closeOrder();

                    })
                    // If getting new Order fails:
                    .catch(() => {
                        this.$ionicPopup.alert({
                            title: 'Error de conexión',
                            template: 'Ha ocurrido un error. Revise su conexión a Internet.',
                            okText: 'Volver'
                        });
                    });

            })
            // If saving new Order fails:
            .catch(err => {
                if (err.status === 400) {
                    // Display Alert to notify success:
                    this.$ionicPopup.alert({
                        title: 'Error',
                        template: 'Ha ocurrido un error. Por favor intente más tarde.',
                        okText: 'Volver'
                    });
                } else {
                    this.$ionicPopup.alert({
                        title: 'Error de conexión',
                        template: 'Ha ocurrido un error. Revise su conexión a Internet.',
                        okText: 'Volver'
                    });
                }
                this.$ionicLoading.hide();
            });
    };

    // Open created Order modal view:
    openOrder() {
        this.$scope.createdOrderModal.show();
    };

    // Close created Order modal view:
    closeOrder() {
        // Clear current Order:
        this.item = this.defaultItem;
        let order = this.orderService.factory();
        this.orderService.setCurrentOrder(order);
        this.$ionicHistory.clearCache();

        // second parameter true sets as history-root view:
        this.$location.path('/app/home', true);
        // delete history in order to avoid return to login screen:
        this.$ionicHistory.nextViewOptions({historyRoot: true});
        this.$ionicLoading.hide();
        this.$scope.createdOrderModal.hide();
    };

    // Open view to edit an Item:
    openEditItem(key, item) {
        this.actionLabel = 'edit_item';
        item.$key = key; // Notice the use of $key instead of key.
        this.item = item;
        this.$scope.editItemModal.show();
    };

    // Edit current modal's Item
    _editItem() {
        // Edit Item from Order's Items array:
        let items = this.order.items;
        items[this.item.key] = this.item;
        this.order.items = items;
        // Update current Order:
        this.orderService.setCurrentOrder(this.order);
        this._closeEditItem(); // Close edit Product modal view:
    };

    // Remove current modal's Item
    removeItem() {
        // Remove Item from Order's Items array:
        this.order.removeItem(this.item);
        // Update current Order:
        this.orderService.setCurrentOrder(this.order);
        this._closeEditItem(); // Close edit Product modal view:
    };

    // Close edit Product modal view:
    _closeEditItem() {
        this.$scope.editItemModal.hide();
    };

    openNotesModal() {
        this.$scope.orderNotesModal.show();
        // this.clearNotes = () => {this.order.notes = '';}
    }

    closeNotesModal() {
        this.$scope.orderNotesModal.hide();
    }

    promptCloseOrder() {
        this.$ionicPopup.confirm({
            title: 'Terminar Órden',
            template: '¿Está seguro que desea terminar de capturar esta órden?',
            inputType: false,
            cancelText: 'No',
            okText: 'Si',
        })
            .then(res => {
                if (res) this.saveCurrentOrder();
            });
    }

    submitAction() {
        switch (this.actionLabel) {
            case 'add_item':
                this._addNewItem();
                break;
            case 'edit_item':
                this._editItem();
                break;
        }
    }

    closeModal() {
        switch (this.actionLabel) {
            case 'add_item':
                this._closeAddNewItem();
                break;
            case 'edit_item':
                this._closeEditItem();
                break;
        }
    }

}
