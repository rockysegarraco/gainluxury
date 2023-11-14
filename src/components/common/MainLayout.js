import React from 'react'
import Box from '@mui/material/Box'
import { Outlet, useLocation } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { useState } from "react";

// components
//import Topbar from './Topbar'
import Sidebar from './Sidebar'
import ProfileDialog from '../Dialog/ProfileDialog'
import Navbar from './Nav';

// configs
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1, 
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	// ...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));


const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: "flex", flexDirection: 'column' }}>
      <Navbar handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} openDialog={() => setOpenDialog(!openDialog)} drawerIndex={location.state?.drawerIndex} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
      <ProfileDialog open={openDialog} setOpen={() => setOpenDialog(!openDialog)}  />
    </Box>
  )
}

export default MainLayout
