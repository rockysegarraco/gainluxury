import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import SailingIcon from "@mui/icons-material/Sailing";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import { useNavigate } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import PostAdd from "@mui/icons-material/PostAddOutlined";
import FlightOutlined from "@mui/icons-material/FlightOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import ArtTrack from "@mui/icons-material/ArtTrack";
import { useDispatch } from "react-redux";
import { setTab } from "../../store/tabSlice";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Sidebar = ({ open, handleDrawerClose, drawerIndex, openDialog }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(drawerIndex);
  const [menuIndex, setMenuIndex] = useState();
  const [menuOpen, setOpen] = React.useState(false);
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const dispatch = useDispatch();

  const LIST_ITEMS = [
    {
      title: "Cars",
      icon: <TimeToLeaveIcon />,
      show: true,
      onClick: (index) => handleClick(index, "/home/cars", false, "Cars"),
    },
    {
      title: "Real Estate",
      icon: <HomeOutlined />,
      show: true,
      onClick: (index) =>
        handleClick(index, "/home/realestate", false, "Properties"),
    },
    {
      title: "Marine",
      icon: <SailingIcon />,
      show: true,
      onClick: (index) => handleClick(index, "/home/marine", false, "Marine"),
    },
    {
      title: "Aviation",
      icon: <FlightOutlined />,
      show: true,
      onClick: (index) =>
        handleClick(index, "/home/aviation", false, "Aviation"),
    },
    {
      title: "Art",
      icon: <ArtTrack />,
      show: true,
      onClick: (index) => handleClick(index, "/home/arts", false, "Arts"),
    },
    { title: "divider" },
    {
      title: "My Listings",
      icon: <PostAdd />,
      show: true,
      onClick: (index) => handleClick(index, "/my-post", true),
    },
    {
      title: "Add Listing",
      icon: <ControlPointIcon />,
      show: true,
      onClick: (index) => handleClick(index, "/create-post"),
      isMenu: true,
    },
    {
      title: "Pricing",
      icon: <AttachMoneyIcon />,
      show: true,
      onClick: (index) => handleClick(index, "/pricing"),
    },
    { title: "divider" },

    {
      title: "Manage Account",
      show: isSignedIn,
      icon: isSignedIn ? (
        <div className="pointer-events-none">
          <UserButton />
        </div>
      ) : (
        <AccountCircleIcon />
      ),
      onClick: (index) => isSignedIn && openDialog(),
    },
  ];

  const ADD_LISTING_MENU_ITEMS = [
    {
      title: "Sell a Car",
      onClick: (index) => handleMenuItemClick(index, "/create-car-post"),
    },
    {
      title: "Sell a Property",
      onClick: (index) => handleMenuItemClick(index, "/create-property-post"),
    },
    {
      title: "Sell a Marine",
      onClick: (index) => handleMenuItemClick(index, "/create-marine-post"),
    },
    {
      title: "Sell Aviation",
      onClick: (index) => handleMenuItemClick(index, "/create-aviation-post"),
    },
    {
      title: "Sell an Art",
      onClick: (index) => handleMenuItemClick(index, "/create-art-post"),
    },
  ];
  const handleClick = (index, path, ischeck, title) => {
    dispatch(setTab(title));
    setSelectedIndex(index);
    setMenuIndex(-1);
    handleDrawerClose();
    if (ischeck) {
      isSignedIn ? navigate(path) : navigate("/login");
    } else {
      navigate(path);
    }
  };

  const handleMenuClick = () => {
    setOpen(!menuOpen);
  };

  const handleMenuItemClick = (index, route) => {
    setSelectedIndex(undefined);
    setMenuIndex(index);
    handleDrawerClose();
    if (isSignedIn) {
      navigate(route);
    } else {
      navigate("/login");
    }
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <div>Welcome!</div>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? <ClearIcon /> : <ClearIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ flex: 1 }}>
        {LIST_ITEMS.map((item, index) => (
          <div key={index}>
            {item?.isMenu ? (
              <>
                <ListItem
                  key={item.title}
                  disablePadding
                  selected={selectedIndex === index}
                  onClick={handleMenuClick}
                >
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title} />
                    {menuOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={menuOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {ADD_LISTING_MENU_ITEMS.map((menu, i) => (
                      <ListItemButton
                        key={menu.title}
                        sx={{ pl: 4 }}
                        selected={menuIndex === i}
                        onClick={() => menu.onClick(i)}
                      >
                        <ListItemText primary={menu.title} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <div>
                {item.title === "divider" ? (
                  <Divider />
                ) : (
                  <ListItem
                    key={item.title}
                    disablePadding
                    selected={selectedIndex === index}
                    onClick={() => item.onClick(index)}
                  >
                    {item.show && (
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItemButton>
                    )}
                  </ListItem>
                )}
              </div>
            )}
          </div>
        ))}
      </List>
      {isSignedIn && (
        <Button
          onClick={signOut}
          className="bg-[#212121] m-2 text-white rounded-full font-semibold normal-case"
        >
          Sign out
        </Button>
      )}
      {!isSignedIn && (
        <Button
          onClick={() => navigate("/login")}
          className="bg-[#212121] m-2 text-white rounded-full font-semibold normal-case"
        >
          Login
        </Button>
      )}
    </Drawer>
  );
};

export default Sidebar;
