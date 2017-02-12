import ordersTranslate from './orders.translate';
import routes from './orders.routes';
import orderStatusFilter from './orders-status.filter';

import OrdersListCtrl from './list/orders-list.controller';
import OrdersViewCtrl from './view/orders-view.controller';
import OrdersNewCtrl from './new/orders-new.controller';
import OrdersItemsCtrl from './new/orders-new-items.controller';

export default angular.module('app.saturn.orders', [])
    .config(routes)
    .config(ordersTranslate)
    .filter('orderStatusFilter', orderStatusFilter)
    .controller('OrdersListCtrl', OrdersListCtrl)
    .controller('OrdersViewCtrl', OrdersViewCtrl)
    .controller('OrdersNewCtrl', OrdersNewCtrl)
    .controller('OrdersItemsCtrl', OrdersItemsCtrl)
    .name;
