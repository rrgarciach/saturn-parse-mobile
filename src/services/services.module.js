import addressService from './address/address.service';
import apiService from './api/api.service';
import authService from './auth/auth.service';
import clientService from './client/client.service';
import itemService from './item/item.service';
import sessionService from './session/session.service';
import orderService from './order/order.service';
import orderDownloadService from './order/order.download.service';
import productService from './product/product.service';
import productUploadService from './product/product.upload.service';
import profileService from './profile/profile.service';
import promoterService from './promoter/promoter.service';
import userService from './user/user.service';

export default angular.module('app.services', [])
    .service('addressService', addressService)
    .service('apiService', apiService)
    .service('authService', authService)
    .service('clientService', clientService)
    .service('itemService', itemService)
    .service('sessionService', sessionService)
    .service('orderService', orderService)
    .service('orderDownloadService', orderDownloadService)
    .service('productService', productService)
    .service('productUploadService', productUploadService)
    .service('profileService', profileService)
    .service('promoterService', promoterService)
    .service('userService', userService)
    .name;
