import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../models/user-model';
import { SignupService } from '../services/signup.service';

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
  errorMsg: string = '';
  isSignUp: boolean = true;
  constructor(private signupServices: SignupService, private router: Router) {
    /* TODO document /* TODO document why this method 'ngOnInit' is empty */
  }
  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }

  signUp(signUpFormData: UserModel) {
    this.signupServices.SignupForm(signUpFormData).subscribe((res) => {
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
}
