import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";

import AdTitle from "../components/Form/AdTitle";
import SelectCategory from "../components/Form/SelectCategory";
import SelectBrand from "../components/Form/SelectBrand";
import PriceType from "../components/Form/PriceType";
import Price from "../components/Form/Price";
import Condition from "../components/Form/Condition";
import Kilometers from "../components/Form/Kilometers";
import Engine from "../components/Form/Engine";
import SelectCountry from "../components/Form/SelectCountry";
import Zipcode from "../components/Form/Zipcode";
import Address from "../components/Form/Address";
import Email from "../components/Form/Email";
import Phone from "../components/Form/Phone";
import Divider from "@mui/material/Divider";

const AddPost = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const post = useSelector((state) => state.addPost);

  // In case the user signs out while on the page.
  if (!isLoaded || !isSignedIn) {
    navigate("/");
    return null;
  }

  const checkout = async () => {
    await axios
      .post(
        "https://us-central1-gain-luxury-e7fee.cloudfunctions.net/cloudAPI/checkout",
        { post }
      )
      .then((res) => {
        if (res.data.url) {
          localStorage.setItem("userPost", post);
          window.location.assign(res.data.url);
        }
      });
  };

  return (
    <div>
      <div className="mx-auto max-w-full lg:max-w-3xl border mt-8 border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h1 className="text-3xl mb-4">Listing Details</h1>
        <SelectCategory />
        <AdTitle />
        <div className="flex">
          <div>
            {" "}
            <PriceType />
          </div>
          <div>
            <Price />
          </div>
        </div>
        <Condition />
        <SelectBrand />
        <Kilometers />
        <Engine />
        <h1 className="text-3xl mt-4 mb-4">Contact Details</h1>
        <SelectCountry />
        <Zipcode />
        <Address />
        <Phone />
      </div>

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
              Looking to sell urgently my 6 month old baby in fair price of only
              $50K, No negotiation. only serious buyer call contact me. Thank
              you.
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
  );
};

export default AddPost;
