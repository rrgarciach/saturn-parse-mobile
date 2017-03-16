export default function errorService(Parse, $state, $location, $ionicHistory, $ionicLoading, $ionicSideMenuDelegate, localStorageService) {

    return {
        catchErr,
    };

    function catchErr(error) {
        if (error.code === 209) {
            Parse.User.logOut()
                .then(() => {
                    _redirectToLogin();
                });
        }
    }

    function _redirectToLogin() {
        // second parameter true sets as history-root view:
        $location.path('/app/login', true);
        // delete history in order to avoid return to login screen:
        $ionicHistory.nextViewOptions({historyRoot: true});
        $ionicLoading.hide();

        $ionicSideMenuDelegate.canDragContent(true);
        $state.go('app.login');
    }

}
