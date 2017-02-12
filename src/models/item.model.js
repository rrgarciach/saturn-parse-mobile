import Parse from 'parse';

export default class Item extends Parse.Object {

    constructor(data) {
        super('Item');

        if (data) {
            this.id = data.id;
        }
    }

    get sku() {
        return this.get('product').get('sku');
    }

    get description() {
        return this.get('product').get('description');
    }

    get price() {
        return this.get('price') / 100;
    }

    set price(value) {
        this.set('price', value * 100);
    }

    get discount() {
        return this.get('discount') / 100;
    }

    set discount(value) {
        this.set('discount', value * 100);
    }

    get totals() {
        return this.price * this.get('quantity');
    }
}

Parse.Object.registerSubclass('Item', Item);
