'use strict';

export default function authService($q, Parse, sessionService) {

    return {
        login,
        logout,
        recoverPassword,
        hasAutologin
    };

    function login(loginData) {
        let deferred = $q.defer();

        Parse.User.logIn(loginData.email, loginData.password, {
            success: user => {
                // sessionService.setToken(user.token);
                deferred.resolve(user);
            },
            error: (user, error) => {
                let err = {};
                switch (error.code) {
                    case Parse.Error.OBJECT_NOT_FOUND:
                        err.status = 401;
                        break;
                    case Parse.Error.EMAIL_NOT_FOUND:
                        err.status = 403;
                        break;
                }
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function logout() {
        // sessionService.destroy();
        Parse.User.logOut();
    }

    function recoverPassword(email) {
        let deferred = $q.defer();

        Parse.User.requestPasswordReset(email, {
            success: () => {
                // Password reset request was sent successfully
                deferred.resolve();
            },
            error: error => {
                if (error.code === 205) {
                    // if email's associated user doesn't, don't give the clue:
                    deferred.resolve();
                } else {
                    // Show the error message somewhere
                    deferred.reject(error);
                }
            }
        });

        return deferred.promise;
    }

    function hasAutologin() {
        // if ( Object.keys( $localstorage.getObject('credentials') ).length > 0 ) {
        //     return $localstorage.getObject('credentials');
        // }
        return Parse.User.current();
    }

}
