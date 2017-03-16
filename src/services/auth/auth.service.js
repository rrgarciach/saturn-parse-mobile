'use strict';

export default function authService($q, Parse, localStorageService, sessionService) {

    return {
        login,
        logout,
        recoverPassword,
        hasAutologin
    };

    function login(loginData) {
        return new Promise((resolve, reject) => {

            Parse.User.logIn(loginData.email, loginData.password, {
                success: user => {
                    sessionService.loadUserRoles()
                        .then(() => {
                            resolve(user);
                        });
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
                    reject(err);
                }
            });

        });
    }

    function logout() {
        localStorageService.remove('loginData');
        return Parse.User.logOut()
            .then(() => {
                sessionService.destroy();
            })
            .catch(() => {
                sessionService.destroy();
            });
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
