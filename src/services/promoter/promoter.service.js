import Promoter from '../../models/promoter.model';

export default function promoterService($q, Parse, profileService, addressService, userService) {

    return {
        getAll,
        getById,
        getByFolio,
        getByUser,
        factory,
        save
    };

    function getAll(filter = {}) {
        let deferred = $q.defer();

        let query = new Parse.Query(Promoter);
        query.skip(filter.offset || 0);
        query.limit(filter.limit || 10);
        query.descending('folio');
        query.include('profile');
        query.find({
            success: promoters => {
                deferred.resolve(promoters);
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function getOne(fieldName, value) {
        return new Promise((resolve, reject) => {
            let query = new Parse.Query(Promoter);
            query.equalTo(fieldName, value);
            query.include('profile');
            query.include('profile.address');
            query.include('user.email');
            query.first({
                success: promoter => {
                    resolve(new Promoter(promoter));
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

    function save(promoter) {
        let deferred = $q.defer();

        // Save Profile's Address:
        addressService.save(promoter.profile.address)
            .then(_address => {

                promoter.profile.address = _address;

                // Save promoter's Profile:
                return profileService.save(promoter.profile)

            })
            .then(_profile => {

                promoter.profile = _profile;
                // If it's a new promoter, build a new User instance:
                promoter.user = promoter.existed() ? promoter.user : _buildNewUser(promoter);

                // Save promoter and its User:
                return promoter.save();

            })
            .then(_promoter => {

                promoter = _promoter;

                // Trigger User's reset password when it's a new promoter:
                if (!promoter.existed()) {
                    return userService.requestPasswordReset(promoter.email);
                }
                // If promoter already existed, just resolve:
                return Promise.resolve();

            })
            .then(() => {

                deferred.resolve(promoter);

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
