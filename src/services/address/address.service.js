import Address from '../../models/address.model';

export default function addressService($q) {

    return {
        save,
        factory
    };

    function save(address) {
        let deferred = $q.defer();

        address.save({
            success: _address => {
                deferred.resolve(_address);
            },
            error: err => {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }

    function factory(data) {
        let address = new Address();

        return address;
    }

}
