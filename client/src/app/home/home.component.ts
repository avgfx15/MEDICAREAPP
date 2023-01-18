import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserAuthGuard } from '../user-auth.guard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private userService: UserAuthGuard) {}
  // getRole() {
  //   const role = this.userService.getRole();
  //   console.log(role);
  // }
}
