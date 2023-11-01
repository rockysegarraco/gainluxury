import { useState } from "react";
import Popover from "@mui/material/Popover";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import CarRental from "@mui/icons-material/CarRental";
import Home from "@mui/icons-material/Home";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Searchbar from "./Dialog/Searchbar";

export default function Navbar({ handleDrawerOpen, handleOpen }) {
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
    if (window.location.href === window.location.origin + "/") {
      window.location.reload();
    }
  };

  const openPopver = Boolean(anchorEl);
  const id = openPopver ? "simple-popover" : undefined;

  return (
    <div className="bg-white border-b">
      <div className="mx-auto max-w-full px-4 lg:px-20">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 lg:px-0">
            <div
              onClick={handleDrawerOpen}
              className="flex flex-shrink-0 items-center mr-4 cursor-pointer"
            >
              <Bars3Icon className="h-6" />
            </div>
            <div
              onClick={handlePage}
              className="flex flex-shrink-0 items-center cursor-pointer"
            >
              <img className="h-6 w-auto" src="/logo.svg" alt="Your Company" />
            </div>
          </div>
          <div className="lg:flex flex-1 hidden items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <Searchbar />
          </div>
          <div className="hidden lg:ml-4 lg:flex lg:items-center">
            <button
              onClick={() => navigate("/pricing")}
              className="relative flex-shrink-0 rounded-full px-4 py-2 mr-2 text-sm text-slate-950 hover:bg-slate-100 hover:text-slate-800 hidden lg:block font-inter"
            >
              Pricing
            </button>
            <button
              onClick={handleClick}
              className="relative flex-shrink-0 rounded-full px-4 py-2 mr-2 text-sm text-slate-950 hover:bg-slate-100 hover:text-slate-800 hidden lg:block font-inter"
            >
              Sell with us
            </button>
          </div>
          <div className="flex items-center">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/login" />
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="rounded-full border border-slate-950 px-4 py-2 mr-0 text-sm text-slate-950 hover:bg-white hover:text-slate-800 font-inter"
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-full px-4 lg:px-20 py-2 bg-slate-100 block lg:hidden">
        <Searchbar />
      </div>
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
    </div>
  );
}
