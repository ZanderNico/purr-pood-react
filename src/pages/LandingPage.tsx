import Buttons from "../components/Buttons";
import Navbar from "../components/Navbar";
import Carousel from "../utils/Carousel";

interface CarouselItem {
  imageUrl: string;
}


function LandingPage() {
  //TODO Dominic paki gawa yung CCS style ng Landing Page deadline nxt week.
  const carouselItems: CarouselItem[] = [
    { imageUrl: "src/assets/petfood carousel/22-VALLEY-0219-Puppy-Posters-1200px-1024x681.jpg" },
    { imageUrl: "src/assets/petfood carousel/715724_cdvilttmwuiepweurrgbivo9w.jpg" },
    { imageUrl: "src/assets/petfood carousel/dog-food-premium-pet-food-1-5fef0f3a6cebb.png" },
    { imageUrl: "src/assets/petfood carousel/preview-page0.jpg" },
  ];
  return (
    <>
    <Navbar/>
    <Carousel items={carouselItems}/>

    </>
  );
}

export default LandingPage;
