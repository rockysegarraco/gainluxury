import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useUser } from "@clerk/clerk-react";
//
import db from "../firebase";

const MyPost = () => {
  const [post, setPost] = useState([]);
  const {user} = useUser();

  useEffect(() => {
    getData()
  }, [])

  const getData = async() => {
     const collections =  collection(db, 'cars');
     const q = query(collections, where("userId", "==", user.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setPost((prev) => [...prev, doc.data()])
      });
  }
  

  return (
    <div>
     {post.map((item, index) => (
      <div key={index}>{item.title}</div>
     ))}
    </div>
  )
}

export default MyPost
