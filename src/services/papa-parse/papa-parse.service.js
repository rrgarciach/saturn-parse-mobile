const Papa = require('papaparse');

export default function papaParseService() {
    if (typeof Papa === 'undefined') {
        throw new Error('angular-PapaParse\'s JavaScript requires PapaParse');
    }
    return Papa;
}