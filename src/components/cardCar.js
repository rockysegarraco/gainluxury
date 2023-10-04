import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function CardCar({item, i}) {
  return (
    <Card key={i}>
      <CardMedia
        component="img"
        alt="green iguana"
        image={item.gallery[0]}
      />
      <div className="p-3">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {item.pricingType.value === "Fixed" ?  `$${item.price}` : item.pricingType.value}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
          {item.yearModel} {item.brand.label}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Atlanta, Georgia, United States
          </Typography> */}
        </CardContent>
        <CardActions>
          <Button size="small">
            <span className="mr-1">
              <MailOutlineIcon />
            </span>{" "}
            Contact
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}
