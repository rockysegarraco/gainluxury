import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import db from "../firebase";

import RecentListings from "../components/RecentListings";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import SubNav from "../components/SubNav";
import Cars from "../components/Tabs/cars";
import Properties from "../components/Tabs/properties";
import Marine from "../components/Tabs/marine";
import Aviation from "../components/Tabs/aviation";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../store/routeSlice";

function Home() {
  const selected = useSelector((state) => state.routeSlice.selected);
  const [post, setPost] = useState([]);

  const dispatch = useDispatch();

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

  console.log(selected);

  return (
    <div>
      <SubNav
        handleSelected={(item) => dispatch(setSelected(item))}
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
          <RecentListings post={post} selected={selected} from="home" />
        </>
      )}
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
