import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import db from "../firebase";

import RecentListings from "../components/RecentListings";
import Newsletter from "../components/Newsletter";
import Blog from "../components/Blog";
import Carousel from "../components/Carousel/CarouselFade";
import Footer from "../components/Footer";
import ReactPlayer from "react-player";

function Home() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const data = [];
    const carCollection = collection(db, "cars");
    const cq = query(
      carCollection,
      where("postStatus", "==", "Live"),
      orderBy("postDate", "asc"),
      limit(2)
    );
    const csnap = await getDocs(cq);
    csnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    const propertyCollection = collection(db, "properties");
    const pq = query(
      propertyCollection,
      where("postStatus", "==", "Live"),
      orderBy("postDate", "asc"),
      limit(2)
    );
    const psnap = await getDocs(pq);
    psnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    const marineCollection = collection(db, "marine");
    const mq = query(
      marineCollection,
      where("postStatus", "==", "Live"),
      orderBy("postDate", "asc"),
      limit(2)
    );
    const msnap = await getDocs(mq);
    msnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    const aviationCollection = collection(db, "aviation");
    const aq = query(
      aviationCollection,
      where("postStatus", "==", "Live"),
      orderBy("postDate", "asc"),
      limit(2)
    );
    const asnap = await getDocs(aq);
    asnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push(doc.data());
    });
    const artCollection = collection(db, "arts");
    const artq = query(
      artCollection,
      where("postStatus", "==", "Live"),
      orderBy("postDate", "asc"),
      limit(2)
    );
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
      <div className="py-6 aspect-video w-full ">
        <div className="aspect-video w-full bg-slate-100">
          <ReactPlayer
            className="react-player aspect-video w-full"
            url="video.mov"
            width="100%"
            height="100%"
            pip
            controls="true"
            light="bkg-vid.jpg"
            playing
          />
        </div>
      </div>
      <Blog />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
