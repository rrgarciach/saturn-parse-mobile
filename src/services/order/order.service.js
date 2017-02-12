import Order from '../../models/order.model';

export default function orderService($q, Parse) {

    return {
        getAll,
        getById
    };

    function getAll(filter) {
        let deferred = $q.defer();

        let query = new Parse.Query(Order);
        query.skip(filter.offset || 0);
        query.limit(filter.limit || 10);
        query.descending('folio');
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
        query.find({
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
