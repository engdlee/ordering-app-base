import { useState } from 'react';
import Image from 'next/image';
import Slideshow from 'react-rwd-slideshow';

const Slider = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const images = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
  ];
  return (
    <div className="w-full">
      <Slideshow scrollSnap showDots={false}>
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
