import { Component } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { UserModel } from 'src/app/models/user-model';
import { AdminService } from 'src/app/services/admin.service';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  resData: any = [];
  allUsers: UserModel[] = [];
  allSellers: UserModel[] = [];
  noOfUsers: number = 0;
  noOfSellers: number = 0;
  allProducts: ProductModel[] = [];
  noOfProducts: number = 0;
  noOfOrders: number = 0;
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  totalOrdersCount: number = 0;
  constructor(
    private adminService: AdminService,
    private sellerService: SellerService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    /// No Of All Users reloadedon page loading
    this.noOfAllUsers();
    /// No Of All Sellers reloadedon page loading
    this.noOfAllSellers();
    /// No Of All Products reloadedon page loading
    this.noOfAllProducts();
    /// No Of All Orders reloadedon page loading
    this.getAllOrdersCount();
  }

  //? No Of All Users data
  noOfAllUsers() {
    this.adminService.getAllUsers().subscribe({
      next: (res) => {
        this.resData = res;
        if (this.resData.resStatus === false) {
          this.noOfUsers = 0;
        }
        this.allUsers = this.resData.AllUsers;

        this.noOfUsers = this.allUsers.length;
      },
      error: (error) => {
        this.isDisabled = true;
        this.success = false;
        this.showMsg = this.resData.errorMessage || error;
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      },
    });
  }

  //? No Of All Users data
  noOfAllSellers() {
    this.adminService.getAllSellers().subscribe({
      next: (res) => {
        this.resData = res;
        if (this.resData.resStatus === false) {
          this.noOfUsers = 0;
        }
        this.allSellers = this.resData.AllSellers;

        this.noOfSellers = this.allSellers.length;
      },
      error: (error) => {
        this.isDisabled = true;
        this.success = false;
        this.showMsg = this.resData.errorMessage || error;
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      },
    });
  }

  //? No of All Products Data get
  noOfAllProducts() {
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
        }
        this.allProducts = this.resData.Products;

        this.noOfProducts = this.allProducts.length;
      },
      error: (error) => {
        this.isDisabled = true;
        this.success = false;
        this.showMsg = this.resData.errorMessage || error;
        setTimeout(() => {
          this.isDisabled = false;
        }, 3000);
      },
    });
  }

  // ? Get All Orders Count
  getAllOrdersCount() {
    this.adminService.getAllOrdersCount().subscribe((res) => {
      this.resData = res;
      console.log(this.resData.TotalOrderCount);

      this.totalOrdersCount = this.resData.TotalOrderCount;
      console.log(this.totalOrdersCount);
    });
  }
}
