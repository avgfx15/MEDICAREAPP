import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CartItemDetailsModel, CartItemModel } from '../models/cart';
import { SellerService } from '../services/seller.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  cartData: any;
  productData: any;
  cartItemsDetails: CartItemDetailsModel[] = [];
  cartCount: number = 0;
  showMsg: string = '';
  isDisabled: boolean = false;
  endSubs: Subject<any> = new Subject();
  constructor(
    private router: Router,
    private cartService: CartService,
    private sellerService: SellerService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getCartData();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.endSubs.next('');
    this.endSubs.complete();
  }

  // / Back to Home Page Function
  backToHome() {
    this.router.navigate(['/']);
  }

  // ? Get Cart Data From Localstorage

  getCartData() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs)).subscribe({
      next: (res) => {
        this.cartData = res;
        this.cartItemsDetails = [];
        this.cartCount = this.cartData.items.length;
        if (this.cartCount === 0) {
          this.isDisabled = true;
          this.showMsg = 'No Product in Cart';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        }
        this.cartData.items.forEach((cartItem: CartItemModel) => {
          this.sellerService
            .getProductByProductId(cartItem.productId!)
            .subscribe((res) => {
              this.productData = res;

              if (this.productData.resStatus === false) {
                console.log(this.productData.errorMessage);
              }

              this.cartItemsDetails.push({
                product: this.productData.Product,
                orderQty: cartItem.orderQty,
              });
            });
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // - Delete Product From Cart

  deleteProductFromCart(productId: string) {
    this.cartService.deleteProductFromCartByProductId(productId);
  }

  // + Updated Cart Item Qty
  updateOrderQty(event: any, cartItemDetails: CartItemDetailsModel) {
    console.log(cartItemDetails.product._id);
    console.log(event.value);

    this.cartService.setCartItems(
      {
        productId: cartItemDetails.product._id,
        orderQty: event.value,
      },
      true
    );
  }
}
