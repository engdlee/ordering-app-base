import { IExtraOption } from './IExtraOption';

export interface IProduct {
  _id?: string;
  title: string;
  desc: string;
  img: string;
  prices: number[];
  extraOptions?: IExtraOption[];
}

export interface IProductOrder extends IProduct {
  price: number;
  quantity: number;
  extras: IExtraOption[];
}
