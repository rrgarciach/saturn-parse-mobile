import Order from '../../../models/order.model';

export default class OrdersViewCtrl {

    constructor(Parse) {
        let query = new Parse.Query(Order);
        query.find()
            .then(orders => {
                this.orders = orders;
            });
    }

}
