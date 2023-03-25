import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user-model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  isDisabled: boolean = false;
  success: boolean = false;
  showMsg: string = '';
  resData: any;
  userData: UserModel | undefined;
  allRoles: any = ['admin', 'seller', 'user'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {
    /* TODO document why this constructor is empty */

    //TODO Pending workaround 
  }
  ngOnInit() {
    /* TODO document why this method 'ngOnInit' is empty */
    let userId = this.activatedRoute.snapshot.paramMap.get('id');

    userId && this.getUserByUserId(userId);
  }

  // ? Update User Data
  userUpdate(userUpdateForm: UserModel) {
    if (this.userData) {
      userUpdateForm._id = this.userData._id;
    }
    this.adminService.updateUserByUserId(userUpdateForm).subscribe({
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
        setTimeout(() => {
          this.isDisabled = false;
          this.router.navigate(['/admin/allusers']);
        }, 3000);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  // ? Get ProductBy ProductId

  getUserByUserId(id: string) {
    this.adminService.getUserByUserId(id).subscribe({
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
        this.userData = this.resData.User;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
