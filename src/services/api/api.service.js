'use strict';

export default function apiService($q, $http, sessionService) {

  const apiUrl = 'https://saturn-parse-server-dev.herokuapp.com/parse';

  return {
    get,
    head,
    post,
    put,
    delete: remove
  };

  function get(url, config) {
    let deferred = $q.defer();
    let _config = config || {};
    let _token = sessionService.getToken();
    if (_token) {
      _config.headers = {'Authorization': _token};
    }
    
    $http.get(apiUrl + url, _config)
      .then(res => deferred.resolve(res.data))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  function head(url, config) {
    let deferred = $q.defer();
    let _config = config || {};
    let _token = sessionService.getToken();
    if (_token) {
      _config.headers = {'Authorization': _token};
    }

    $http.head(apiUrl + url, _config)
      .then(res => deferred.resolve(res.data))
      .catch(err => deferred.reject(err));
    return deferred.promise;
  }

  function post(url, data, config) {
    let deferred = $q.defer();

    let _config = config || {};
    let _token = sessionService.getToken();
    if (_token) {
      _config.headers = {'Authorization': _token};
    }
    $http.post(apiUrl + url, data, _config)
      .then(res => deferred.resolve(res.data))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  function put(url, data, config) {
    let deferred = $q.defer();
    let _config = config || {};
    let _token = sessionService.getToken();
    if (_token) {
      if (!_config.headers)
        _config.headers = {'Authorization': _token};
      else
        _config.headers['Authorization'] = _token;
    }
    $http.put(apiUrl + url, data, _config)
      .then(res => deferred.resolve(res.data))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

  function remove(url, config) {
    let deferred = $q.defer();
    let _config = config || {};
    let _token = sessionService.getToken();
    if (_token) {
      _config.headers = {'Authorization': _token};
    }

    $http.delete(apiUrl + url, _config)
      .then(res => deferred.resolve(res.data))
      .catch(err => deferred.reject(err));

    return deferred.promise;
  }

}
