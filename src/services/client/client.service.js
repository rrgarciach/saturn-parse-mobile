import Client from '../../models/client.model';

export default function clientService($q, Parse, profileService, addressService, userService) {

    return {
        getAll,
        getById,
        getByFolio,
        getByUser,
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

    function getOne(fieldName, value) {
        return new Promise((resolve, reject) => {
            let query = new Parse.Query(Client);
            query.equalTo(fieldName, value);
            query.include('profile');
            query.include('profile.address');
            query.include('user.email');
            query.include('promoter');
            query.first({
                success: client => {
                    resolve(new Client(client));
                },
                error: err => {
                    reject(err);
                }
            });
        });
    }

    function getById(id) {
        return getOne('objectId', id);
    }

    function getByFolio(folio) {
        return getOne('folio', folio);
    }

    function getByUser(user) {
        return getOne('user', user);
    }

    function save(client) {
        let deferred = $q.defer();

        // Save Profile's Address:
        addressService.save(client.profile.address)
            .then(_address => {

                client.profile.address = _address;

                // Save Client's Profile:
                return profileService.save(client.profile)

            })
            .then(_profile => {

                client.profile = _profile;
                // If it's a new Client, build a new User instance:
                client.user = client.existed() ? client.user : _buildNewUser(client);

                // Save Client and its User:
                return client.save();

            })
            .then(_client => {

                client = _client;

                // Trigger User's reset password when it's a new Client:
                if (!client.existed()) {
                    return userService.requestPasswordReset(client.email);
                }
                // If Client already existed, just resolve:
                return Promise.resolve();

            })
            .then(() => {

                deferred.resolve(client);

            })
            .catch(err => {

                deferred.reject(err);

            });

        return deferred.promise;
    }

    // TODO: Move this method to a factory inside a userService:
    function _buildNewUser(client) {
        const tempPassword = (Math.random().toString(36) + '00000000000000000').slice(2, 16 + 2);
        let user = userService.factory();
        user.set('username', client.email);
        user.set('password', tempPassword);
        user.set('email', client.email);
        user.set('profile', client.profile);

        let userACL = new Parse.ACL();
        // Allow Client to access and edit this User:
        userACL.setWriteAccess(Parse.User.current(), true);
        userACL.setReadAccess(Parse.User.current(), true);
        // Allow Managers Role to access and edit this User:
        userACL.setRoleReadAccess('Manager', true);
        userACL.setRoleWriteAccess('Manager', true);
        user.setACL(userACL);

        return user;
    }

    function factory(data) {
        let client = new Client();

        client.profile = data ? profileService.factory(data.profile) : profileService.factory();
        client.user = data ? userService.factory(data.profile) : userService.factory();

        return client;
    }

}
