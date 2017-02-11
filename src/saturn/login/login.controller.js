'use strict';

export default class LoginCtrl {

    constructor($ionicSideMenuDelegate, $state, authService) {
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$ionicSideMenuDelegate.canDragContent(false);
        this.state = $state;
        this.authService = authService;
        // Form data for the login modal
        this.loginData = {
            email: 'rrgarciach@gmail.com',
            password: 'asdf1234'
        };
    }

    doLogin() {
        this.authService.login(this.loginData)
            .then(() => {
                this.$ionicSideMenuDelegate.canDragContent(true);
                this.state.go('app.orders');
            });
    }

}
