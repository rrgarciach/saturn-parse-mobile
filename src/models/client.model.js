import Parse from 'parse';

export default class Client extends Parse.Object {

    constructor(data) {
        super('Client');

        if (data) {
            this.id = data.id;
            this.set('profile', data.get('profile'));
        }
    }

    get folio() {
        return this.get('folio');
    }

    get profile() {
        return this.get('profile');
    }

    get address() {
        return this.get('profile').get('address');
    }

    get fullName() {
        return this.profile.fullName;
    }

    get rfc() {
        return this.profile.rfc;
    }

}

Parse.Object.registerSubclass('Client', Client);
