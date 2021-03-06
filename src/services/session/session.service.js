export default function sessionService(Parse, errorService, clientService, promoterService) {

    let session = {
        roles: [],
        client: {},
        promoter: {},
    };

    return {
        getUser,
        getToken,
        destroy,
        getProfile,
        getPromoter,
        loadUserRoles,
        getUserRoles,
        getUserRoleName,
        userHasRole
    };

    function getUser() {
        return Parse.User.current();
    }

    function getToken() {
        return Parse.User.current() && Parse.User.current().get('sessionToken');
    }

    function destroy() {
        session = {
            roles: [],
            client: {},
            promoter: {},
        };
    }

    function getProfile() {
        return session && session.profile;
    }

    function loadUserRoles() {
        return new Promise((resolve, reject) => {

            let user = Parse.User.current();
            if (user) {

                let queries = [
                    new Parse.Query('_Role').equalTo('users', user)
                ];
                // Maximum depth is 3, after that we get a "" error from Parse
                for (let i = 0; i < 2; i++) {
                    queries.push(new Parse.Query('_Role').matchesQuery('roles', queries[i]));
                }

                Parse.Query.or.apply(Parse.Query, queries)
                    .find()
                    .then(roles => {
                        session.roles = roles.map(role => {
                            return role.get('name');
                        });

                        return _resolveSessionRoles()
                    })
                    .then(() => {
                        resolve();
                    })
                    .catch(err => {
                        errorService.catchErr(err);
                        reject(err);
                    });

            }

            resolve();

        });
    }

    function _resolveSessionRoles() {
        return new Promise((resolve, reject) => {

            if ( session.roles.indexOf('Administrator') > -1 ) {
                session.roleName = 'Administrator';
                resolve();

            } else if ( session.roles.indexOf('Manager') > -1 ) {
                session.roleName = 'Manager';
                resolve();

            } else if ( session.roles.indexOf('Operations') > -1 ) {
                session.roleName = 'Operations';
                resolve();

            } else if ( session.roles.indexOf('Promoter') > -1 ) {
                session.roleName = 'Promoter';
                promoterService.getByUser(getUser())
                    .then(promoter => {
                        session.promoter = promoter;
                        resolve();
                    });

            } else if ( session.roles.indexOf('Client') > -1 ) {
                session.roleName = 'Client';
                clientService.getByUser(getUser())
                    .then(client => {
                        session.client = client;
                        resolve();
                    });

            } else if ( session.roles.indexOf('Guest') > -1 ) {
                session.roleName = 'Guest';
                resolve();

            } else {
                resolve();

            }

        });
    }

    /**
     * Return an array with strings of current User's roles names
     * This method is to resolve route access
     * @returns {Array}
     */
    // TODO: Refactor route access in order to remove this method and use getUserRoleName() instead
    function getUserRoles() {
        return session.roles || [];
    }

    /**
     * Returns related Promoter (if current User is a Client
     * @returns {session.promoter|{}}
     */
    function getPromoter() {
        return session.promoter;
    }

    /**
     * Return current User role string name
     * @returns string
     */
    function getUserRoleName() {
        return session.roleName;
    }

    /**
     * Evaluates if current User contains the given role
     * @param roleName
     * @returns boolean
     */
    function userHasRole(roleName) {
        return session.roles.indexOf(roleName) > -1;
    }

}
