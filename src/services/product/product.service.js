'use strict';

export default function productService(Parse) {

    return {
        uploadProducts
    };

    function uploadProducts(loginData) {
        return Parse.User.logIn(loginData.email, loginData.password)
            .then(response => {
                sessionService.setToken(response.token);
            });
    }

}
