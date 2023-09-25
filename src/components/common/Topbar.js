import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { UserButton } from "@clerk/clerk-react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const Topbar = ({ open, handleDrawerOpen, handleOpen }) => {
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
          className="rounded-full bg-slate-900 px-6 py-2 mx-4 text-[1rem] text-white cursor-pointer hidden lg:block"
          className="rounded-full bg-black px-4 py-2 mr-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 hidden lg:block"
        >
          {" "}
          Add Listing
        </button>
        <UserButton />
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
