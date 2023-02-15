import { Component } from '@angular/core';
import { ProductModel } from 'src/app/models/product';
import { UserModel } from 'src/app/models/user-model';
import { SellerService } from 'src/app/services/seller.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent {
  resData: any = [];
  allUsers: UserModel[] = [];
  noOfUsers: number = 0;
  allProducts: ProductModel[] = [];
  noOfProducts: number = 0;
  noOfOrders: number = 0;
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  constructor(
    private userService: UserService,
    private sellerService: SellerService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    /// No Of All Users reloadedon page loading
    this.noOfAllUsers();
    /// No Of All Products reloadedon page loading
    this.noOfAllProducts();
  }

  /// No Of All Users data
  noOfAllUsers() {
    this.userService.getAllUsers().subscribe({
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

  /// No of All Products Data get
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
}
