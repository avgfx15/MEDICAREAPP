import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { UserAuthGuard } from './user-auth.guard';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller/seller-home/seller-home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'admin/users',
    component: AllUsersComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'seller',
    component: SellerHomeComponent,
    canActivate: [UserAuthGuard],
  },
  { path: 'user', component: UserHomeComponent, canActivate: [UserAuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
