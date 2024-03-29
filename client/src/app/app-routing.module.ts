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
import { MyordersComponent } from './user/myorders/myorders.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UpdateproductComponent } from './seller/updateproduct/updateproduct.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { AdminUpdateProductComponent } from './admin/admin-update-product/admin-update-product.component';
import { SearchProductPageComponent } from './search-product-page/search-product-page.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ThanksPageComponent } from './thanks-page/thanks-page.component';
import { FailPaymentComponent } from './fail-payment/fail-payment.component';
import { OrderViewComponent } from './order-view/order-view.component';

const routes: Routes = [
  //! Common Routes

  { path: '', component: HomeComponent },
  { path: 'signin', component: SignUpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'productdetail/:id', component: ProductDetailComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'search/:searchquery', component: SearchProductPageComponent },
  { path: 'cartpage', component: CartPageComponent },
  { path: 'thanks', component: ThanksPageComponent },
  { path: 'failure', component: FailPaymentComponent },

  //! Admin routes
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
  {
    path: 'admin/updateuser/:id',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/updateproduct/:id',
    component: AdminUpdateProductComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'admin/orderlist',
    component: OrderListComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  //! Seller routes
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

  //! User routes
  {
    path: 'user',
    component: UserHomeComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' },
  },
  {
    path: 'myorder',
    component: MyordersComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' },
  },
  {
    path: 'checkout',
    component: CheckOutComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' },
  },
  {
    path: 'myorder/orderview/:id',
    component: OrderViewComponent,
    canActivate: [AuthGuard],
    data: { role: 'user' && 'admin' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
