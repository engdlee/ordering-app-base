import { IProduct, IProductOrder } from './IProduct';

export interface ICart {
  products: IProductOrder[];
  quantity: number;
  total: number;
}
