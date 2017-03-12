export default class ClientsFormCtrl {

    constructor($scope, $stateParams, $location, $ionicHistory, $ionicModal, $ionicLoading, $ionicPopup, sessionService, clientService, promoterService) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$location = $location;
        this.$ionicHistory = $ionicHistory;
        this.$ionicModal = $ionicModal;
        this.$ionicLoading = $ionicLoading;
        this.$ionicPopup = $ionicPopup;
        this.sessionService = sessionService;
        this.clientService = clientService;
        this.promoterService = promoterService;

        this.adminUser = true;

        this.screenTitle = 'new_client';
        this._init();
    }

    _init() {
        /* When dealing with arrays for ng-repeat` that will be reloaded,
         we have to clear Cache in client to avoid an Error on iOS platform */
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

                return Promise.resolve();

            })
            .then(() => {
                // Check if current User is not a Promoter, it means that one has to be
                // picked from Promoters:
                if (!this.userIsPromoter()) {

                    return this.promoterService.getAll()
                        .then(promoters => {
                            this.promoters = promoters;
                        });

                // If user is a Promoter, just go straight:
                } else {

                    this.client.promoter = this.sessionService.getPromoter();
                    return Promise.resolve();

                }
            });

    }

    _initNew() {
        this.screenTitle = 'new_client';
        // get current Client:
        this.client = this.clientService.factory();
        this.client.profile.isPersonaMoral = false;
        this.client.profile.address.state = 'Chihuahua';
    }

    _initEdit() {
        this.screenTitle = 'edit_client';
        this.$ionicLoading.show({template: 'Procesando...'});
        this.clientService.getById(this.$stateParams.id)
            .then(client => {
                this.client = client;
                this.$ionicLoading.hide();
            });
    }

    userIsPromoter() {
        return !!this.sessionService.getPromoter().id;
    }

    // Save current Client:
    saveClient() {
        // Show loading:
        this.$ionicLoading.show({template: 'Procesando...'});
        this.clientService.save(this.client)
            .then(client => {
                this.$ionicPopup.alert({
                    title: 'Nuevo Cliente creado',
                    template: `El nuevo Cliente ${client.fullName} ha sido creado exitosamente.`,
                    okText: 'Aceptar'
                });
                this._redirectToHome();
            })
            // If saving new Client fails:
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
    }

    promptSave() {
        this.$ionicPopup.confirm({
            title: 'Guardar',
            template: '¿Está seguro que desea guardar?',
            inputType: false,
            cancelText: 'No',
            okText: 'Si',
        })
            .then(res => {
                if (res) this.saveClient();
            });
    }

    _redirectToHome() {
        // second parameter true sets as history-root view:
        this.$location.path('/app/clients/view/' + this.client.id, true);
        // delete history in order to avoid return to login screen:
        this.$ionicHistory.nextViewOptions({historyRoot: true});
        this.$ionicLoading.hide();
    }

}
