import Client from '../../models/client.model';

export default function clientService($q, Parse) {

    return {
        getAll,
        getById,
        getByFolio
    };

    function getAll(filter) {
        let deferred = $q.defer();

        let query = new Parse.Query(Client);
        query.skip(filter.offset || 0);
        query.limit(filter.limit || 10);
        query.descending('folio');
        query.include('profile');
        query.find({
            success: clients => {
                deferred.resolve(clients);
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function getById(id) {
        let deferred = $q.defer();

        let query = new Parse.Query(Client);
        query.equalTo('objectId', id);
        query.include('profile');
        query.include('profile.address');
        query.find({
            success: clients => {
                deferred.resolve(new Client(clients[0]));
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function getByFolio(folio) {
        let deferred = $q.defer();

        let query = new Parse.Query(Client);
        query.equalTo('folio', folio);
        query.include('profile');
        query.include('profile.address');
        query.find({
            success: clients => {
                deferred.resolve(new Client(clients[0]));
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

}
