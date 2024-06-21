import { Curs } from './Curs';
import { Event } from './Event';

export class CartItem {
  constructor(public event: Event | Curs) {}

  quantity: number = 1;
  price: number = this.event.price;
}
