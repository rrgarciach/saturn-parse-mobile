import Item from '../../models/item.model';

export default function itemService($q, Parse) {

    return {
        saveAll,
        destroyAll,
        factory
    };

    function saveAll(items) {
        let deferred = $q.defer();

        Parse.Object.saveAll(items, {
            success: _items => {
                deferred.resolve(_items);
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function destroyAll(items) {
        let deferred = $q.defer();

        Parse.Object.destroyAll(items, {
            success: () => {
                deferred.resolve();
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function factory(data) {
        let item = new Item();
        if (data) {
            item.set('product', data.product);
            item.set('quantity', data.quantity);
            item.set('price', data.price);
            item.set('discount', data.discount);
        }
        return item;
    }

}
