import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@lib/dbConnect';
import Order from '@models/Order';
import { IOrder } from '@interfaces/IOrder';

type Data = IOrder | string;

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === 'GET') {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
  if (method === 'PUT') {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
  if (method === 'DELETE') {
  }
};

export default handler;
