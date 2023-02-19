import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 mt-20 md:mt-auto xl:px-0 lg:w-full xl:mx-auto">
      <div className="flex text-center h-auto lg:text-left xl:h-[calc(100vh-100px)]">
        <div className="hidden lg:flex flex-1 relative">
          <Image src="/img/bg.png" fill style={{ objectFit: 'cover' }} alt="" />
        </div>
        <div className="flex flex-col flex-1 relative p-12 justify-center md:flex-row">
          <div className="flex-1 px-5">
            <h2 className="text-3xl text-gray-300 my-5">
              OH YES, WE DID.THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA.
            </h2>
          </div>
          <div className="flex-1 px-5">
            <h1 className="text-4xl text-amber-600 md:text-lg">
              FIND OUR RESTAURANTS
            </h1>
            <p className="text-xl md:text-base text-gray-400 py-4">
              1654 R. Don Road #304.
              <br /> NewYork, 85022
              <br /> (602) 867-1010
            </p>
            <p className="text-xl md:text-base text-gray-400 py-4">
              2356 K. Laquie Rd #235.
              <br /> NewYork, 85022
              <br /> (602) 867-1011
            </p>
            <p className="text-xl md:text-base text-gray-400 py-4">
              1614 E. Erwin St #104.
              <br /> NewYork, 85022
              <br /> (602) 867-1012
            </p>
            <p className="text-xl md:text-base text-gray-400 py-4">
              1614 W. Caroll St #125.
              <br /> NewYork, 85022
              <br /> (602) 867-1013
            </p>
          </div>
          <div className="flex-1 px-5">
            <h1 className="text-4xl text-amber-600 md:text-lg">
              WORKING HOURS
            </h1>
            <p className="text-xl md:text-base text-gray-400 py-4">
              MONDAY UNTIL FRIDAY
              <br /> 9:00 – 22:00
            </p>
            <p className="text-xl md:text-base text-gray-400 py-4">
              SATURDAY - SUNDAY
              <br /> 12:00 – 24:00
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
