import type { NextPage } from 'next';
import axios from 'axios';
import Slider from '@components/Slider';
import FoodList from '@components/FoodList';
import { IProduct } from '@interfaces/IProduct';
import { IContext } from '@interfaces/IContext';
import { useState } from 'react';
import AddButton from '@components/AddButton';
import Add from '@components/Add';

// interface ExtendedNextApiRequest extends NextApiRequest {
//   cookies: { token: string };
// }

export const getServerSideProps = async (ctx: IContext) => {
  // const myCookie = ctx.req?.cookies || '';
  const myToken = ctx.req?.cookies.token || '';
  let admin = false;
  // 'token' in myCookie && typeof myCookie.token === 'string';
  if (myToken === process.env.TOKEN) {
    admin = true;
  }

  const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/products`);
  return {
    props: {
      foodList: res.data,
      admin,
    },
  };
};

const Home: NextPage<{ foodList: IProduct[]; admin: boolean }> = (props) => {
  const [close, setClose] = useState<boolean>(true);
  const { foodList, admin } = props;

  return (
    <>
      <div className="bg-red-500">
        <div className="max-w-screen-2xl mx-auto flex xl:min-h-screen xl:h-[calc(100vh-100px)] flex-col items-center justify-start py-2">
          <Slider />
        </div>
      </div>
      <div className="">
        <div className="max-w-screen-2xl mx-auto flex min-h-screen flex-col items-center justify-start py-2">
          {admin && <AddButton setClose={setClose} />}
          <FoodList foodList={foodList} />
          {!close && <Add setClose={setClose} />}
        </div>
      </div>
    </>
  );
};

export default Home;
