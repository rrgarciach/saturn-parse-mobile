import Item from '../../models/item.model';

export default function itemService($q, Parse) {

    return {
        factory
    };

    function factory(data) {
        let item = new Item();
        if (data) {
            item.set('product', data.product);
            item.set('quantity', data.quantity);
            item.set('price', data.price);
            item.set('discount', data.discount);
        }
        return item;
    }

}
