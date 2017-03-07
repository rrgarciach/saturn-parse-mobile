export default function userService($q, Parse) {

    return {
        save,
        requestPasswordReset,
        factory
    };

    function save(user) {
        let deferred = $q.defer();

        user.save({
            success: _user => {
                deferred.resolve(_user);
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function requestPasswordReset(email) {
        let deferred = $q.defer();

        Parse.User.requestPasswordReset(email, {
            success: () => {
                deferred.resolve();
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function factory() {
        return new Parse.User;
    }

}
