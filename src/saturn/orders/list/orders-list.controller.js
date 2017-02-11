import Parse from 'parse';

import Order from '../../../models/order.model';

export default class OrdersListCtrl {

    constructor() {
        let query = new Parse.Query(Order);
        query.find()
            .then(orders => {
                this.orders = orders;
            });
    }

}
