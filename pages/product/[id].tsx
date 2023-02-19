import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '@redux/cartSlice';
import { GiFullPizza } from 'react-icons/gi';
import { IProduct } from '@interfaces/IProduct';
import { IExtraOption } from '@interfaces/IExtraOption';

export const getServerSideProps = async ({
  params,
}: {
  params: { id: number };
}) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      food: res.data,
    },
  };
};

const Product = ({ food }: { food: IProduct }) => {
  const [price, setPrice] = useState(food.prices[0]);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState<IExtraOption[]>([]);
  const dispatch = useDispatch();

  const changePrice = (number: number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex: number) => {
    const difference = food.prices[sizeIndex] - food.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    option: IExtraOption
  ) => {
    if (e.target) {
      const checked = (e.target as HTMLInputElement).checked;

      if (checked) {
        changePrice(option.price);
        setExtras((prev) => [...prev, option]);
      } else {
        changePrice(-option.price);
        setExtras(extras.filter((extra) => extra._id !== option._id));
      }
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...food, extras, price, quantity }));
  };

  return (
    <div className="h-auto text-center flex flex-col md:text-left lg:flex-row mt-5 xl:h-[calc(100vh-100px)]">
      <div className="flex flex-1 h-full items-center justify-center">
        <div className="w-[70vw] h-[70vw] m-5 lg:mx-10 lg:w-[50vw] lg:h-[50vw] xl:w-4/5 xl:h-4/5 relative">
          <Image src={food.img} fill style={{ objectFit: 'fill' }} alt="" />
        </div>
      </div>
      <div className="flex-1 p-5">
        <h1 className="text-4xl my-5 font-bold">{food.title}</h1>
        <span className="text-2xl font-normal border-b text-red-500 border-red-500">
          ${price}
        </span>
        <p className="my-4">{food.desc}</p>
        <h3 className="text-lg my-5 font-bold">Choose the size</h3>
        <div className="w-full px-10 md:w-2/4 lg:w-full xl:w-3/4 flex justify-between">
          <div
            className="relative cursor-pointer p-5"
            onClick={() => handleSize(0)}
          >
            <GiFullPizza className="w-8 h-8" />
            <span className="absolute top-2 -right-1 bg-teal-600 text-white text-xs px-2 rounded-lg">
              Small
            </span>
          </div>
          <div
            className="relative cursor-pointer p-5"
            onClick={() => handleSize(1)}
          >
            <GiFullPizza className="w-10 h-10" />
            <span className="absolute top-2 -right-3 bg-teal-600 text-white text-xs px-2 rounded-lg">
              Medium
            </span>
          </div>
          <div
            className="relative cursor-pointer p-5"
            onClick={() => handleSize(2)}
          >
            <GiFullPizza className="w-12 h-12" />
            <span className="absolute top-2 -right-2 bg-teal-600 text-white text-xs px-2 rounded-lg">
              Large
            </span>
          </div>
        </div>
        <h3 className="text-lg my-5 font-bold">
          Choose additional ingredients
        </h3>
        <div className="flex flex-col mb-8">
          {food.extraOptions &&
            food.extraOptions.map((option) => (
              <div
                className="flex items-center mr-3 text-sm font-medium"
                key={option._id}
              >
                <label className="inline-flex items-center cursor-pointer p-2 w-full">
                  <input
                    type="checkbox"
                    id={option.text}
                    name={option.text}
                    className="w-5 h-5 cursor-pointer"
                    onChange={(e) => handleChange(e, option)}
                  />
                  <span className="ml-2 text-sm">{option.text}</span>
                </label>
              </div>
            ))}
        </div>
        <div className="flex flex-row">
          <input
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            type="number"
            defaultValue={1}
            className="py-8 w-14 h-8 border border-gray-500 px-2 text-center"
          />
          <button
            className="p-8 flex items-center justify-center h-8 ml-3 bg-red-500 text-white font-medium cursor-pointer px-4"
            onClick={handleClick}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
