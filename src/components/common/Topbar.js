import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Topbar = ({ open, handleDrawerOpen, handleOpen }) => {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();
  return (
    <AppBar
      className="border-b py-0 lg:py-1 px-2 lg:px-16"
      position="fixed"
      open={open}
      color="inherit"
      elevation={0}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 1, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <div className="flex px-0 lg:px-0">
          <div className="flex flex-shrink-0 items-center">
            <img
              className="lg:h-7 h-6 w-auto"
              src="/logo.svg"
              alt="Your Company"
            />
          </div>
        </div>
        <Box sx={{ flexGrow: 1 }} />
        <button
          type="button"
          onClick={handleOpen}
          className="rounded-full bg-black px-4 py-2 mr-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 hidden lg:block"
        >
          {" "}
          Pricing
        </button>
        <button
          type="button"
          onClick={handleOpen}
          className="rounded-full bg-black px-4 py-2 mr-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 hidden lg:block"
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
            className="rounded-full bg-black px-4 py-2 mr-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 hidden lg:block"
          >
            {" "}
            Login
          </button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
