import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import MyListings from "../components/MyListings";
import PageHeading from "../components/PageHeading";
//
import db from "../firebase";

const MyPost = () => {
  const [post, setPost] = useState([]);
  const [savedPost, setSavedPost] = useState([]);
  const [soldPost, setSoldPost] = useState([]);
  const { user } = useUser();
  const [tabs, setTabs] = useState([
    { name: "All (0)", href: "#", current: true },
    { name: "Saved (0)", href: "#", current: false },
    { name: "Sold (0)", href: "#", current: false },
  ]);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    getData();
  }, [user]);

  useEffect(() => {
    if (post.length > 0) {
      const tabData = JSON.parse(JSON.stringify(tabs));
      tabData[0].name = `All (${post.length})`;
      setTabs(tabData);
    }
  }, [post]);

  useEffect(() => {
    if (savedPost.length > 0) {
      const tabData = JSON.parse(JSON.stringify(tabs));
      tabData[1].name = `Saved (${savedPost.length})`;
      setTabs(tabData);
    }
  }, [savedPost]);

  useEffect(() => {
    if (soldPost.length > 0) {
      const tabData = JSON.parse(JSON.stringify(tabs));
      tabData[2].name = `Sold (${soldPost.length})`;
      setTabs(tabData);
    }
  }, [soldPost]);

  const getData = async () => {
    if (user) {
      const collections = collection(db, "cars");
      const q = query(collections, where("userId", "==", user?.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.data()?.status === "sold") {
          setSoldPost((prev) => [...prev, doc.data()]);
        } else {
          setPost((prev) => [...prev, doc.data()]);
        }
      });
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-full mt-24 lg:px-20 px-4">
        <h1 className="text-3xl fancy">My Listings</h1>
        <PageHeading
          tabData={tabs}
          tabIndex={tabIndex}
          setIndex={(i) => setTabIndex(i)}
        />
      </div>
      <div className="mx-auto max-w-full lg:px-20 px-4 pt-6">
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {tabIndex === 0 &&
            post.map((item, index) => <MyListings item={item} index={index} />)}
          {tabIndex === 1 &&
            savedPost.map((item, index) => (
              <MyListings item={item} index={index} />
            ))}
          {tabIndex === 2 &&
            soldPost.map((item, index) => (
              <MyListings item={item} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyPost;
