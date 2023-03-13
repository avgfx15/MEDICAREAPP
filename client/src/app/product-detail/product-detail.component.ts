import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../models/product';

import { SellerService } from '../services/seller.service';
import { UserModel } from '../models/user-model';
import { CookieService } from 'ngx-cookie-service';
import { UserAuthService } from '../services/user-auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  resData: any = [];
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  productDetails: ProductModel | undefined;
  sellerName: UserModel | undefined;
  orderQty: number = 1;
  removeCart: boolean = false;
  constructor(
    private sellerService: SellerService,
    private activedRoute: ActivatedRoute,
    private cookieService: CookieService,
    private userAuthService: UserAuthService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    /// Get product Id
    const productId = this.activedRoute.snapshot.paramMap.get('id');

    productId && this.getProductByProductId(productId);

    let cartData = localStorage.getItem('localStorageCart');

    if (productId && cartData) {
      let cartProducts = JSON.parse(cartData);
      cartProducts = cartProducts.filter(
        (product: ProductModel) => productId === product._id
      );
      if (cartProducts.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
  }

  //? Get Product Details By Product Id From Params
  getProductByProductId(id: string) {
    this.sellerService.getProductByProductId(id).subscribe({
      next: (res) => {
        this.resData = res;

        if (this.resData.resStatus === false) {
          this.isDisabled = true;
          this.success = false;
          this.showMsg = this.resData.errorMessage;
          setTimeout(() => {
            this.isDisabled = false;
          }, 3000);
        }
        if (this.resData.Product != undefined) {
          this.isDisabled = true;
          this.success = true;
          this.showMsg = this.resData.successMessage;
          this.productDetails = this.resData.Product;

          this.sellerName = this.resData.User;

          setTimeout(() => {
            this.isDisabled = false;
          }, 3000);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // + Add To Cart Product
  addToCart() {
    if (this.productDetails) {
      this.productDetails.productQty = this.orderQty;

      if (!localStorage.getItem('userData')) {
        this.productService.productAddTOLocalstorage(this.productDetails);
        this.removeCart = true;
      } else {
        let userData = localStorage.getItem('userData');
        let userId = userData && JSON.parse(userData).user._id;
        console.log(userId);
      }
    }
  }

  // - Remove From Cart Product
  removeFromCart(id: string) {
    this.productService.removeFromLocalstorage(id);
    this.removeCart = false;
  }

  // + Product Qty Handle
  handleQty(val: string) {
    if (this.orderQty < 20 && val === 'plus') {
      this.orderQty += 1;
    }
    if (this.orderQty > 1 && val === 'minus') {
      this.orderQty -= 1;
    }
  }
}
