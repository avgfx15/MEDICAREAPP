import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SellerService } from 'src/app/services/seller.service';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-addnewproduct',
  templateUrl: './addnewproduct.component.html',
  styleUrls: ['./addnewproduct.component.css'],
})
export class AddnewproductComponent {
  constructor(
    private sellerService: SellerService,
    private userAuthService: UserAuthService,
    private cookieService: CookieService
  ) {}
  addCategory(categoryForm: any) {
    console.log(categoryForm);

    this.sellerService.addCategory(categoryForm).subscribe((res) => {
      console.log('Add New Product 1');
      console.log(res);
      console.log('Add New Product 2');
    });
  }
}
