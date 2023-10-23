import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

import MyListings from "../components/MyListings";
import PageHeading from "../components/PageHeading";
//
import db from "../firebase";

const UserListings = () => {
  let { uid } = useParams();
  const [post, setPost] = useState([]);
  const [agent, setAgent] = useState([]);
  const [about, setAbout] = useState([]);
  const { user } = useUser();
  const [tabs, setTabs] = useState([
    { name: "Listings (0)", href: "#", current: true },
    { name: "Agents", href: "#", current: false },
    { name: "About", href: "#", current: false },
  ]);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (post.length > 0) {
      const tabData = JSON.parse(JSON.stringify(tabs));
      tabData[0].name = `Listings (${post.length})`;
      setTabs(tabData);
    }
  }, [post]);

  const getData = async () => {
    const collections = collection(db, "cars");
      const q = query(collections, where("userId", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setPost((prev) => [...prev, doc.data()]);
      });
  };

  return (
    <div>
      <div className="mx-auto max-w-full mt-8 lg:px-20 px-4">
      <h1 className="text-3xl fancy">Listings</h1>
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
            (<div>
              About agent
            </div>)
            }
          {tabIndex === 2 &&
          (<div>
            About company
          </div>)
          }
        </div>
      </div>
    </div>
  );
};

export default UserListings;
