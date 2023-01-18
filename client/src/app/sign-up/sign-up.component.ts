import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/user-model';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../header/header.component';

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
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {
    /* TODO document /* TODO document why this method 'ngOnInit' is empty */
  }
  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
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
    this.userService.SignInForm(signInFormData).subscribe(
      (res: any) => {
        if (res.resStatus === false) {
          this.isDisabled = true;
          this.success = false;
          this.showMsg = res.errorMessage;
          setTimeout(() => {
            this.isDisabled = false;
          }, 3000);
        } else {
          this.userAuthService.setUserData(res);
          this.userAuthService.setToken(res.token);
          this.userAuthService.setRole(res.user.role);
          const role = res.user.role;
          if (role === 'admin') {
            this.router.navigate(['/admin']);
          } else if (role === 'seller') {
            this.router.navigate(['/seller']);
          } else if (role === 'user') {
            this.router.navigate(['/user']);
          } else {
            this.router.navigate(['']);
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //` Toggle between Sign Up and Sign In form
  openToggleForm() {
    this.isSignUp = !this.isSignUp;
  }
}
