import Client from '../../models/client.model';

export default function clientService($q, Parse, profileService, addressService, userService) {

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
        query.include('user.email');
        query.include('promoter');
        query.first({
            success: client => {
                deferred.resolve(new Client(client));
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
        query.include('user.email');
        query.include('promoter');
        query.first({
            success: client => {
                deferred.resolve(new Client(client));
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

                return profileService.save(client.profile)

            })
            .then(_profile => {

                client.profile = _profile;

                let user = client.existed() ? client.user : _buildNewUser(client);

                return userService.save(user)

            })
            .then(_user => {

                client.user = _user;

                return client.existed() ? Promise.resolve() : userService.requestPasswordReset(client.email)

            })
            .then(() => {

                client.save({
                    success: _client => {
                        deferred.resolve(_client);
                    },
                    error: err => {
                        deferred.reject(err);
                    }
                });

            })
            .catch(err => {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function _buildNewUser(client) {
        const tempPassword = (Math.random().toString(36) + '00000000000000000').slice(2, 16 + 2);
        let user = userService.factory();
        user.set('username', client.email);
        user.set('password', tempPassword);
        user.set('email', client.email);
        user.set('profile', client.profile);
        return user;
    }

    function factory(data) {
        let client = new Client();

        client.profile = data ? profileService.factory(data.profile) : profileService.factory();

        return client;
    }

}
