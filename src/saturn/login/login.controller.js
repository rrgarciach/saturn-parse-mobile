export default class LoginCtrl {

    constructor($ionicSideMenuDelegate, $ionicLoading, $ionicPopup, $location, $ionicHistory, $state, $scope, authService, sessionService) {
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$ionicLoading = $ionicLoading;
        this.$ionicPopup = $ionicPopup;
        this.$location = $location;
        this.$ionicHistory = $ionicHistory;
        this.$state = $state;
        this.$scope = $scope;
        this.authService = authService;
        this.sessionService = sessionService;

        this.showLogin = false;
        // Initialize view:
        this.init();
    }

    doLogin() {
        this.$ionicLoading.show({
            template: 'Procesando...'
        });
        this.authService.login(this.loginData)
            .then(user => {
                this._redirectToHome();
            })
            .catch(err => {
                if (err.status === 490) {
                    this.showSimpleDialog('Cuenta bloqueada',
                        'Ha excedido el número de intentos de inicio de sesión. Por motivos de seguridad su actual dirección IP ' +
                        'permanecerá bloqueada durante 15 minutos.');
                } else if (err.status === 401) {
                    this.showSimpleDialog('Login',
                        'El usuario o contraseña proporcionados son incorrectos. Intente de nuevo por favor.');
                } else {
                    this.showSimpleDialog('Error de conexión',
                        'Ha ocurrido un error. Revise su conexión a Internet.');
                }
                this.$ionicLoading.hide();
            });
    }

    showForgotPasswordDialog(e) {
        let that = this;
        e.preventDefault();
        this.forgotPasswordDialog = this.$ionicPopup.show({
            title: 'Recuperar contraseña',
            templateUrl: 'templates/forgot-password.html',
            scope: this.$scope,
            // controllerAs: 'vm',
            buttons: [
                {
                    text: 'Enviar Contraseña',
                    type: 'button-positive',
                    onTap: e => {
                        e.preventDefault(); // Don't allow the user to close unless he enters an email
                        let email = this.$scope.vm.email;
                        if (email) {
                            return this.requestPassword(email);
                        }
                    }
                },
                {
                    text: 'Volver',
                    type: 'button-positive'
                }
            ]
        });
        this.forgotPasswordDialog
            .then(() => {
                this.$scope.vm.email = ''; // clean email input field
            });
    }

    requestPassword(email) {
        this.forgotPasswordDialog.close();
        this.authService.recoverPassword(email)
            .then(() => {
                this.showSimpleDialog('Recuperar contraseña',
                    'Se ha enviado un correo electrónico con su nueva contraseña provisional.');
            }, err => {
                this.showSimpleDialog('Recuperar contraseña',
                    'La cuenta indicada no existe');
            });
    }

    showSimpleDialog(title, message) {
        this.$ionicPopup.alert({
            title: title,
            template: message,
            okText: 'Volver'
        });
    }

    init() {
        this.$ionicSideMenuDelegate.canDragContent(false);

        // Form data for the login modal
        this.loginData = {
            email: 'rrgarciach@gmail.com',
            password: 'asdf1234'
        };

        if (this.sessionService.getToken()) {
            this._redirectToHome();
        }
        this.showLogin = true;
    }

    _redirectToHome() {
        // second parameter true sets as history-root view:
        this.$location.path('/app/home', true);
        // delete history in order to avoid return to login screen:
        this.$ionicHistory.nextViewOptions({historyRoot: true});
        this.$ionicLoading.hide();

        this.$ionicSideMenuDelegate.canDragContent(true);
        this.$state.go('app.orders');
    }

}
