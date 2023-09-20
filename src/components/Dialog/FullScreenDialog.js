import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import Pricing from "../pricing";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CATEGORY = [
  {
    title: "Sell Cars",
    category: "cars",
    priceId: "price_1NrY3BFxIXAUhOllLPuOeLBW",
  },
  {
    title: "Sell Property",
    category: "property",
    priceId: "price_1NrY3VFxIXAUhOllBLnaJwPa",
  },
];

export default function FullScreenDialog({ open, setOpen, setItem }) {
  return (
    <>
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={setOpen}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={setOpen}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Select Category
              </Typography>
            </Toolbar>
          </AppBar>
          <div>
            <Pricing />
          </div>
          <List>
            {CATEGORY.map((item, i) => (
              <>
                <ListItem key={i} button onClick={() => setItem(item)}>
                  <ListItemText primary={item.title} secondary="$7 per post" />
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Dialog>
      </div>
    </>
  );
}
