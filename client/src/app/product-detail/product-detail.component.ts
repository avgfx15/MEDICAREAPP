import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../models/product';

import { SellerService } from '../services/seller.service';
import { UserModel } from '../models/user-model';
import { CartService } from '../services/cart.service';
import { CartItemModel, CartModel } from '../models/cart';

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
  productQuentity: number = 0;
  constructor(
    private sellerService: SellerService,
    private activedRoute: ActivatedRoute,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    /// Get product Id
    const productId = this.activedRoute.snapshot.paramMap.get('id');

    productId && this.getProductByProductId(productId);

    let cartItemExist: CartModel = this.cartService.getCartData();
    if (cartItemExist && productId) {
      cartItemExist.items.forEach((item: CartItemModel) => {
        productId === item.productId.toString();
        console.log(productId);
        console.log(item.productId);
      });
      if (cartItemExist.items.length) {
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
          this.productQuentity = this.productDetails?.productQty ?? 0;
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

  // + Product Qty Handle
  handleQty(val: string) {
    if (this.orderQty < this.productQuentity && val === 'plus') {
      this.orderQty += 1;
    }
    if (this.orderQty > 1 && val === 'minus') {
      this.orderQty -= 1;
    }
  }

  //+ Add To Cart

  addToCart(productId: string) {
    const cartItem: CartItemModel = {
      productId: productId,
      orderQty: this.orderQty,
    };

    this.cartService.setCartItems(cartItem);
  }
}
