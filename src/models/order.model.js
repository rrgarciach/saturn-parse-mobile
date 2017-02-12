import Parse from 'parse';

import Client from './client.model';
import Item from './item.model';

export default class Order extends Parse.Object {

    constructor(data) {
        super('Order');

        if (data) {
            this.id = data.id;
            this.set('client', new Client(data.get('client')) );
        }
    }

    get client() {
        return this.get('client');
    }

    set items(_items) {
        this._items = _items;
    }

    get items() {
        return this._items || [];
    }

    get totals() {
        let totals = 0;
        for (let i = 0; i < this.items.length; ++i) {
            totals += this.items[i].totals;
        }
        return totals;
    }
}

Parse.Object.registerSubclass('Order', Order);
