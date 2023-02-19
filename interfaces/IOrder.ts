export interface IOrder {
  _id?: string;
  customer: string;
  address: string;
  total: number;
  status: number;
  method: number;
}
