import { IContext } from '@interfaces/IContext';
import { IOrder } from '@interfaces/IOrder';
import { IProduct } from '@interfaces/IProduct';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';

const Index = ({
  orders,
  products,
}: {
  orders: IOrder[];
  products: IProduct[];
}) => {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ['preparing', 'on the way', 'delivered'];

  const handleDelete = async (id?: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/products/${id}`);
      if (id) {
        setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id?: string) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/api/orders/${id}`,
        {
          status: currentStatus + 1,
        }
      );
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex p-12">
      <div className="flex-1">
        <h1 className="title font-bold text-4xl mb-5">Products</h1>
        <table className="w-full border-spacing-5 text-left">
          <tbody>
            <tr className="trTitle">
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {pizzaList.map((product) => (
            <tbody key={product._id}>
              <tr className="trTitle">
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    style={{ objectFit: 'cover' }}
                    alt=""
                  />
                </td>
                <td>{product._id && product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button className="bg-teal-600 text-white p-1 cursor-pointer mr-3">
                    Edit
                  </button>
                  <button
                    className="bg-rose-600 text-white p-1 cursor-pointer"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className="flex-1">
        <h1 className="title font-bold text-4xl mb-5">Orders</h1>
        <table className="w-full border-spacing-5 text-left">
          <tbody>
            <tr className="trTitle">
              <th className="pl-4">Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className="trTitle">
                <td className="p-4">{order._id && order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    className="bg-rose-600 text-white p-1 cursor-pointer"
                    onClick={() => handleStatus(order._id)}
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx: IContext) => {
  // const myCookie = ctx.req?.cookies || '';
  const myToken = ctx.req?.cookies.token || '';

  if (myToken !== process.env.TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    };
  }

  const productRes = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/products`
  );
  const orderRes = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/orders`);

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
