'use strict';

export default function authService(Parse, sessionService) {

    return {
        login,
        logout
    };

    function login(loginData) {
        return Parse.User.logIn(loginData.email, loginData.password)
            .then(response => {
                sessionService.setToken(response.token);
            });
    }

    function logout() {
        sessionService.destroy();
    }

}
