import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";
import CardListing from "../components/CardListing";
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
      setTabs(tabData)
    }
  }, [post]);

  useEffect(() => {
    if (savedPost.length > 0) {
      const tabData = JSON.parse(JSON.stringify(tabs));
      tabData[1].name = `Saved (${savedPost.length})`;
      setTabs(tabData)
    }
  }, [savedPost]);

  useEffect(() => {
    if (soldPost.length > 0) {
      const tabData = JSON.parse(JSON.stringify(tabs));
      tabData[2].name = `Sold (${soldPost.length})`;
      setTabs(tabData)
    }
  }, [soldPost]);

  const getData = async () => {
    if (user) {
      const collections = collection(db, "cars");
      const q = query(collections, where("userId", "==", user?.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.data()?.status) {
          setSoldPost((prev) => [...prev, doc.data()]);
        } else {
          setPost((prev) => [...prev, doc.data()]);
        }
      });
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-[90%] mt-6">
        <PageHeading tabData={tabs} tabIndex={tabIndex} setIndex={(i) => setTabIndex(i)} />
      </div>
      <div className="mx-auto max-w-[90%] px-0 py-8 sm:px-6 sm:py-8 lg:max-w-[90%] lg:px-0">
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
      {tabIndex === 0 && post.map((item, index) => (
        <CardListing item={item} index={index} />
      ))}
      {tabIndex === 1 && savedPost.map((item, index) => (
        <CardListing item={item} index={index} />
      ))}
      {tabIndex === 2 && soldPost.map((item, index) => (
        <CardListing item={item} index={index} />
      ))}
      </div >
      </div>
    </div>
  );
};

export default MyPost;
