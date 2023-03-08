import { Component } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { SellerService } from '../../services/seller.service';
import { AdminService } from 'src/app/services/admin.service';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-allproductlist',
  templateUrl: './allproductlist.component.html',
  styleUrls: ['./allproductlist.component.css'],
})
export class AllproductlistComponent {
  resData: any = [];
  allProductList: ProductModel[] = [];
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: any = '';
  sellerId: string = '';
  userdata: UserModel | undefined;
  constructor(
    private sellerService: SellerService,
    public adminService: AdminService
  ) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    /// Reload All Product List on Visit the Page
    this.getAllProductList();
  }

  // ? Get All Products List
  getAllProductList() {
    this.sellerService.getAllProducts().subscribe({
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
          this.allProductList = this.resData.Products;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  // - Delete Product By Product Id
  deleteProduct(id: string) {
    this.sellerService.deleteProductById(id).subscribe({
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
            this.getAllProductList();
          }, 3000);
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // ? Get User By UserId

  getUserByUserId(userId: string) {
    this.adminService.getUserByUserId(userId).subscribe({
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
        this.userdata = this.resData.User;
        console.log(this.userdata);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
