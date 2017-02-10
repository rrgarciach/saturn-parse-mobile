'use strict';

import OrdersListCtrl from './list/orders-list.controller';
import routes from './orders.routes';

export default angular.module('app.saturn.orders', [])
  .controller('OrdersListCtrl', OrdersListCtrl)
  .config(routes)
  .name;
