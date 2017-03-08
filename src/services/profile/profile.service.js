import Profile from '../../models/profile.model';

export default function profileService($q, addressService) {

    return {
        save,
        factory
    };

    function save(profile) {
        let deferred = $q.defer();

        profile.save({
            success: _profile => {
                deferred.resolve(_profile);
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function factory(data) {
        let profile = new Profile();

        profile.address = data ? addressService.factory(data.address) : addressService.factory();

        return profile;
    }

}
