import { OrderItems } from './order-items';
import { UserModel } from './user-model';

export class OrderModel {
  id: string = '';
  orderItems?: OrderItems;
  orderDate?: string;
  user?: UserModel;
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  postalCode?: number;
  country?: string;
  totalPrice?: number;
  isPaid?: string;
  paidAt?: string;
  isDelivered?: boolean;
  deliveredAt?: string;
  paymentMethod?: string;
}
