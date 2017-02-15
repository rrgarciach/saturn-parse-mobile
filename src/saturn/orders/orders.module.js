import ordersTranslate from './orders.translate';
import routes from './orders.routes';
import orderStatusFilter from './orders-status.filter';

import OrdersListCtrl from './list/orders-list.controller';
import OrdersViewCtrl from './view/orders-view.controller';
import OrdersNewClientCtrl from './new/orders-new-client.controller';
import OrdersItemsCtrl from './items/orders-items.controller';

export default angular.module('app.saturn.orders', [])
    .config(routes)
    .config(ordersTranslate)
    .filter('orderStatusFilter', orderStatusFilter)
    .controller('OrdersListCtrl', OrdersListCtrl)
    .controller('OrdersViewCtrl', OrdersViewCtrl)
    .controller('OrdersNewClientCtrl', OrdersNewClientCtrl)
    .controller('OrdersItemsCtrl', OrdersItemsCtrl)
    .name;
