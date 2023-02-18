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
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SellerproductlistComponent } from './seller/sellerproductlist/sellerproductlist.component';
import { SellerOrdersComponent } from './seller/seller-orders/seller-orders.component';
import { AddnewproductComponent } from './seller/addnewproduct/addnewproduct.component';
import { CartComponent } from './user/cart/cart.component';
import { MyordersComponent } from './user/myorders/myorders.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UpdateproductComponent } from './seller/updateproduct/updateproduct.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signin', component: SignUpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'productdetail/:id', component: ProductDetailComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  //` Admin routes
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/allusers',
    component: AllUsersComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/allsellers',
    component: AllSellersComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/allproductlist',
    component: AllproductlistComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/allorders',
    component: AllordersComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  //` Seller routes
  {
    path: 'seller',
    component: SellerHomeComponent,
    canActivate: [AuthGuard],
    data: { role: 'seller' },
  },
  {
    path: 'seller/sellerproductlist',
    component: SellerproductlistComponent,
    canActivate: [AuthGuard],
    data: { role: 'seller' },
  },
  {
    path: 'seller/sellerorders',
    component: SellerOrdersComponent,
    canActivate: [AuthGuard],
    data: { role: 'seller' },
  },
  {
    path: 'seller/addnewproduct',
    component: AddnewproductComponent,
    canActivate: [AuthGuard],
    data: { role: 'seller' },
  },
  {
    path: 'seller/updateproduct/:id',
    component: UpdateproductComponent,
    canActivate: [AuthGuard],
    data: { role: 'seller' },
  },

  //` User routes
  {
    path: 'user',
    component: UserHomeComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' },
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' },
  },
  {
    path: 'myorder',
    component: MyordersComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
