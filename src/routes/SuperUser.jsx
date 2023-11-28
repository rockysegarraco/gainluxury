import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';

import { collection, getDocs, query, doc, updateDoc } from "firebase/firestore";
//
import db from "../firebase";
import { Link } from 'react-router-dom';

const SuperUser = () => {
  const [isLogin, setIsLogin] = useState(JSON.parse(localStorage.getItem("isSuperLogin")))
  const [user, setUser] = useState();;
  const [password, setPassword] = useState();
  const [post, setPost] = useState([]);
  const username = process.env.REACT_APP_SUPER_USER_NAME;
  const superpassword = process.env.REACT_APP_SUPER_USER_PASS;
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const data = [];
    const collections = collection(db, "cars");
    const q = query(collections);
    const querySnapshot = await getDocs(q);
    let index = 0;
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      index = index + 1;
      const obj = {...doc.data()};
      obj.id = index;
      obj.docId = doc.id
      data.push(obj);
    });

    const propertyCollection = collection(db, "properties");
    const pq = query(propertyCollection);
    const psnap = await getDocs(pq);
    psnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      index = index + 1;
      const obj = {...doc.data()};
      obj.id = index;
      obj.docId = doc.id
      data.push(obj);
    });
    const marineCollection = collection(db, "marine");
    const mq = query(marineCollection);
    const msnap = await getDocs(mq);
    msnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      index = index + 1;
      const obj = {...doc.data()};
      obj.id = index;
      obj.docId = doc.id
      data.push(obj);
    });
    const aviationCollection = collection(db, "aviation");
    const aq = query(aviationCollection);
    const asnap = await getDocs(aq);
    asnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      index = index + 1;
      const obj = {...doc.data()};
      obj.id = index;
      obj.docId = doc.id
      data.push(obj);
    });
    const artCollection = collection(db, "arts");
    const artq = query(artCollection);
    const artsnap = await getDocs(artq);
    artsnap.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      index = index + 1;
      const obj = {...doc.data()};
      obj.id = index;
      obj.docId = doc.id
      data.push(obj);
    });
    setPost(data);
    setLoading(false)
  };

  const handleLogin = () => {
    if (user && password) {
      if (user === username && password === superpassword) {
        setIsLogin(true);
        localStorage.setItem("isSuperLogin", JSON.stringify(true))
      } else {
        alert("Username or password is incorrect")
      }
    } else {
      alert("Please add username and password")
    }
  }

  const handleBlock = (data) => {
    setLoading(true)
    const postStatus = data.postStatus === "Live" ? "Block" : "Live";
    const documentToUpdate = doc(db, data.category.value, data.docId);
    updateDoc(documentToUpdate, {
      postStatus
    }).then(() => {
     // setPost([])
      getData();
    });
  }

  const columns = [
    {
      field: 'no', headerName: 'No.', width: 20,
      valueGetter: (params) => `${params.row.id}`
    },
    {
      field: 'category', headerName: 'Category', minWidth: 100,
      valueGetter: (params) => `${params.row.category.value}`
    },
    { field: 'title', headerName: 'Title', minWidth: 300 },
    {
      field: 'price',
      headerName: 'Price',
      minWidth: 200,
      valueGetter: (params) => `${params.row.pricingType.value === "Fixed" ? params.row.price : params.row.pricingType.value}`
    },
    {
      field: 'status',
      headerName: 'status',
      valueGetter: (params) => params.row.postStatus
    },
    {
      field: 'postDate',
      headerName: 'Post Date',
      minWidth: 200,
      valueGetter: (params) => params.row.postDate?.toDate().toDateString()
    },
    {
      field: 'action',
      headerName: "Actions",
      minWidth: 200,
      renderCell: (cellValues) => (
        <div>
          <Button >
          <Link to={`/${cellValues.row.category.value}/${cellValues.row.slug}`}>
            View
          </Link>
          </Button>
          <Button sx={{ textTransform: 'none'}} onClick={() => handleBlock(cellValues.row)}>
            Block/Live
          </Button>
        </div>
      )
    }
  ];


  return (
    <div className='flex h-screen' >
      {!isLogin ? (
        <div className='flex w-full items-center justify-center flex-col gap-3 '>
          <Typography>Superuser Login</Typography>
          <TextField required label="Username" variant="outlined" onChange={(e) => setUser(e.target.value)} />
          <TextField type='password' required label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
          <Button size='large' variant='contained' onClick={handleLogin}>Login</Button>
        </div>
      ) : (
        <div className='p-10'>
          <Typography fontSize={30}>All Posts</Typography>
          <div style={{ height: 700, width: 1400 }}>
            <DataGrid
              loading={isLoading}
              getRowId={(row)=> row.id}
              rows={post}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 20 },
                },
              }}
              pageSizeOptions={[5, 10, 20]}
            />
          </div>

        </div>
      )}
    </div>
  )
}

export default SuperUser