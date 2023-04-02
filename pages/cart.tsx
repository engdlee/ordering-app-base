import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { reset } from '../redux/cartSlice';
import OrderDetail from '@components/OrderDetail';
import { IExtraOption } from '@interfaces/IExtraOption';
import { ICart } from '@interfaces/ICart';
import { IOrder } from '@interfaces/IOrder';

const Cart = () => {
  const cart = useSelector((state: { cart: ICart }) => state.cart);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const createOrder = async (data: IOrder) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/orders`,
        data
      );
      if (res.status === 201) {
        dispatch(reset());
        router.push(`/orders/${res.data._id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col p-5 md:p-12 md:flex-row lg:flex-col xl:flex-row">
      <div className="w-full md:w-2/4 md:mr-5 lg:mr-0 lg:w-full lg:mb-5 xl:w-3/4 xl:mr-5">
        <table className="flex flex-col items-center justify-center w-full border-spacing-5 text-center lg:table">
          <tbody>
            <tr className="hidden lg:table-row">
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product, index) => (
              <tr
                className="flex flex-col items-center justify-center mb-5 lg:table-row"
                key={`${product._id}_${index}`}
              >
                <td className="p-4">
                  <div className="flex items-center justify-center">
                    <div className="w-[35vw] h-[35vw] md:w-24 md:h-24 relative">
                      <Image
                        src={product.img}
                        fill
                        style={{ objectFit: 'cover' }}
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-medium text-red-400 text-2xl md:text-lg">
                    {product.title}
                  </span>
                </td>
                <td className="p-4">
                  <span className="extras text-xl">
                    {product.extras &&
                      product.extras.map((extra: IExtraOption) => (
                        <span key={extra._id}>{extra.text}, </span>
                      ))}
                  </span>
                </td>
                <td className="p-4">
                  <span className="font-bold lg:hidden">Price: </span>
                  <span className="price text-xl">${product.price}</span>
                </td>
                <td className="lg:text-center">
                  <span className="font-bold lg:hidden">Quantity: </span>
                  <span className="quantity text-xl">{product.quantity}</span>
                </td>
                <td className="p-4">
                  <span className="font-bold lg:hidden">Total: </span>
                  <span className="font-medium text-2xl md:text-lg">
                    ${product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full md:w-2/4 lg:w-2/4 xl:w-1/4">
        <div className="w-full md:w-11/12 max-h-80 bg-gray-600 p-12 pt-3 flex flex-col justify-between text-white">
          <h2 className="title font-bold text-2xl my-3">CART TOTAL</h2>
          <div className="totalText">
            <b className="mr-3">Subtotal:</b>${cart.total}
          </div>
          <div className="totalText">
            <b className="mr-3">Discount:</b>$0.00
          </div>
          <div className="totalText">
            <b className="mr-3">Total:</b>${cart.total}
          </div>
          {open ? (
            <div className="mt-3 flex flex-col">
              <button
                className="py-3 px-1 cursor-pointer mb-1 bg-white text-teal-600 font-bold"
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className="h-8 text-red-400 font-bold cursor-pointer mt-5 bg-white"
            >
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
