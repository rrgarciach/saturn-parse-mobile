
import OrdersListCtrl from './list/orders-list.controller';
import OrdersViewCtrl from './view/orders-view.controller';
import routes from './orders.routes';

export default angular.module('app.saturn.orders', [])
  .controller('OrdersListCtrl', OrdersListCtrl)
  .controller('OrdersViewCtrl', OrdersViewCtrl)
  .config(routes)
  .name;
