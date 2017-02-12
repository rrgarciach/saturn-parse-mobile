import apiService from './api/api.service';
import authService from './auth/auth.service';
import clientService from './client/client.service';
import itemService from './item/item.service';
import sessionService from './session/session.service';
import orderService from './order/order.service';
import productService from './product/product.service';

export default angular.module('app.services', [])
    .service('apiService', apiService)
    .service('authService', authService)
    .service('clientService', clientService)
    .service('itemService', itemService)
    .service('sessionService', sessionService)
    .service('orderService', orderService)
    .service('productService', productService)
    .name;
