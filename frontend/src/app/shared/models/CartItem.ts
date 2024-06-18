import { Event } from './Event';

export class CartItem {
  constructor(public event: Event) {}

  quantity: number = 1;
  price: number = this.event.price;
}
