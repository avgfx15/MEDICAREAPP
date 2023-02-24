import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-all-sellers',
  templateUrl: './all-sellers.component.html',
  styleUrls: ['./all-sellers.component.css'],
})
export class AllSellersComponent implements OnInit {
  resData: any;
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  allSellers: UserModel[] = [];
  index: number = 1;

  constructor(private adminService: AdminService) {}
  ngOnInit(): void {
    this.getAllSellersData();
  }
  getAllSellersData() {
    this.adminService.getAllSellers().subscribe({
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
        this.allSellers = this.resData.AllSellers;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getUserByUserId(id: string) {
    console.log(id);
  }
}
