import React, { useEffect, useState } from "react";

import image1 from "../../assets/petfood carousel/22-VALLEY-0219-Puppy-Posters-1200px-1024x681.jpg";
import image2 from "../../assets/petfood carousel/715724_cdvilttmwuiepweurrgbivo9w.jpg";
import image3 from "../../assets/petfood carousel/dog-food-premium-pet-food-1-5fef0f3a6cebb.png";

const images = [
    image1,
    image2,
    image3
];

function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1500); 

      return () => clearInterval(interval);
    }, []);

  return (
    <>
    <div className="max-w-screen-lg mx-auto overflow-hidden rounded-md">
      <img
        src={images[currentIndex]} // Use .default to access the image path
        alt=""
        className="object-cover w-full h-[300px] sm:h-[300px] md:h-[300px] lg:h-[400px] xl:h-[400px]"
      />
    </div>
  </>
  );
}

export default Hero;
