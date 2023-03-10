import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {
    /* TODO document why this constructor is empty */
  }

  productAddTOLocalstorage(data: ProductModel) {
    let cartData = [];
    let localStorageCart = localStorage.getItem('localStorageCart');
    if (!localStorageCart) {
      localStorage.setItem('localStorageCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localStorageCart);
      cartData.push(data);
      localStorage.setItem('localStorageCart', JSON.stringify(cartData));
    }
  }
}
