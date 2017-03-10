export default function sessionService(Parse) {

    let session = {
        roles: [],
    };

    return {
        getUser,
        getToken,
        destroy,
        getProfile,
        loadUserRoles,
        getUserRoles,
        getUserRoleName
    };

    function getUser() {
        return Parse.User.current();
    }

    function getToken() {
        // return session.token;
        return Parse.User.current() && Parse.User.current().get('sessionToken');
    }

    function destroy() {
        session = {
            roles: [],
        };
    }

    function getProfile() {
        return session && session.profile;
    }

    function loadUserRoles() {

        let user = Parse.User.current();

        if (user) {

            let queries = [
                new Parse.Query('_Role').equalTo('users', user)
            ];
            // Maximum depth is 3, after that we get a "" error from Parse
            for (let i = 0; i < 2; i++) {
                queries.push(new Parse.Query('_Role').matchesQuery('roles', queries[i]));
            }

            return Parse.Query.or.apply(Parse.Query, queries)
                .find()
                .then(
                    roles => {
                        return session.roles = roles.map(role => {
                            return role.get('name');
                        });
                    }
                );

        }

        return Promise.resolve();

    }

    function getUserRoles() {
        return session.roles || [];
    }

    function getUserRoleName() {
        if ( session.roles.indexOf('Administrator') > -1 )
            return 'Administrator';
        if ( session.roles.indexOf('Manager') > -1 )
            return 'Manager';
        if ( session.roles.indexOf('Operations') > -1 )
            return 'Operations';
        if ( session.roles.indexOf('Promoter') > -1 )
            return 'Promoter';
        if ( session.roles.indexOf('Client') > -1 )
            return 'Client';
        if ( session.roles.indexOf('Guest') > -1 )
            return 'Guest';
    }

}
