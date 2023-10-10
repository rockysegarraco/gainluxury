import FeaturedSection from "../components/FeaturedSection";
import FeaturedListings from "../components/FeaturedListings";
import Newsletter from "../components/Newsletter";
import Carousel from "../components/Carousel/CarouselFade";


function Home() {
  return (
    <>
      <Carousel />
      <FeaturedSection />
      <FeaturedListings />
      <Newsletter />
    </>
  );
}

export default Home;
