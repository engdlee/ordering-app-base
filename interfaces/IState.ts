import { IProduct } from './IProduct';

export interface IState {
  products: IProduct[];
  quantity: number;
  total: number;
}
