'use strict';

export default class LoginCtrl {

  constructor($ionicSideMenuDelegate, $state, authService) {
    $ionicSideMenuDelegate.canDragContent(false);
    this.state = $state;
    this.authService = authService;
    // Form data for the login modal
    this.loginData = {};
  }

  doLogin() {
    this.authService.login(this.loginData)
      .then(() => {
        this.state.go('app.orders');
      });
  }

}
