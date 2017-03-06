export default function orderDownloadService($q, $http, ENV) {

    return {
        downloadOrderTxt,
        getUrlByDateAsXls,
    };

    function downloadOrderTxt(id) {

        const url = `${ENV.PARSE_SERVER_URL}/orders/export/${id}`;
        // return $http.get(url);
        return url;

    }

    function getUrlByDateAsXls(date) {

        const url = `${ENV.PARSE_SERVER_URL}/orders/download/xls?date=${date}`;
        // return $http.get(url);
        return url;

    }

}
