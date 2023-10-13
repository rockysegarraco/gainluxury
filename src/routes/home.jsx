import FeaturedSection from "../components/FeaturedSection";
import FeaturedListings from "../components/FeaturedListings";
import RecentListings from "../components/RecentListings";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel/CarouselFade";
import { BrowserView, MobileView } from "react-device-detect";
import MobileSlider from "../components/Carousel/MobileSlider";

function Home() {
  return (
    <>
      <BrowserView>
        <Carousel />
      </BrowserView>
      <MobileView>
        <MobileSlider />
      </MobileView>
      <FeaturedSection />
      <FeaturedListings />
      <RecentListings />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
