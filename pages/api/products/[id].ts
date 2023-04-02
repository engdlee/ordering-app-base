import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@lib/dbConnect';
import Product from '@models/Product';
import { IProduct } from '@interfaces/IProduct';

type Data = IProduct | string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    method,
    query: { id },
    cookies,
  } = req;
  const token = cookies.token;

  dbConnect();

  if (method === 'GET') {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json(err);
    }
  }

  if (method === 'PUT') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated!');
    }
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json(err);
    }
  }

  if (method === 'DELETE') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated!');
    }
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json('The product has been deleted!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
}
