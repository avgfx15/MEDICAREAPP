import { Component } from '@angular/core';
import { Cart } from '../models/cart';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.css'],
})
export class ShippingAddressComponent {
  resData: any;
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  shippingAddressForm: any;

  constructor(private productService: ProductService) {}

  addressForm(shippingAddressForm: any) {
    this.productService.addShippingAddress(shippingAddressForm).subscribe({
      next: (res) => {
        this.resData = res;
        console.log(this.resData);
      },
      error: (error) => {
        console.log(error);
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify(shippingAddressForm)
    );
  }
}
