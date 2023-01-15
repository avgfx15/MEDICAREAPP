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
    this.isDisabled = true;
    this.success = false;
    this.userService.errorMessage.subscribe((errorMsg) => {
      this.showMsg = errorMsg;
    });
    this.userService.successMessage.subscribe((successMsg) => {
      this.showMsg = successMsg;
    });
    setTimeout(() => {
      this.isDisabled = false;
    }, 3000);
  }

  //` Toggle between Sign Up and Sign In form
  openToggleForm() {
    this.isSignUp = !this.isSignUp;
  }
}
