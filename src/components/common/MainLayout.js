import React from 'react'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";

// components
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import FullScreenDialog from '../Dialog/FullScreenDialog';
import { setPrice } from '../../store/addPostSlice';

// configs

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));


const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setModalOpen(false);
  };

  const setItems = (item) => {
    setModalOpen(false);
    dispatch(setPrice(item));
    navigate("/create-post");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Topbar open={open} handleOpen={() => setModalOpen(true)} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
      <FullScreenDialog open={modalOpen} setOpen={handleOpen} setItem={setItems} />
    </Box>
  )
}

export default MainLayout
