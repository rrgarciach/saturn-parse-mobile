import Address from './models/address.model';
import Client from './models/client.model';
import Item from './models/item.model';
import Order from './models/order.model';
import Product from './models/product.model';
import Profile from './models/profile.model';

export default function registerModels(ParseProvider) {

    ParseProvider.Object.registerSubclass('Address', Address);
    ParseProvider.Object.registerSubclass('Client', Client);
    ParseProvider.Object.registerSubclass('Item', Item);
    ParseProvider.Object.registerSubclass('Order', Order);
    ParseProvider.Object.registerSubclass('Product', Product);
    ParseProvider.Object.registerSubclass('Profile', Profile);

}
