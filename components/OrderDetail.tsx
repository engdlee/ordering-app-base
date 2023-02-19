import { IOrder } from '@interfaces/IOrder';
import { useState } from 'react';

const OrderDetail = ({
  total,
  createOrder,
}: {
  total: number;
  createOrder: (data: IOrder) => Promise<void>;
}) => {
  console.log('comp', createOrder);
  const [customer, setCustomer] = useState('');
  const [address, setAddress] = useState('');

  const handleClick = () => {
    createOrder({ customer, address, total, status: 0, method: 0 });
  };

  return (
    <div className="w-full h-screen absolute top-0 left-0 z-50 flex items-center justify-center bg-gray-500/40">
      <div className="w-[500px] bg-white rounded-3xl p-12 flex flex-col items-center justify-center">
        <h1 className="text-4xl my-5 font-light">
          You will pay $12 after delivery.
        </h1>
        <div className="flex flex-col w-full mb-4">
          <label className="mb-3 h-">Name Surname</label>
          <input
            placeholder="John Doe"
            type="text"
            className="h-10 border border-gray-400 p-4"
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label className="mb-3">Phone Number</label>
          <input
            type="text"
            placeholder="+1 234 567 89"
            className="h-10 border border-gray-400 p-4"
          />
        </div>
        <div className="flex flex-col w-full mb-4">
          <label className="mb-3">Address</label>
          <textarea
            rows={5}
            placeholder="Elton St. 505 NY"
            className="border border-gray-400 p-4"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          className="bg-teal-600 text-white px-5 py-3 font-medium text-base rounded-xl cursor-pointer"
          onClick={handleClick}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
