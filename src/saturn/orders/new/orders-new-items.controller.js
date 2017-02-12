export default class OrdersItemsCtrl {

    constructor(orderService) {
        this.orderService = orderService;

        this.adminUser = true;
        this.order = orderService.getCurrentOrder();
    }

}
