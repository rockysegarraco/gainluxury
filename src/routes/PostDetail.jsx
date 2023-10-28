import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, updateDoc, doc, deleteDoc } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import Detail from "../components/Detail";
//
import db from "../firebase";

const PostDetail = () => {
  let { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [listingSize, setListingSize] = useState(0);
  const [data, setData] = useState();
  const [docId, setDocId] = useState();
  const [userId, setUserId] = useState();
  const navigate = useNavigate(); 

  const collections = collection(db, "cars");

  useEffect(() => {
    if (slug) {
      getPost();
    }
  }, [slug]);

  const getPost = async () => {
    setIsLoading(true);
    const q = query(collections, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setData(doc.data());
      setDocId(doc?.id);
      setUserId(doc.data()?.userId)
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (userId) {
      getListingSize();
    }
  }, [userId])

  const getListingSize = async () => {
      const q = query(collections, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      setListingSize(querySnapshot.size);
  }
  

  const handleSold = async(status) => {
    const documentToUpdate = doc(db, data.category.value, docId);
    updateDoc(documentToUpdate, {
      status
    }).then(() => {
      getPost();
    });
  }

  const handleDelete = async() => {
    const documentToUpdate = doc(db, data.category.value, docId);
    deleteDoc(documentToUpdate).then(() => {
      navigate(-1)
    });
  }

  return (
    <div>
      {isLoading ? (
        <Box
          sx={{
            flex: 1,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div>
          <Detail data={data} handleSold={handleSold} handleDelete={handleDelete} listingSize={listingSize - 1} />
        </div>
      )}
    </div>
  );
};

export default PostDetail;
