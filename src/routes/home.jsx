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
    const carCollection = collection(db, "cars");
    const cq = query(carCollection, orderBy("postDate", "asc"), limit(2));
    const csnap = await getDocs(cq);
    csnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    const propertyCollection = collection(db, "properties");
    const pq = query(propertyCollection, orderBy("postDate", "asc"), limit(2));
    const psnap = await getDocs(pq);
    psnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    const marineCollection = collection(db, "marine");
    const mq = query(marineCollection, orderBy("postDate", "asc"), limit(2));
    const msnap = await getDocs(mq);
    msnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    const aviationCollection = collection(db, "aviation");
    const aq = query(aviationCollection, orderBy("postDate", "asc"), limit(2));
    const asnap = await getDocs(aq);
    asnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    const artCollection = collection(db, "arts");
    const artq = query(artCollection, orderBy("postDate", "asc"), limit(2));
    const artsnap = await getDocs(artq);
    artsnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    setPost(data);
  };

  return (
    <div>
      <Carousel />
      <RecentListings post={post} from="home" />
      <Blog />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
