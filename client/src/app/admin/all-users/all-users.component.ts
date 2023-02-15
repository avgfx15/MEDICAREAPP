import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

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
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllUsersList();
  }

  getAllUsersList() {
    this.userService.getAllUsers().subscribe({
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
}
