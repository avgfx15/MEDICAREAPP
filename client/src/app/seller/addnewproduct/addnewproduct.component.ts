import { Component } from '@angular/core';
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
    private userAuthService: UserAuthService
  ) {}
  addCategory(categoryForm: any) {
    console.log(categoryForm);
    this.userAuthService.getSingleCookie('token');
    this.sellerService.addCategory(categoryForm).subscribe((res) => {
      console.log(res);
    });
  }
}
