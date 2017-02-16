import clientsTranslate from './clients.translate';
import routes from './clients.routes';

import ClientsListCtrl from './list/clients-list.controller';

export default angular.module('app.saturn.clients', [])
    .config(routes)
    .config(clientsTranslate)
    .controller('ClientsListCtrl', ClientsListCtrl)
    .name;
