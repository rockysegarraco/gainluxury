import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";

import db from "../firebase";

import RecentListings from "../components/RecentListings";
import Newsletter from "../components/Newsletter";
import Blog from "../components/Blog";
import Carousel from "../components/Carousel/CarouselFade";
import Footer from "../components/Footer";
import SubNav from "../components/SubNav";

function Home() {
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
    <div>
      <SubNav />
      <Carousel />
      <RecentListings post={post} from="home" />
      <Blog />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
