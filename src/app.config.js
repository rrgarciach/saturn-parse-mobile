export default function config($urlRouterProvider, $translateProvider, ParseProvider) {

    $translateProvider.preferredLanguage('es');
    $translateProvider.fallbackLanguage('es');
    $translateProvider.useSanitizeValueStrategy('escape');

    // Initialize Parse
    ParseProvider.initialize('saturn-id', 'saturn-master-key');
    ParseProvider.serverURL = 'https://saturn-parse-server-dev.herokuapp.com/parse';

    // set home url:
    $urlRouterProvider.when('app/home', '/app/orders');

    // if no route states is matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');

}
