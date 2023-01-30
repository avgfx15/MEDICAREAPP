import { Component } from '@angular/core';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-sellerproductlist',
  templateUrl: './sellerproductlist.component.html',
  styleUrls: ['./sellerproductlist.component.css'],
})
export class SellerproductlistComponent {
  constructor(private userAuthService: UserAuthService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
