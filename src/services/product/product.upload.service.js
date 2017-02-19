import angular from 'angular';

export default function productUploadService($http, $q, ENV) {
    let file;

    return {
        upload,
        setFile,
        getFile
    };

    function setFile(_file) {
        file = _file;
    }

    function getFile() {
        return file;
    }

    function upload() {
        let fd = new FormData();
        fd.append('catalog', file);
        let url = `${ENV.PARSE_SERVER_URL}/import/product`;
        return $http.post(url, fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'Access-Control-Allow-Origin': '*',
            }
        });
    }

}
