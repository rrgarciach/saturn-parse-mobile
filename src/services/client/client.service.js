import Client from '../../models/client.model';

export default function clientService($q, Parse, profileService, addressService) {

    return {
        getAll,
        getById,
        getByFolio,
        factory,
        save
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

    function save(client) {
        let deferred = $q.defer();

        addressService.save(client.profile.address)
            .then(_address => {

                client.profile.address = _address;

                profileService.save(client.profile)
                    .then(_profile => {

                        client.profile = _profile;

                        client.save({
                            success: _order => {
                                deferred.resolve(_order);
                            },
                            error: err => {
                                deferred.reject(err);
                            }
                        });
                    })
                    .catch(err => {
                        deferred.reject(err);
                    });

            })
            .catch(err => {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function factory(data) {
        let client = new Client();

        client.profile = data ? profileService.factory(data.profile) : profileService.factory();

        return client;
    }

}
