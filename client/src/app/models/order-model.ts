import { OrderItems } from './order-items';
import { UserModel } from './user-model';

export class OrderModel {
  id?: string = '';
  orderItems?: OrderItems[];
  orderDate?: string;
  user?: any;
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zipcode?: string;
  country?: string;
  totalPrice?: number;
  isPaid?: boolean;
  paidAt?: string;
  isDelivered?: boolean;
  deliveredAt?: string;
  paymentMethod?: string;
}
