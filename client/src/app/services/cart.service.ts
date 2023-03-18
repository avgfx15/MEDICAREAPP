import { Injectable } from '@angular/core';
import { CartItemModel, CartModel } from '../models/cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<CartModel> = new BehaviorSubject(this.getCartData());
  removeCart: boolean = false;
  constructor() {
    /* TODO document why this constructor is empty */
  }

  // + Create Initialized Cart in localstorage and Call in OrderModule for One time when site Open
  initCartLocalStorage() {
    const cart: CartModel = this.getCartData();

    if (!cart) {
      const initialCart = { items: [] };
      localStorage.setItem('cart', JSON.stringify(initialCart));
    }
  }

  // ? Get Cart Data from local storage

  getCartData(): CartModel {
    const cart: CartModel = JSON.parse(localStorage.getItem('cart')!);
    return cart;
  }

  //+ Set CartItems

  setCartItems(cartItem: CartItemModel): CartModel {
    const cart = this.getCartData();
    if (cart.items && cartItem) {
      const cartItemExist = cart.items.find(
        (item) => item.productId === cartItem.productId
      );

      if (cartItemExist) {
        cart.items.forEach((item) => {
          if (item.productId === cartItem.productId) {
            item.orderQty = item.orderQty! + cartItem.orderQty!;
            this.removeCart = true;
            alert(
              `Product is already in Cart, So increase orderQty by ${item.orderQty}`
            );
          }
        });
      } else {
        this.removeCart = false;
        cart.items.push(cartItem);
      }
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem('cart', cartJson);
    this.cart$.next(cart);
    return cart;
  }

  // - Delete Product From Cart By ProductId

  deleteProductFromCartByProductId(productId: string) {
    const cart = this.getCartData();
    const newCart = cart.items.filter((item) => item.productId !== productId);
    cart.items = newCart;

    const cartJson = JSON.stringify(cart);
    localStorage.setItem('cart', cartJson);
    this.cart$.next(cart);
  }
}
