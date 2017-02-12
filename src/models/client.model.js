import Parse from 'parse';

export default class Client extends Parse.Object {
    constructor() {
        super('Client');
    }
}

Parse.Object.registerSubclass('Client', Client);
