import Image from 'next/image';
import axios from 'axios';
import { IOrder } from '@interfaces/IOrder';
import { MdCheckCircle } from 'react-icons/md';

const Order = ({ order }: { order: IOrder }) => {
  // const order: IOrder = {
  //   _id: 1,
  //   customer: 'Jhon Doe',
  //   address: 'Av. Always Happy 123',
  //   total: 38.9,
  //   status: 1,
  //   method: 3,
  // };
  const status = order.status;

  const statusClass = (index: number) => {
    if (index - status < 1) {
      return 'p-5 flex flex-col items-center';
    }
    if (index - status === 1) {
      return 'p-5 flex flex-col items-center animate-pulse';
    }
    if (index - status > 1) {
      return 'p-5 flex flex-col items-center opacity-30';
    }
  };
  return (
    <div className="flex flex-col p-5 md:p-12 md:flex-row lg:flex-row max-w-screen-2xl mx-auto">
      <div className="w-full mb-7 md:w-2/4 md:mr-5 lg:mr-7 lg:w-full lg:mb-5 xl:w-3/4 xl:mr-5">
        <div className="lg:mb-5 xl:mb-8">
          <table className="flex flex-col items-center justify-center w-full border-spacing-5 text-center lg:table">
            <tbody>
              <tr className="hidden lg:table-row">
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
              <tr className="flex flex-col items-center justify-center mb-5 lg:table-row">
                <td>
                  <span className="font-bold lg:hidden">Order ID: </span>
                  <span className="">{order._id}</span>
                </td>
                <td>
                  <span className="font-bold lg:hidden">Customer: </span>
                  <span className="">{order.customer}</span>
                </td>
                <td>
                  <span className="font-bold lg:hidden">Address: </span>
                  <span className="">{order.address}</span>
                </td>
                <td>
                  <span className="font-bold lg:hidden">Total: </span>
                  <span className="">${order.total}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center justify-center w-full lg:flex-row lg:justify-between lg:items-start xl:w-3/4 xl:mx-auto">
          <div className={statusClass(0)}>
            <Image src="/img/paid.png" width={30} height={30} alt="" />
            <span>Payment</span>
            <div className={`${status >= 0 ? '' : 'hidden'} text-green-700`}>
              <MdCheckCircle className="w-7 h-7" />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/img/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div className={`${status >= 1 ? '' : 'hidden'} text-green-700`}>
              <MdCheckCircle className="w-7 h-7" />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className={`${status >= 2 ? '' : 'hidden'} text-green-700`}>
              <MdCheckCircle className="w-7 h-7" />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/img/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className={`${status >= 3 ? '' : 'hidden'} text-green-700`}>
              <MdCheckCircle className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/4 lg:w-2/4 xl:w-1/4">
        <div className="w-full md:w-11/12 max-h-80 bg-gray-600 p-12 pt-3 flex flex-col justify-between text-white">
          <h2 className="title font-bold text-2xl my-3">CART TOTAL</h2>
          <div className="mr-2">
            <b className="mr-3">Subtotal:</b>${order.total}
          </div>
          <div className="mr-2">
            <b className="mr-3">Discount:</b>$0.00
          </div>
          <div className="mr-2">
            <b className="mr-3">Total:</b>${order.total}
          </div>
          <button
            disabled
            className="bg-white h-8 text-teal-600 font-bold mt-5 cursor-not-allowed"
          >
            PAID
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/orders/${params.id}`
  );
  return {
    props: { order: res.data },
  };
};

export default Order;
