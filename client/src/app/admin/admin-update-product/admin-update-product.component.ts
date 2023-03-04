import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductModel } from 'src/app/models/product';
import { AdminService } from 'src/app/services/admin.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-admin-update-product',
  templateUrl: './admin-update-product.component.html',
  styleUrls: ['./admin-update-product.component.css'],
})
export class AdminUpdateProductComponent implements OnInit {
  resData: any;
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  Categories: any;
  productDetails: ProductModel | undefined;
  constructor(
    private adminService: AdminService,
    private sellerService: SellerService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    //? get Product Id from header
    const productId = this.activatedRoute.snapshot.paramMap.get('id');

    productId && this.getProductByProductId(productId);

    //? Get all Categories
    this.getAllCategories();
  }

  // * Update ProductBy ProductId By Authentic User

  updateProductBySellerByProductId(updateProductForm: ProductModel) {
    if (this.productDetails) {
      updateProductForm._id = this.productDetails._id;
    }
    this.adminService
      .updateProductByProductIdByAdminUser(updateProductForm)
      .subscribe({
        next: (res) => {
          this.resData = res;
          console.log(this.resData);

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
          setTimeout(() => {
            this.router.navigate(['/admin/allproductlist']);
          }, 3000);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // ? Get Product By ProductId
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
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //? GET AL CATEGORIES

  getAllCategories() {
    this.sellerService.getAllCategories().subscribe({
      next: (res) => {
        this.Categories = res;
      },
      error: (error) => {
        this.isDisabled = true;
        this.success = false;
        this.showMsg = error;
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      },
    });
  }
}
