import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '@interfaces/IProduct';

const FoodCard = ({ food }: { food: IProduct }) => {
  return (
    <div className="flex flex-col items-center justify-center px-10 py-5 cursor-pointer">
      <Link href={`/product/${food._id}`} passHref>
        <Image src={food.img} alt="" width="500" height="500" />
      </Link>
      <h1 className="text-3xl md:text-lg font-bold text-red-500 my-4">
        {food.title}
      </h1>
      <span className="text-2xl md:text-lg font-bold mb-4">
        ${food.prices[0]}
      </span>
      <p className="text-2xl md:text-base text-center mb-4">{food.desc}</p>
    </div>
  );
};

export default FoodCard;
