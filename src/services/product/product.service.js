import Product from '../../models/product.model';

export default function productService($http, $q, Parse) {

    return {
        getBySku,
        factory,
    };

    function getBySku(sku) {
        let deferred = $q.defer();

        let query = new Parse.Query(Product);
        query.equalTo('sku', sku);
        query.find({
            success: products => {
                deferred.resolve(products[0]);
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function factory() {
        return new Product();
    }

}
