import Parse from 'parse';

export default class Product extends Parse.Object {

    constructor(data) {
        super('Product');

        if (data) {
            this.id = data.id;
        }
    }
}

Parse.Object.registerSubclass('Product', Product);
