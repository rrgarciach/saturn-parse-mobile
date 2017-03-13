import Product from '../../models/product.model';

export default function productService($http, $q, Parse) {

    return {
        countAll,
        getAllSKUs,
        getBySku,
        factory,
    };

    function countAll() {
        return new Promise((resolve, reject) => {

            let query = new Parse.Query(Product);
            query.count({
                success: count => {
                    resolve(count);
                },
                error: err => {
                    reject(err);
                }
            });

        });
    }

    function getAllSKUs(filter = {}) {
        return new Promise((resolve, reject) => {

            let query = new Parse.Query(Product);
            query.select('sku');
            query.skip(filter.offset || 0);
            query.limit(filter.limit || 1000);
            query.descending('sku');
            query.find({
                success: products => {
                    resolve(products);
                },
                error: err => {
                    reject(err);
                }
            });

        });
    }

    function getBySku(sku) {
        return new Promise((resolve, reject) => {

            let query = new Parse.Query(Product);
            query.equalTo('sku', sku);
            query.find({
                success: products => {
                    resolve(products[0]);
                },
                error: err => {
                    reject(err);
                }
            });

        });
    }

    function factory(data = {}) {
        let product = new Product();

        if (data.id) product.id = data.id;
        if (data.sku) product.set('sku', data.sku);
        if (data.description) product.set('description', data.description);
        if (data.master) product.set('master', data.master);
        if (data.unit) product.set('unit', data.unit);
        if (data.brand) product.set('brand', data.brand);
        if (data.price) product.set('price', data.price);
        if (data.noIVA) product.set('noIVA', data.noIVA);
        if (data.box) product.set('box', data.box);
        if (data.code) product.set('code', data.code);
        if (data.ean) product.set('ean', data.ean);
        if (data.eanBox) product.set('eanBox', data.eanBox);
        if (data.eanMaster) product.set('eanMaster', data.eanMaster);

        return product;
    }

}
