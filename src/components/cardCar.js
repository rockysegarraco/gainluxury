import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export default function CardCar() {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        image="https://img.jamesedition.com/listing_images/2023/08/04/16/25/36/8687f76c-38c4-4465-9f01-11d4094256bd/je/556x342xcxm.jpg"
      />
      <div className="p-3">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            $345,000
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            2023 Bugatti Chiron
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Atlanta, Georgia, United States
          </Typography>
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
