import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  resData: any;
  ordersCount: number = 0;
  userData: UserModel | undefined;
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.userData = this.userAuthService.getUserData().user;

    this.getOrdersCountByUser();
  }

  getOrdersCountByUser() {
    this.userService.getCountOfAllOrdersByUser().subscribe({
      next: (res) => {
        this.resData = res;
        if (this.resData.resStatus === false) {
          this.ordersCount = this.resData.TotalOrderCount;
        }
        this.ordersCount = this.resData.TotalOrderCount;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
