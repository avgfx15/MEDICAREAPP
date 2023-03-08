import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent {
  resData: any = [];
  success: boolean = false;
  isDisabled: boolean = false;
  showMsg: string = '';
  allUserList: UserModel[] = [];
  userData: UserModel | undefined;
  allRoles: any = [];
  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllUsersList();

    const userId = this.activatedRoute.snapshot.paramMap.get('id');

    userId && this.getUserByUserId(userId);
  }

  //? Get All Users Data
  getAllUsersList() {
    this.adminService.getAllUsers().subscribe({
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
        this.allUserList = this.resData.AllUsers;
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

  // ? Get USerData By UserId
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
        this.isDisabled = true;
        this.success = true;
        this.userData = this.resData.User;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  //- Delete User By UserId
  deleteUserByUserId(id: string) {
    this.adminService.deleteUserByUserId(id).subscribe({
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
          this.getAllUsersList();
        }, 3000);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
