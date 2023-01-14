import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/user-model';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  resData: any = {};
  isDisabled: boolean = false;
  success: boolean = false;
  userRole: string = '';
  showMsg: string = '';
  errorMsg: string = '';
  isSignUp: boolean = true;
  constructor(private userService: UserService, private router: Router) {
    /* TODO document /* TODO document why this method 'ngOnInit' is empty */
  }
  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
    this.userService.reloadUser();
  }

  //` Sign Up Form
  signUp(signUpFormData: UserModel) {
    this.userService.SignupForm(signUpFormData).subscribe((res) => {
      this.resData = res;
      if (res) {
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
            this.router.navigate(['/']);
          }, 3000);
        }
      }
    });
  }

  //` Sign In Form
  signIn(signInFormData: UserModel) {
    this.userService.SignInForm(signInFormData);
    /// resStatus is true then define route as per userRole

    this.userService.resStatus.subscribe((resStatus) => {
      /// If Status is true then show message from backend save seller data in localstorage and redirect to sellerhome route
      if (resStatus) {
        this.isDisabled = true;
        this.success = true;
        this.userService.userRole.subscribe((userRole) => {
          this.userRole = userRole;
          /// If userRole is admin then showMsg and navigate to admin dashboard
          // if (this.userRole === 'admin') {
          //   this.isDisabled = true;
          //   this.success = true;
          //   this.userService.successMessage.subscribe((successMessage) => {
          //     this.showMsg = successMessage;
          //   });
          //   setTimeout(() => {
          //     this.isDisabled = false;
          //     this.router.navigate(['admin']);
          //   }, 3000);
          // } else if (this.userRole === 'seller') {
          //   /// If userRole is seller then showMsg and navigate to seller dashboard
          //   this.isDisabled = true;
          //   this.success = true;
          //   this.userService.successMessage.subscribe((successMessage) => {
          //     this.showMsg = successMessage;
          //   });
          //   setTimeout(() => {
          //     this.isDisabled = false;
          //     this.router.navigate(['seller']);
          //   }, 3000);
          // } else {
          //   /// If userRole is user then showMsg and navigate to user dashboard
          //   this.isDisabled = true;
          //   this.success = true;
          //   this.userService.successMessage.subscribe((successMessage) => {
          //     this.showMsg = successMessage;
          //   });
          //   setTimeout(() => {
          //     this.isDisabled = false;
          //     this.router.navigate(['user']);
          //   }, 3000);
          // }
          switch (this.userRole) {
            case 'admin':
              this.isDisabled = true;
              this.success = true;
              this.userService.successMessage.subscribe((successMessage) => {
                this.showMsg = successMessage;
              });
              setTimeout(() => {
                this.isDisabled = false;
                this.router.navigate(['admin']);
              }, 3000);
              break;
            case 'seller':
              this.isDisabled = true;
              this.success = true;
              this.userService.successMessage.subscribe((successMessage) => {
                this.showMsg = successMessage;
              });
              setTimeout(() => {
                this.isDisabled = false;
                this.router.navigate(['seller']);
              }, 3000);
              break;
            case 'user':
              this.isDisabled = true;
              this.success = true;
              this.userService.successMessage.subscribe((successMessage) => {
                this.showMsg = successMessage;
              });
              setTimeout(() => {
                this.isDisabled = false;
                this.router.navigate(['user']);
              }, 3000);
              break;

            default:
              break;
          }
        });
      } else {
        console.log(resStatus);

        /// If Status is false then show message from backend restrict to access secure route
        this.isDisabled = true;
        this.success = false;
        this.userService.errorMessage.subscribe((message) => {
          this.showMsg = message;
          console.log(message);
        });
        setTimeout(() => {
          this.isDisabled = false;
          this.router.navigate(['signup']);
        }, 3000);
      }
    });
  }

  //` Toggle between Sign Up and Sign In form
  openToggleForm() {
    this.isSignUp = !this.isSignUp;
  }
}
