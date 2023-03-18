import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ProductModel } from '../models/product';
import { AdminService } from './admin.service';
import { SellerService } from './seller.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  Products: ProductModel[] = [];
  constructor(
    private cookieService: CookieService,
    private adminService: AdminService,
    private sellerService: SellerService,
    private productService: ProductService
  ) {
    /* TODO document why this constructor is empty */
  }

  /// Save userData in localstorage after login
  setUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  /// Get userData when required
  getUserData() {
    return localStorage.getItem('userData');
  }

  /// Set Role in localstorage when user after login
  public setRole(role: string) {
    localStorage.setItem('roles', JSON.stringify(role));
  }
  /// Get Role of user after login
  public getRole() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const role = userData?.user?.role;
    return role;
  }

  /// Set token in localstorage when user login
  public setToken(token: string) {
    localStorage.setItem('token', token);
  }
  /// Get token of user
  public getToken() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const token = userData?.token;
    return token;
  }

  /// On Logout clear or remove all userData, token userrole from local storage
  public clearStorage() {
    localStorage.clear();
  }

  /// Set cookie userId
  public setCookie(_key: string, jwtToken: string) {
    this.cookieService.set('jwtToken', jwtToken, 0.25);
  }

  /// get Cookie userId

  public getSingleCookie(key: string) {
    const token = this.cookieService.get(key);

    return token;
  }

  /// Delete single cookie token or userId
  public deleteCookie(key: string) {
    this.cookieService.delete(key);
  }

  /// Delete All Cookies
  public deleteAllCookies() {
    this.cookieService.deleteAll();
  }

  /// Check if userData stored in localStoragethen userLoogedIn then no need to display signin Navigation
  public userLoggedIn() {
    return this.getUserData();
  }

  //+ Set Product In Localstorage
  public setProduct(product: ProductModel) {
    localStorage.setItem('Product', JSON.stringify(product));
  }

  // ? Get Product From Localstorage
  public getProduct() {
    const product = JSON.parse(localStorage.getItem('product') || '{}');
    return product;
  }

  // + Get All Products from LocalStorage
  public setAllProductInLocalStorage(Products: ProductModel) {
    localStorage.setItem('All Product', JSON.stringify(Products));
  }

  // ? Set All Products in LocalStorage
  public getAllProductsFromLocalstorage() {
    const Products = JSON.parse(localStorage.getItem('products') || '[]');
    return Products;
  }

  //+ LocalCart To Remote Database
  localCartToRemoteDatabase() {
    const cartData = localStorage.getItem('localStorageCart');
    if (cartData) {
      let orderItems: ProductModel[] = JSON.parse(cartData);
      let user = localStorage.getItem('userData');
      let userId = user && JSON.parse(user).id;
      orderItems.forEach((product, index) => {
        let cartToDb: any = {
          ...product,
          productId: product._id,
          userId: userId,
        };
        delete cartToDb.id;

        if (orderItems.length === index) {
          localStorage.removeItem('localStorageCart');
        }
      });
    }
  }
}
