import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CategoryModel } from 'src/app/models/category';
import { ProductModel } from 'src/app/models/product';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-addnewproduct',
  templateUrl: './addnewproduct.component.html',
  styleUrls: ['./addnewproduct.component.css'],
})
export class AddnewproductComponent {
  resData: any = [];
  showMsg: string = '';
  isDisabled: boolean = false;
  success: boolean = false;
  Categories: any;
  Images: any;
  imageData: string = '';
  addNewProductFormData: any;
  constructor(private sellerService: SellerService, private router: Router) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllCategories();
  }

  /// Add New Category Form
  addCategory(categoryForm: CategoryModel) {
    this.sellerService.addCategory(categoryForm).subscribe({
      next: (res) => {
        this.resData = res;

        if (this.resData.resStatus === false) {
          this.isDisabled = true;
          this.success = false;
          this.showMsg = this.resData.errorMessage;
          setTimeout(() => {
            this.isDisabled = false;
          }, 3000);
        } else {
          this.isDisabled = true;
          this.success = true;
          this.showMsg = this.resData.successMessage;
          setTimeout(() => {
            this.isDisabled = false;
          }, 3000);
        }
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

  ///GET AL CATEGORIES

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

  /// Add New Product Form
  addNewProduct(addNewProductFormData: ProductModel) {
    this.sellerService.addNewProduct(addNewProductFormData).subscribe({
      next: (res) => {
        this.resData = res;

        if (this.resData.resStatus === false) {
          this.isDisabled = true;
          this.success = false;
          this.showMsg = this.resData.errorMessage;
          setTimeout(() => {
            this.isDisabled = false;
          }, 3000);
        } else {
          this.isDisabled = true;
          this.success = true;
          this.showMsg = this.resData.successMessage;

          setTimeout(() => {
            this.isDisabled = false;
          }, 3000);
        }
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
