import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "../firebase";

import FeaturedSection from "../components/FeaturedSection";
import FeaturedListings from "../components/FeaturedListings";
import RecentListings from "../components/RecentListings";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import SubNav from "../components/SubNav";
import Carousel from "../components/Carousel/CarouselFade";
import { BrowserView, MobileView } from "react-device-detect";
import MobileSlider from "../components/Carousel/MobileSlider";

function Home() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const data = [];
    const collections = collection(db, "cars");
    const q = query(collections, orderBy("postDate", "asc"), limit(8));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    setPost(data);
  };

  return (
    <>
      {/*       <BrowserView>
        <Carousel />
      </BrowserView>
      <MobileView>
        <MobileSlider />
      </MobileView>
      <FeaturedSection />
      <FeaturedListings /> */}
      <SubNav />

      <RecentListings post={post} />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
