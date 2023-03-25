import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit {
  resData: any;
  cartData: any;
  productData: any;
  totalPrice: number = 0;
  isCheckout: boolean = false;
  constructor(
    private cartService: CartService,
    private sellerService: SellerService,
    private router: Router,
    private orderService: OrderService
  ) {
    this.router.url.includes('checkout')
      ? (this.isCheckout = true)
      : (this.isCheckout = false);
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.cartService.cart$.pipe().subscribe({
      next: (res) => {
        this.totalPrice = 0;
        this.cartData = res;

        if (this.cartData) {
          this.cartData.items.map((item: any) => {
            this.sellerService
              .getProductByProductId(item.productId)
              .subscribe((productRes: any) => {
                this.productData = productRes;
                this.totalPrice +=
                  this.productData.Product.productPrice * item.orderQty;
              });
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //? Get All Orders

  getAllOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.resData = res;
        console.log(this.resData);
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  // ? Got To CheckOut Page

  gotToCheckoutPage() {
    this.router.navigate(['/checkout']);
  }
}
