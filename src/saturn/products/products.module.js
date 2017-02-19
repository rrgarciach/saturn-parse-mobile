import productsTranslate from './products.translate';
import routes from './products.routes';

import ProductsUploadCtrl from './upload/products-upload.controller';

export default angular.module('app.saturn.products', [])
    .config(routes)
    .config(productsTranslate)
    .controller('ProductsUploadCtrl', ProductsUploadCtrl)
    .name;
