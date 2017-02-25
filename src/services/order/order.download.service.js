export default function orderDownloadService($q, $http, ENV) {

    return {
        downloadOrderTxt,
    };

    function downloadOrderTxt(id) {

        const url = `${ENV.PARSE_SERVER_URL}/orders/export/${id}`;
        // return $http.get(url);
        return url;

    }

}
