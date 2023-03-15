import { EventEmitter, Injectable } from '@angular/core';
import { ProductModel } from '../models/product';
import { Cart } from '../models/cart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cartData = new EventEmitter<ProductModel[] | []>();
  constructor(private httpClient: HttpClient) {
    /* TODO document why this constructor is empty */
  }

  // + Add Product To LocalStorage
  productAddTOLocalstorage(data: ProductModel) {
    let cartData = [];
    let localStorageCart = localStorage.getItem('localStorageCart');
    if (!localStorageCart) {
      localStorage.setItem('localStorageCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localStorageCart);
      cartData.push(data);
      localStorage.setItem('localStorageCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  // + Add To Cart By User LoggedIn
  addToCart(orderCartData: Cart) {
    console.log('ProductService.addToCart');
    return this.httpClient.post(
      'http://localhost:3700/neworder',
      orderCartData
    );
  }

  //+ Add Shipping Address
  addShippingAddress(addressForm: any) {
    return this.httpClient.post(
      'http://localhost:3700/shippingaddress',
      addressForm
    );
  }

  // - Product Remove From LocalStorage
  removeFromLocalstorage(id: string) {
    let cartData = localStorage.getItem('localStorageCart');
    if (cartData) {
      let orderData: ProductModel[] = JSON.parse(cartData);
      orderData = orderData.filter(
        (product: ProductModel) => product._id !== id
      );
      localStorage.setItem('localStorageCart', JSON.stringify(orderData));
      this.cartData.emit(orderData);
    }
  }
}
