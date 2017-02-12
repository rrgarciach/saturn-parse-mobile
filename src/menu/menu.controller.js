export default class MenuCtrl {

    constructor($location, $ionicHistory, $ionicLoading, $ionicSideMenuDelegate, $state, authService) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        this.$location = $location;
        this.$ionicHistory = $ionicHistory;
        this.$ionicLoading = $ionicLoading;
        this.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
        this.$state = $state;
        this.authService = authService;
    }

    logout() {
        this.authService.logout();
        this._redirectToHome();
    }

    _redirectToHome() {
        // second parameter true sets as history-root view:
        this.$location.path('/app/home', true);
        // delete history in order to avoid return to login screen:
        this.$ionicHistory.nextViewOptions({historyRoot: true});

        this.$ionicSideMenuDelegate.canDragContent(false);
        this.$state.go('app.login');
    }

};
