import Order from '../../models/order.model';

export default function orderService($q, Parse, itemService) {

    let currentOrder;

    return {
        getAll,
        getById,
        save,
        factory,
        getCurrentOrder,
        setCurrentOrder,
    };

    function getAll(filter) {
        let deferred = $q.defer();

        let query = new Parse.Query(Order);
        query.skip(filter.offset || 0);
        query.limit(filter.limit || 10);
        query.descending('folio');
        query.select('folio,client,totals');
        query.include('client');
        query.include('client.profile');
        query.find({
            success: orders => {
                deferred.resolve(orders);
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function getById(id) {
        let deferred = $q.defer();

        let query = new Parse.Query(Order);
        query.equalTo('objectId', id);
        query.include('client');
        query.include('client.profile');
        query.find({
            success: orders => {
                let order = new Order(orders[0]);
                let items = order.relation('items');
                items.query().include('product').find({
                    success: _items => {
                        order.items = _items;
                        deferred.resolve(order);
                    },
                    error: err => {
                        deferred.reject(err);
                    }
                });
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function save(order) {
        let deferred = $q.defer();

        itemService.saveAll(order.items)
            .then(_items => {

                let relation = order.relation('items');
                for (let i = 0; i < _items.length; ++i) {
                    relation.add(_items[i]);
                }

                order.save({
                    success: _order => {
                        deferred.resolve(_order);
                    },
                    error: err => {
                        deferred.reject(err);
                    }
                });

            });

        return deferred.promise;
    }

    function factory(data) {
        let order = new Order();
        if (data) {
            if (data.client) order.set('client', data.client);
        }
        return order;
    }

    function getCurrentOrder() {
        return currentOrder;
    }

    function setCurrentOrder(order) {
        currentOrder = order;
    }

}
