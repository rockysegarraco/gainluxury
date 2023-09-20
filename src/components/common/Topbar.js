import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { UserButton } from '@clerk/clerk-react';

const Topbar = ({ open, handleDrawerOpen, handleOpen }) => {
  return (
    <AppBar position="fixed" open={open} color='inherit' elevation={0}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <div className="flex px-2 lg:px-0">
          <div className="flex flex-shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt="Your Company"
            />
          </div>
        </div>
        <Box sx={{ flexGrow: 1 }} />
        <button type='button' onClick={handleOpen}
          className="rounded-full bg-slate-900 px-6 py-2 mx-4 text-sm font-semibold text-white cursor-pointer"> + Post Ad
        </button>
        <UserButton />
      </Toolbar>
    </AppBar>
  )
}

export default Topbar;
