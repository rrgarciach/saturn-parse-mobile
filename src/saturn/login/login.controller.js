export default class LoginCtrl {

    constructor($ionicSideMenuDelegate, $ionicLoading, $ionicPopup, $location, $ionicHistory, $state, $scope, localStorageService, authService, sessionService) {
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$ionicLoading = $ionicLoading;
        this.$ionicPopup = $ionicPopup;
        this.$location = $location;
        this.$ionicHistory = $ionicHistory;
        this.$state = $state;
        this.$scope = $scope;
        this.localStorageService = localStorageService;
        this.authService = authService;
        this.sessionService = sessionService;

        // Initialize view:
        this._init();
    }

    _init() {
        this.showLogin = false;
        this.autoLogin = !!this.localStorageService.get('loginData');

        this.$ionicSideMenuDelegate.canDragContent(false);

        // Form data for the login modal
        this.loginData = {
            email: 'rrgarciach@gmail.com',
            password: 'asdf1234'
        };

        if (this.autoLogin) {
            this.loginData = this.localStorageService.get('loginData');
            this.doLogin();
        }
        this.showLogin = true;
    }

    doLogin() {
        this.$ionicLoading.show({template: 'Procesando...'});
        this.authService.login(this.loginData)
            .then(user => {
                // Save credentials if Auto Login was slected
                if (this.autoLogin) {
                    this.localStorageService.set('loginData', this.loginData);
                } else {
                    this.localStorageService.remove('loginData');
                }
                this._redirectToHome();
            })
            .catch(err => {
                if (err.status === 490) {
                    this.showSimpleDialog('Cuenta bloqueada',
                        'Ha excedido el número de intentos de inicio de sesión. Por motivos de seguridad su actual dirección IP ' +
                        'permanecerá bloqueada durante 15 minutos.');
                } else if (err.status === 401) {
                    this.showSimpleDialog('Credenciales incorrectas',
                        'El usuario o contraseña proporcionados son incorrectos. Intente de nuevo por favor.');
                } else if (err.status === 403) {
                    this.showSimpleDialog('Correo electrónico no verificado',
                        `Por favor siga los pasos que se indican en el mensaje que ha recibido en su bandeja de correo 
                        electrónico para verificar y activar su cuenta.`);
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
        this.$ionicLoading.show({template: 'Procesando...'});
        this.forgotPasswordDialog.close();
        this.authService.recoverPassword(email)
            .then(() => {
                this.showSimpleDialog('Recuperar contraseña',
                    'Se ha enviado un correo electrónico con instrucciones para restablecer su contraseña.');
                this.$ionicLoading.hide();
            }, err => {
                this.showSimpleDialog('Recuperar contraseña',
                    'La cuenta indicada no existe');
                this.$ionicLoading.hide();
            });
    }

    showSimpleDialog(title, message) {
        this.$ionicPopup.alert({
            title: title,
            template: message,
            okText: 'Volver'
        });
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
