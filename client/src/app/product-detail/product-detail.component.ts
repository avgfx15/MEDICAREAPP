import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from '../models/product';

import { SellerService } from '../services/seller.service';

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
  productDetails: any = {};
  constructor(
    private sellerService: SellerService,
    private activedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    /// Get product Id
    const productId = this.activedRoute.snapshot.paramMap.get('id');

    productId && this.getProductByProductId(productId);
  }
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
        this.isDisabled = true;
        this.success = true;
        this.showMsg = this.resData.successMessage;
        this.productDetails = this.resData.Product;
        console.log(this.resData.Product.productName);

        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
