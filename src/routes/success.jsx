import React, { useEffect, useState } from "react";
import db from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import Topbar from "../components/common/Topbar";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const [postData, setPost] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    uploadData();
  }, []);

  const uploadData = () => {
    const post = JSON.parse(localStorage.getItem("userPost"));
    if (post) {
      setPost(post)
      const collections = collection(db, post.category?.value);
      // Add a document to the collection
      addDoc(collections, {
        ...post,
        postDate: Timestamp.fromDate(new Date()),
        postStatus: 'Live'
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          localStorage.removeItem("userPost");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
  };

  return (
    <>
      <Topbar />
      <div className="bg-white mt-24 lg:mt-36">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="mx-auto mt-8 lg:mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-6 lg:p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                Success!
              </h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
                amet indis perferendis blanditi
              </p>
              <button
                type="button"
                onClick={() =>  navigate(`/${postData.category.value}/${postData.slug}`)}
                className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 mt-8"
              >
                View Listing
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
