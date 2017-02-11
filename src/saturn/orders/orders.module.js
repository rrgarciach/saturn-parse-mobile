import OrdersListCtrl from './list/orders-list.controller';
import ordersListTranslate from './list/orders-list.translate';
import OrdersViewCtrl from './view/orders-view.controller';
import routes from './orders.routes';
import orderStatusFilter from './orders-status.filter';

export default angular.module('app.saturn.orders', [])
    .controller('OrdersListCtrl', OrdersListCtrl)
    .config(ordersListTranslate)
    .controller('OrdersViewCtrl', OrdersViewCtrl)
    .config(routes)
    .filter('orderStatusFilter', orderStatusFilter)
    .name;
