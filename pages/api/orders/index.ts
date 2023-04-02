import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@lib/dbConnect';
import Order from '@models/Order';
import { IOrder } from '@interfaces/IOrder';

type Data = IOrder[] | string;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method } = req;

  await dbConnect();

  if (method === 'GET') {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
  if (method === 'POST') {
    try {
      const order = await Order.create(req.body);
      res.status(201).json(order);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
};

export default handler;
