export default function config(ENV, $urlRouterProvider, $translateProvider, ParseProvider) {

    $translateProvider.preferredLanguage('es');
    $translateProvider.fallbackLanguage('es');
    $translateProvider.useSanitizeValueStrategy('escape');

    // Initialize Parse
    ParseProvider.initialize('saturn-id', 'saturn-master-key');
    ParseProvider.serverURL = `${ENV.PARSE_SERVER_URL}/parse`;

}
