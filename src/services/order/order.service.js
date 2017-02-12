import Order from '../../models/order.model';

export default function orderService($q, Parse) {

    let currentOrder;

    return {
        getAll,
        getById,
        newOrder,
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

    function newOrder(client) {
        currentOrder = new Order();
        currentOrder.set('client', client);
    }

    function getCurrentOrder() {
        return currentOrder;
    }

    function setCurrentOrder(order) {
        currentOrder = order;
    }

    function saveCurrentOrder() {
        let deferred = $q.defer();

        currentOrder.save({
            success: order => {
                deferred.resolve(order);
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

}
