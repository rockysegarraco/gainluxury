import React, { useEffect } from 'react'
import db from "../firebase";
import { collection, addDoc } from 'firebase/firestore';
const Success = () => {

  useEffect(() => {
    uploadData();
  }, [])

  const uploadData = () => {
    const post = JSON.parse(localStorage.getItem('userPost'));
    if (post) {
     const collections =  collection(db, post.category.value);
      // Add a document to the collection
      addDoc(collections, {
        ...post
      })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          localStorage.removeItem('userPost')
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    }
  }

  return (
    <h3>Payment Success, You Ad posted Successfully, You can see your post in your profile or public home page.</h3>
  )
}

export default Success