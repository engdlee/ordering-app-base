import Link from 'next/link';
import { useSelector } from 'react-redux';
import { MdPhoneEnabled, MdShoppingCart } from 'react-icons/md';
import { IState } from '@interfaces/IState';

const Header = () => {
  const quantity = useSelector(
    (state: { cart: IState }) => state.cart.quantity
  );

  return (
    <header className="h-28 px-12 py-5 bg-red-500 sticky top-0 z-20">
      <div className="max-w-screen-2xl flex items-center justify-between mx-auto my-2">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
            <MdPhoneEnabled className="w-6 h-6 text-red-500" />
          </div>
          <div className="ml-5 text-white">
            <div className="text-xs font-medium">ORDER NOW!</div>
            <div className="text-xl font-bold">012 345 678</div>
          </div>
        </div>
        <div className="hidden lg:flex items-center">
          <ul className="flex items-center text-white">
            <Link href="/" passHref>
              <li className="px-3 font-medium cursor-pointer">Homepage</li>
            </Link>
            <li className="px-3 font-medium cursor-pointer">Products</li>
            <li className="px-3 font-medium cursor-pointer">Menu</li>
            <li className="px-4 font-serif font-extralight text-5xl">
              Pizzeria
            </li>
            <li className="px-3 font-medium cursor-pointer">Events</li>
            <li className="px-3 font-medium cursor-pointer">Blog</li>
            <li className="px-3 font-medium cursor-pointer">Contact</li>
          </ul>
        </div>
        <div className="flex items-center">
          <div className="">
            {/* <div className={styles.counter}>{quantity}</div> */}
            <Link href="/cart" passHref>
              <button
                type="button"
                className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-transparent"
              >
                <MdShoppingCart className="w-8 h-8" />
                <span className="sr-only">Notifications</span>
                {quantity > 0 ? (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-red-500 bg-white rounded-full -top-1 -right-1">
                    {quantity}
                  </div>
                ) : null}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
