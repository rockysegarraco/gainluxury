import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import Detail from "../components/Detail";
//
import db from "../firebase";

const PostDetail = () => {
  let { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    if (slug) {
      getPost();
    }
  }, [slug]);

  const getPost = async () => {
    setIsLoading(true);
    const collections = collection(db, "cars");
    const q = query(collections, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setData(doc.data());
      setIsLoading(false);
    });
  };


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
          <Detail data={data} />
        </div>
      )}
    </div>
  );
};

export default PostDetail;
