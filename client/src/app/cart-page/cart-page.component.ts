import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CartItemDetailsModel, CartItemModel } from '../models/cart';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartData: any;
  productData: any;
  cartItemsDetails: CartItemDetailsModel[] = [];
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

  // / Back to Home Page Function
  backToHome() {
    this.router.navigate(['/']);
  }

  // ? Get Cart Data From Localstorage

  getCartData() {
    this.cartService.cart$.pipe().subscribe({
      next: (res) => {
        this.cartItemsDetails = [];
        this.cartData = res;
        this.cartData.items.forEach((cartItem: CartItemModel) => {
          this.sellerService
            .getProductByProductId(cartItem.productId)
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
}
