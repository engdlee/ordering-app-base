import { useState } from 'react';
import Image from 'next/image';
import Slideshow from 'react-rwd-slideshow';

const Slider = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const images = ['3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'];
  return (
    <div className="w-full">
      <Slideshow scrollSnap showDots={false}>
        <Slideshow.Item>
          <div className="relative w-full min-h-[300px] md:min-h-[454px] lg:min-h-[654px] xl:min-h-[854px] rounded-md overflow-hidden">
            <Image
              priority
              alt="Main Image"
              src={`/img/slider/1.jpg`}
              fill
              style={{ objectFit: 'cover' }}
              className={`duration-700 ease-in-out ${
                isLoading
                  ? 'scale-110 blur-2xl grayscale'
                  : 'scale-100 blur-0 grayscale-0'
              }`}
              onLoadingComplete={() => setLoading(false)}
            />
            <div className="absolute text-white text-center text-6xl font-bold w-full flex items-center justify-center min-h-[300px] md:min-h-[454px] lg:min-h-[654px] xl:min-h-[854px] leading-relaxed md:text-[90px] xl:text-[150px]">
              Best <br />
              Pizza <br />
              In Town!!
            </div>
          </div>
        </Slideshow.Item>
        <Slideshow.Item>
          <div className="relative w-full min-h-[300px] md:min-h-[454px] lg:min-h-[654px] xl:min-h-[854px] rounded-md overflow-hidden">
            <Image
              alt="Main Image"
              src={`/img/slider/2.jpg`}
              fill
              style={{ objectFit: 'cover' }}
              className={`duration-700 ease-in-out ${
                isLoading
                  ? 'scale-110 blur-2xl grayscale'
                  : 'scale-100 blur-0 grayscale-0'
              }`}
              onLoadingComplete={() => setLoading(false)}
            />
            <div className="absolute text-white text-center text-4xl font-bold w-full flex items-center justify-end min-h-[300px] md:min-h-[454px] lg:min-h-[654px] xl:min-h-[854px] leading-loose md:text-[65px] xl:text-[130px]">
              Made With
              <br />
              The Best <br />
              Ingredients!!
            </div>
          </div>
        </Slideshow.Item>
        {images.map((image, index) => (
          <Slideshow.Item key={index}>
            <div className="relative w-full min-h-[300px] md:min-h-[454px] lg:min-h-[654px] xl:min-h-[854px] rounded-md overflow-hidden">
              <Image
                alt="Main Image"
                src={`/img/slider/${image}`}
                fill
                style={{ objectFit: 'cover' }}
                className={`duration-700 ease-in-out ${
                  isLoading
                    ? 'scale-110 blur-2xl grayscale'
                    : 'scale-100 blur-0 grayscale-0'
                }`}
                onLoadingComplete={() => setLoading(false)}
              />
            </div>
          </Slideshow.Item>
        ))}
      </Slideshow>
    </div>
  );
};

export default Slider;
