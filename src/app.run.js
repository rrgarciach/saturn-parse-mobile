export default function run($rootScope, $state, $ionicPlatform, sessionService) {

  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });

    $rootScope.$on('$stateChangeStart', (event, toState) => {
        if (!toState.public && !sessionService.getToken() ) {
            // User isn’t authenticated
            $state.transitionTo('app.login');
            event.preventDefault();

        } else {

            if (toState.permission) {
                let userRoles = sessionService.getUserRoles();
                for (let key in userRoles) {
                    if (toState.permission.indexOf(userRoles[key]) > -1) return;
                }
                $state.transitionTo('app.orders');
                event.preventDefault();
            }

        }

    });

};
