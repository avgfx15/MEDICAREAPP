import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SignIn, UserModel } from '../models/user-model';
import { UserAuthService } from '../services/user-auth.service';
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
  showMsg: string = '';
  isSignUp: boolean = true;

  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
    /* TODO document /* TODO document why this method 'ngOnInit' is empty */
  }
  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }

  //` Sign Up Form
  /// SignupForm service from UserService and then Subscribe
  signUp(signUpFormData: UserModel) {
    /// If response from backend then subscribe
    this.userService.SignupForm(signUpFormData).subscribe((res) => {
      /// Store response in resData variavle
      this.resData = res;
      /// If getting response from backend then progress
      if (res) {
        /// check if response status false from backend then display errorMessage from backend
        if (this.resData.resStatus === false) {
          this.isDisabled = true;
          this.success = false;
          this.showMsg = this.resData.errorMessage;
          setTimeout(() => {
            this.isDisabled = false;
          }, 3000);
        } else {
          /// check if response status true from backend then display successMessage from backend and then navigate to signin form
          this.isDisabled = true;
          this.success = true;
          this.showMsg = this.resData.successMessage;
          setTimeout(() => {
            this.isDisabled = false;
            this.openToggleForm();
          }, 3000);
        }
      }
    });
  }

  //` Sign In Form

  /// SignupForm service from UserService and then Subscribe
  signIn(signInFormData: SignIn) {
    /// If response from backend then subscribe
    this.userService.SignInForm(signInFormData).subscribe({
      next: (res: any) => {
        /// check if response status false from backend then display errorMessage from backend
        if (res.resStatus === false) {
          this.isDisabled = true;
          this.success = false;
          this.showMsg = res.errorMessage;
          setTimeout(() => {
            this.isDisabled = false;
          }, 3000);
        } else {
          /// check if response status true from backend then store userData in localstorage
          this.userAuthService.setUserData(res);
          /// Store token in a extra variable in localstorage
          // this.userAuthService.setToken(res.token);
          /// Store token in a extra variable in localstorage
          // this.userAuthService.setRole(res.user.role);
          /// Set Cookie
          this.cookieService.set('jwt', res.token);
          // this.userAuthService.setCookie('jwtToken', res.token);
          /// Get user role from backend response
          const role = res.user.role;
          /// If user role is admin then navigate to admin home page
          if (role === 'admin') {
            this.router.navigate(['/admin']);
            /// If user role is seller then navigate to seller home page
          } else if (role === 'seller') {
            this.router.navigate(['/seller']);
            /// If user role is user then navigate to user home page
          } else if (role === 'user') {
            this.router.navigate(['/user']);
            /// If no user role then navigate to home page
          } else {
            this.router.navigate(['']);
          }
        }
      },
      /// if any error then get error in console log
      error: (error) => {
        console.log(error);
      },
    });
  }

  //` Toggle between Sign Up and Sign In form
  openToggleForm() {
    this.isSignUp = !this.isSignUp;
  }
}
