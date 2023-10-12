import MainNav from "../components/common/MainNav";
import FeaturedSection from "../components/FeaturedSection";
import FeaturedListings from "../components/FeaturedListings";
import RecentListings from "../components/RecentListings";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel/CarouselFade";

function Home() {
  return (
    <>
      <Carousel />
      <FeaturedSection />
      <FeaturedListings />
      <RecentListings />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
