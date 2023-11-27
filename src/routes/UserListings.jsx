import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MyListings from "../components/MyListings";
import PageHeading from "../components/PageHeading";
import Footer from "../components/Footer";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
//
import db from "../firebase";

const UserListings = () => {
  let { uid } = useParams();
  const [post, setPost] = useState([]);
  const [progress, setProgress] = useState(10);
  const [isShow, setShow] = useState(false);
  const [timer, setTimer] = useState();
  const [tabs, setTabs] = useState([
    { name: "Listings (0)", href: "#", current: true },
  ]);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 10);
      }
    }, 300);
    setTimer(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      clearInterval(timer);
    }
  }, [progress]);

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

  const itemData = post.length > 0 && post[0];

  return (
    <>
      <div className="mb-16">
        <div className="mx-auto max-w-full lg:mt-20 lg:px-20 px-4">
          <div className="md:flex md:items-center md:justify-between">
            <div className="relative flex items-center space-x-3 rounded-lg bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 lg:mb-2 mb-6">
              <div className="flex-shrink-0">
                <img
                  className="h-16 w-16 rounded-full cursor-pointer"
                  src={itemData?.avatar}
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-3xl font-semibold text-slate-900 fancy">
                  {itemData?.agentName}'s Listings
                </p>
                <p className="truncate text-sm text-slate-900">
                  {itemData?.agentCompany}
                </p>
              </div>
            </div>
            <div className="mt-2 flex md:ml-4 md:mt-0 lg:mb-0 mb-4">
              <button
                onClick={() => setShow(true)}
                type="submit"
                className="flex items-center justify-center rounded-full border border-black px-8 py-3 uppercase text-sm tracking-wider font-semibold text-black mr-3 w-48"
              >
                {!isShow
                  ? `Show Number`
                  : progress === 100
                  ? itemData.phone
                  : "Loading..."}
              </button>

              <Link to={`mailto:${itemData?.email}?subject=Gain Luxury`}>
                <button className="flex w-full items-center justify-center rounded-full border border-transparent bg-black px-8 py-3 uppercase text-sm tracking-wider font-semibold text-white">
                  <span className="mr-2">
                    <MailOutlineIcon />
                  </span>{" "}
                  Contact
                </button>
              </Link>
            </div>
          </div>
          <hr className="block mt-2" />
          <PageHeading
            tabData={tabs}
            tabIndex={tabIndex}
            setIndex={(i) => setTabIndex(i)}
          />
        </div>
        <div className="mx-auto max-w-full lg:px-20 px-4 pt-6">
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {tabIndex === 0 &&
              post.map((item, index) => (
                <MyListings item={item} index={index} />
              ))}
            {tabIndex === 1 && <div>About agent</div>}
            {tabIndex === 2 && <div>About company</div>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserListings;
