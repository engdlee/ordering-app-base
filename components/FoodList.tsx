import FoodCard from '@components/FoodCard';
import { IProduct } from '@interfaces/IProduct';

const FoodList = ({ foodList }: { foodList: IProduct[] }) => {
  return (
    <div className="flex flex-col items-center px-3 py-5">
      <h1 className="text-4xl font-semibold">THE BEST PIZZA IN TOWN</h1>
      <p className="text-2xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center w-full">
        {foodList.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};

export default FoodList;
