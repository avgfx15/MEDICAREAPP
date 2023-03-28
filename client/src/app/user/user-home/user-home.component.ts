import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  constructor(private userService: UserService) {}
  resData: any;
  ordersCount: number = 0;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getOrdersCountByUser();
  }

  getOrdersCountByUser() {
    this.userService.getCountOfAllOrdersByUser().subscribe({
      next: (res) => {
        this.resData = res;
        if (this.resData.resStatus === false) {
          console.log('error');
        }
        this.ordersCount = this.resData.TotalOrderCount;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
