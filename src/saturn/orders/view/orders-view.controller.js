export default class OrdersViewCtrl {

    constructor($stateParams, orderService) {
        this.$stateParams = $stateParams;
        this.orderService = orderService;

        this.orderService.getById(this.$stateParams.id)
            .then(order => {
                this.order = order;
            });
    }

}
