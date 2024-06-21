import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from '../shared/models/Event';
import { CartItem } from '../shared/models/CartItem';
import { Curs } from '../shared/models/Curs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() {}

  addToCart(event: Event | Curs): void {
    let cartItem = this.cart.items.find((item) => item.event.id === event.id);
    if (cartItem) return;
    this.cart.items.push(new CartItem(event));
    this.setCartToLocalStorage();
  }

  removeFromCart(eventId: string): void {
    this.cart.items = this.cart.items.filter(
      (item) => item.event.id != eventId
    );
    this.setCartToLocalStorage();
  }

  changeQuantity(eventId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.event.id === eventId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.event.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }
  getCart(): Cart {
    return this.cartSubject.value; //gets the latest value of the cart
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    //notify all listeners of the cart observable
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
