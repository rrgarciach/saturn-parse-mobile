import clientsTranslate from './clients.translate';
import routes from './clients.routes';

import ClientsListCtrl from './list/clients-list.controller';
import ClientsViewCtrl from './view/clients-view.controller';
import ClientsFormCtrl from './form/clients-form.controller';

export default angular.module('app.saturn.clients', [])
    .config(routes)
    .config(clientsTranslate)
    .controller('ClientsListCtrl', ClientsListCtrl)
    .controller('ClientsViewCtrl', ClientsViewCtrl)
    .controller('ClientsFormCtrl', ClientsFormCtrl)
    .name;
