import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SellerService } from 'src/app/services/seller.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-addnewproduct',
  templateUrl: './addnewproduct.component.html',
  styleUrls: ['./addnewproduct.component.css'],
})
export class AddnewproductComponent {
  resData: any = [];
  showMsg: string = '';
  isDisabled: boolean = false;
  success: boolean = false;
  constructor(
    private sellerService: SellerService,
    private userAuthService: UserAuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}
  addCategory(categoryForm: any) {
    this.sellerService.addCategory(categoryForm).subscribe({
      next: (res) => {
        this.resData = res;

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
            this.isDisabled = false;
          }, 3000);
        }
      },
      error: () => {},
    });
  }
}
