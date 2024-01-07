import React from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselItem {
  imageUrl: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings} className="relative">
      {items.map((item, index) => (
        <div
          key={index}
          className="h-[280px] md:h-[300px] lg:h-[450px] xl:h-[550px]"
        >
          {index === 1 && (
            // Add button only for the first image
            <button className="absolute m-11 bg-blue-500 text-white p-2">
              Buy Now
            </button>
          )}
          <img
            src={item.imageUrl}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-fill"
          />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
