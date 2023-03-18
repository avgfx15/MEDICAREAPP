import { ProductModel } from './product';

export class OrderItems {
  product?: ProductModel;
  orderQty?: number = 1;
}
