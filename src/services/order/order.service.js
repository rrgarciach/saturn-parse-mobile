import Order from '../../models/order.model';

export default function orderService($q, Parse) {
    let query = new Parse.Query(Order);

    return {
        getOrders
    };

    function getOrders(filter) {
        let deferred = $q.defer();

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

}
