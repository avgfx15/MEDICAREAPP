export class CartModel {
  items: CartItemModel[] = [];
}

export class CartItemModel {
  productId: string = '';
  orderQty?: number;
}
