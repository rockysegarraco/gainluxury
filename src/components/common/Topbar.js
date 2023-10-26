import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      <Toolbar className="pl-6 pr-4 lg:px-0">
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
            <Link to="/">
              <img className="h-6 w-auto" src="/logo.svg" alt="Your Company" />
            </Link>
          </div>
        </div>
        <Box sx={{ flexGrow: 1 }} />
        <button
          type="button"
          onClick={() => navigate("/pricing")}
          className="rounded-full px-6 py-2 mr-1 text-base text-slate-700 hover:bg-slate-100 hover:text-slate-600 hidden lg:block"
        >
          {" "}
          Pricing
        </button>
        <button
          type="button"
          onClick={handleClick}
          className="rounded-full px-6 py-2 mr-3 text-base text-slate-700 hover:bg-slate-100 hover:text-slate-600 hidden lg:block"
        >
          {" "}
          Add Listing
        </button>
        {isSignedIn ? (
          <UserButton afterSignOutUrl="/login" />
        ) : (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="rounded-full border border-blue-700 px-6 py-2 mr-0 text-sm text-blue-700 hover:bg-white hover:text-blue-600 hidden lg:block"
          >
            {" "}
            Log In
          </button>
        )}
      </Toolbar>
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
