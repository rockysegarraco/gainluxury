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
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Sidebar = ({ open, handleDrawerClose, drawerIndex = 0, openDialog }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(drawerIndex);
  const [menuIndex, setMenuIndex] = useState(0);
  const [menuOpen, setOpen] = React.useState(false);
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();

  const LIST_ITEMS = [
    {
      title: "Real Estate",
      icon: <HomeOutlined />,
      onClick: (index) => handleMenuItemClick(index, "/home/real-estate"),
    },
    {
      title: "Cars",
      icon: <TimeToLeaveIcon />,
      onClick: (index) => handleMenuItemClick(index, "/home/cars"),
    },
    {
      title: "Marine",
      icon: <SailingIcon />,
      onClick: (index) => handleMenuItemClick(index, "/home/marine"),
    },
    {
      title: "Aviation",
      icon: <FlightOutlined />,
      onClick: (index) => handleMenuItemClick(index, "/home/aviation"),
    },
    { title: "divider" },
    {
      title: "My Listings",
      icon: <PostAdd />,
      onClick: (index) => handleClick(index, "/my-post"),
    },
    {
      title: "Add Listing",
      icon: <ControlPointIcon />,
      onClick: (index) => handleClick(index, "/create-post"),
    },
    {
      title: "Pricing",
      icon: <AttachMoneyIcon />,
      onClick: (index) => handleClick(index, "/pricing"),
    },
    { title: "divider" },
    {
      title: "Manage Account",
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

  const MENU_ITEMS = [
    {
      title: "Real Estate",
      onClick: (index) => handleMenuItemClick(index, "/home/real-estate"),
    },
    {
      title: "Cars",
      onClick: (index) => handleMenuItemClick(index, "/home/cars"),
    },
    {
      title: "Marine",
      onClick: (index) => handleMenuItemClick(index, "/home/marine"),
    },
    {
      title: "Aviation",
      onClick: (index) => handleMenuItemClick(index, "/home/aviation"),
    },
  ];
  const handleClick = (index, path) => {
    setSelectedIndex(index);
    setMenuIndex(-1);
    handleDrawerClose();
    navigate(path);
  };

  const handleMenuClick = () => {
    setOpen(!menuOpen);
  };

  const handleMenuItemClick = (index, route) => {
    setSelectedIndex(0);
    setMenuIndex(index);
    handleDrawerClose();
    navigate(route);
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
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <div>Welcome!</div>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List className="flex-1">
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
                    {MENU_ITEMS.map((menu, i) => (
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
                    <ListItemButton>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
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
          onClick={() => navigate('/login')}
          className="bg-[#212121] m-2 text-white rounded-full font-semibold normal-case"
        >
          Login
        </Button>
      )}
    </Drawer>
  );
};

export default Sidebar;
