import Parse from 'parse';

export default class Order extends Parse.Object {
    constructor() {
        super('Order');
    }
}

Parse.Object.registerSubclass('Order', Order);
