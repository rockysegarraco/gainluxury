import React from 'react'
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useSelector } from 'react-redux'
import axios from 'axios';

const AddPost = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const post = useSelector((state) => state.addPost);

  // In case the user signs out while on the page.
  if (!isLoaded || !isSignedIn) {
    navigate('/')
    return null;
  }

  const checkout = async() => {
    await axios.post('https://us-central1-gain-luxury-e7fee.cloudfunctions.net/cloudAPI/checkout', {post}).then((res) => {
      if (res.data.url) {
        localStorage.setItem("userPost", post);
        window.location.assign(res.data.url);
      }
    })
  }

  return (
    <div>
      <Card sx={{ maxWidth: 345, m: 4 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-3/5251/1693556345148/front-left-side-47.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Tesla only in $50K
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Looking to sell urgently my 6 month old baby in fair price of only $50K,
              No negotiation. only serious buyer call contact me. Thank you.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={checkout}>
            Post $7
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default AddPost