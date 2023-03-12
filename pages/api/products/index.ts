import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@lib/dbConnect';
import Product from '@models/Product';
import { IProduct } from '@interfaces/IProduct';

type Data = IProduct[] | string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method, cookies } = req;

  const token = cookies.token;

  dbConnect();

  if (method === 'GET') {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err: any) {
      res.status(500).json(err);
    }
  }

  if (method === 'POST') {
    if (!token || token !== process.env.TOKEN) {
      return res.status(401).json('Not authenticated!');
    }
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err: any) {
      res.status(500).json(err);
    }
  }
}
