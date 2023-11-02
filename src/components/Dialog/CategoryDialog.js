import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import CarRental from '@mui/icons-material/CarRental';
import Home from '@mui/icons-material/Home';
import SailingIcon from "@mui/icons-material/Sailing";
import FlightOutlined from "@mui/icons-material/FlightOutlined";
import ArtTrack from "@mui/icons-material/ArtTrack";
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function CategoryDialog({ handleClose, open }) {

  const navigate = useNavigate();
  const {isSignedIn} = useUser();

  const handleOpenPage = (page) => {
    if (isSignedIn) {
      navigate(page)
    } else {
      navigate('/login')
    }
  }

  return (
      <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Sell with us
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <div className='w-[500px]'>
      <DialogContent dividers>
        <div
        onClick={() => handleOpenPage('/create-car-post')}
         className='flex flex-row items-center justify-between w-full cursor-pointer'>
          <h1>Sell a Car</h1>
          <IconButton>
            <CarRental size={40} />
          </IconButton>
        </div>
        <Divider className='my-2' />
        <div
        onClick={() => handleOpenPage('/create-property-post')}
         className='flex flex-row items-center justify-between w-full cursor-pointer'>
          <h1>Sell a Property</h1>
          <IconButton>
            <Home size={40} />
          </IconButton>
        </div>
        <Divider className='my-2' />
        <div
        onClick={() => handleOpenPage('/create-marine-post')}
         className='flex flex-row items-center justify-between w-full cursor-pointer'>
          <h1>Sell a Marine</h1>
          <IconButton>
            <SailingIcon size={40} />
          </IconButton>
        </div>
        <Divider className='my-2' />
        <div
        onClick={() => handleOpenPage('/create-aviation-post')}
         className='flex flex-row items-center justify-between w-full cursor-pointer'>
          <h1>Sell an Aviation</h1>
          <IconButton>
            <FlightOutlined size={40} />
          </IconButton>
        </div>
        <Divider className='my-2' />
        <div
        onClick={() => handleOpenPage('/create-art-post')}
         className='flex flex-row items-center justify-between w-full cursor-pointer'>
          <h1>Sell an Arts</h1>
          <IconButton>
            <ArtTrack size={40} />
          </IconButton>
        </div>
      </DialogContent>
      </div>
     
    </BootstrapDialog>
  );
}