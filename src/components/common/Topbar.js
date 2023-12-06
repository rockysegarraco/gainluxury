import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import CarRental from "@mui/icons-material/CarRental";
import Home from "@mui/icons-material/Home";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import Searchbar from "../Dialog/Searchbar";

const Topbar = ({ open, handleDrawerOpen, handleOpen }) => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePage = () => {
    navigate("/");
  };

  const openPopver = Boolean(anchorEl);
  const id = openPopver ? "simple-popover" : undefined;

  return (
    <AppBar
      className="border-b lg:px-20"
      position="fixed"
      open={open}
      color="inherit"
      elevation={0}
    >
      <Toolbar className="flex justify-between pl-6 pr-4 lg:px-0">
        <IconButton
          className=""
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 1, ...(open && { display: "none" }) }}
        >
          <Bars3Icon className="h-6" />
        </IconButton>
        <div className="flex px-0 lg:px-0">
          <div className="flex flex-shrink-0 items-center">
            <button onClick={handlePage}>
              <img className="h-6 w-auto" src="/logo.svg" alt="Your Company" />
            </button>
          </div>
        </div>
        <Box sx={{ flexGrow: 1 }} />
        <div className="mr-4 hidden lg:block">
          <Searchbar />
        </div>
        <button
          onClick={() => navigate("/pricing")}
          className="rounded-full px-6 py-2 mr-2 text-sm text-slate-950 hover:bg-slate-100 hover:text-slate-800 hidden lg:block font-inter"
        >
          Pricing
        </button>
        <button
          onClick={handleClick}
          className="rounded-full px-6 py-2 mr-2 text-sm text-slate-950 hover:bg-slate-100 hover:text-slate-800 hidden lg:block font-inter"
        >
          List with us
        </button>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/login" />
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="rounded-full border border-slate-950 px-6 py-2 mr-0 text-sm text-slate-950 hover:bg-white hover:text-slate-800 hidden lg:block font-inter"
          >
            Log In
          </button>
        )}
      </Toolbar>
      {/* <div className="mx-auto max-w-full px-4 lg:px-20 py-2 bg-slate-100 block lg:hidden">
        <Searchbar />
      </div> */}
      <Popover
        id={id}
        open={openPopver}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <ListItem
          divider
          disablePadding
          onClick={() => handleOpen("/create-car-post")}
        >
          <ListItemButton>
            <ListItemIcon>
              <CarRental />
            </ListItemIcon>
            <ListItemText primary="Sell a car" />
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          onClick={() => handleOpen("/create-property-post")}
        >
          <ListItemButton>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Sell a Property" />
          </ListItemButton>
        </ListItem>
      </Popover>
    </AppBar>
  );
};

export default Topbar;
