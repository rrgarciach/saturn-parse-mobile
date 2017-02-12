export function parseConfig(ParseProvider) {
    // Initialize Parse
    ParseProvider.initialize('saturn-id', 'saturn-master-key');
    ParseProvider.serverURL = 'https://saturn-parse-server-dev.herokuapp.com/parse';
};
