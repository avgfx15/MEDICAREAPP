import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller/seller-home/seller-home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { AllSellersComponent } from './admin/all-sellers/all-sellers.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AllproductlistComponent } from './admin/allproductlist/allproductlist.component';
import { AllordersComponent } from './admin/allorders/allorders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SignUpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'admin',
    component: AdminHomeComponent,
  },
  {
    path: 'seller',
    component: SellerHomeComponent,
  },
  { path: 'user', component: UserHomeComponent },
  {
    path: 'admin/allusers',
    component: AllUsersComponent,
  },
  {
    path: 'admin/allsellers',
    component: AllSellersComponent,
  },
  {
    path: 'admin/allproductlist',
    component: AllproductlistComponent,
  },
  {
    path: 'admin/allorders',
    component: AllordersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
