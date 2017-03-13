export default class ProductsUploadCtrl {

    constructor($ionicLoading, Parse, Papa, productService, productUploadService) {
        this.$ionicLoading = $ionicLoading;
        this.Parse = Parse;
        this.Papa = Papa;
        this.productService = productService;
        this.productUploadService = productUploadService;

        this.adminUser = true;
    }

    uploadFile() {
        this.productUploadService.upload();
    }

    parseFile() {
        let batch = []; // Array of hydrated Product models to save
        let parsedCount = 0; // Processed rows count
        let total = 0; // Total of rows to process

        this.$ionicLoading.show({template: 'Procesando...'});
        const file = this.productUploadService.getFile();

        // Load an process file only to get row count:
        this.Papa.parse(file, {
            header: true,
            delimiter: ',',
            complete: results => {
                total = results.data.length; // save row count

                // Load all SKU's in database:
                this._getAllProductsWithSku()
                    .then(_productsSkuList => {

                        // Map results by sku => uuid:
                        let productsMapList = this._mapExistingProductsList(_productsSkuList);

                        // Process again file, but this time for real:
                        this.Papa.parse(file, {
                            header: true,
                            delimiter: ',',
                            step: (results, parser) => {
                                this._displayProgress(++parsedCount, total);

                                // Take current row and hydrate model:
                                let product = this._hydrateProduct(results.data[0]);

                                parser.pause();
                                // Check if current row's Product already exists in database:
                                this._checkIfProductExists(productsMapList, product)
                                    .then(_product => {

                                        // If for some reason we got a Product without SKU, abort entire process:
                                        if(!_product.get('sku')) {
                                            parser.abort();
                                            this.$ionicLoading.show({template: 'Proceso de cancelado; Campos inválidos.', duration: 5000});
                                        }

                                        // Include current row's Product to batch
                                        batch.push(_product);

                                        // When Product's batch has 100 Products, save them all:
                                        if (batch.length >= 100) {
                                            this.Parse.Object.saveAll(batch)
                                                .then(() => {
                                                    batch = []; // Empty batch.
                                                    parser.resume(); // Continue with the next row
                                                })
                                                .catch(err => {
                                                    console.error(err);
                                                    parser.abort();
                                                });

                                        // If Product's batch is under 100 Products:
                                        } else {
                                            parser.resume();// Continue with the next row
                                        }

                                    });

                            },
                            complete: results => {
                                // Once completed processing all rows, save the remaining on Product's batch:
                                this.Parse.Object.saveAll(batch)
                                    .then(() => {
                                        batch = [];
                                        this.$ionicLoading.show({template: 'Proceso de importación finalzado.', duration: 3000});
                                    })
                                    .catch(err => {
                                        console.error(err);
                                        this.$ionicLoading.show({template: err, duration: 5000});
                                    });
                            },
                            error: err => {
                                this.$ionicLoading.show({template: err, duration: 5000});
                            }

                        });

                    });


            }
        });
    }

    _hydrateProduct(data) {
        let product = this.productService.factory();

        if (data['código']) product.set('sku', data['código']);
        if (data['Código']) product.set('sku', data['Código']);
        if (data['descripción']) product.set('description', data['descripción']);
        if (data['master']) product.set('master', parseInt(data['master']));
        if (data['unidad']) product.set('unit', data['unidad']);
        if (data['Marca']) product.set('brand', data['Marca']);
        if (data['precio distribuidor con IVA']) product.set('price', parseInt(data['precio distribuidor con IVA']) * 100);
        if (true) product.set('noIVA', false);
        if (data['caja']) product.set('box', parseInt(data['caja']));
        if (data['clave']) product.set('code', data['clave']);
        if (data['ean']) product.set('ean', parseInt(data['ean']));
        if (data['DUN-14 Inner']) product.set('eanBox', parseInt(data['DUN-14 Inner']));
        if (data['DUN-14 Master']) product.set('eanMaster', parseInt(data['DUN-14 Master']));

        return product;
    }

    _checkIfProductExists(productsList, product) {
        return new Promise((resolve, reject) => {

            let sku = product.get('sku');

            if (productsList[sku]) {
                let JsonProduct = product.toJSON();
                JsonProduct.id = productsList[sku];
                product = this.productService.factory(JsonProduct);
            }

            resolve(product);

        });
    }

    _getAllProductsWithSku() {
        return new Promise((resolve, reject) => {
            this.productService.countAll()
                .then(count => {
                    let promises = [];
                    let i = 1000;
                    promises.push( this.productService.getAllSKUs({offset: (i - 1000), limit: i}) );
                    while (i <= count) {
                        i += 1000;
                        promises.push( this.productService.getAllSKUs({offset: (i - 1000), limit: i}) );
                    }

                    Promise.all(promises)
                        .then(results => {
                            let productsSkuList = [];
                            for (let key in results) {
                                productsSkuList = productsSkuList.concat(results[key]);
                            }
                            resolve(productsSkuList);
                        });
                });
        });
    }

    _mapExistingProductsList(products) {
        let productsList = [];
        for (let i = 0; i < products.length; ++i) {
            productsList[products[i].get('sku')] = products[i].id;
        }
        return productsList;
    }

    _displayProgress(progress, total) {
        this.$ionicLoading.show({template: `Importados ${progress} de ${total} (${((progress/total)*100).toFixed(2)}%)...`});
    }

}
