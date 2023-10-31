import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import db from "../firebase";

import FeaturedSection from "../components/FeaturedSection";
import FeaturedListings from "../components/FeaturedListings";
import RecentListings from "../components/RecentListings";
import Newsletter from "../components/Newsletter";
import Hero from "../components/hero";
import Footer from "../components/Footer";
import SubNav from "../components/SubNav";
import Carousel from "../components/Carousel/CarouselFade";
import { BrowserView, MobileView } from "react-device-detect";
import MobileSlider from "../components/Carousel/MobileSlider";
import Cars from "../components/Tabs/cars";
import Properties from "../components/Tabs/properties";
import Marine from "../components/Tabs/marine";
import Aviation from "../components/Tabs/aviation";
import Nav from "../components/Nav";

function Home() {
  const [selected, setSelected] = useState("Home");
  const [post, setPost] = useState([]);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const data = [];
    const collections = collection(db, "cars");
    const q = query(collections, orderBy("postDate", "asc"), limit(12));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    setPost(data);
  };

  return (
    <>
      {/* <Nav /> */}
      <SubNav
        handleSelected={(item) => setSelected(item)}
        selected={selected}
      />
      {/* <BrowserView>
        <Carousel />
      </BrowserView>
      <MobileView>
        <MobileSlider />
      </MobileView>
      <FeaturedSection />
      <FeaturedListings />
       */}

      {selected === "Cars" && <Cars />}
      {selected === "Properties" && <Properties />}
      {selected === "Marine" && <Marine />}
      {selected === "Aviation" && <Aviation />}

      {selected === "Home" && (
        <>
          <RecentListings post={post} selected={selected} />
        </>
      )}
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
