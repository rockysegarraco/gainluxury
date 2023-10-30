import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import { EmailIcon, EmailShareButton, FacebookIcon, FacebookMessengerIcon, FacebookMessengerShareButton, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import CopyAllOutlined from '@mui/icons-material/CopyAll';
import { toast } from 'react-toastify';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ShareDialog({ handleClose, open, link }) {
  const baseUrl = `https://gainluxury.vercel.app/${link}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(baseUrl);
    toast.success('🦄 URL copied', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Share
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
      <DialogContent dividers>
        <div className='flex flex-row items-center justify-between w-full'>
          <h1>Copy URL</h1>
          <IconButton
            aria-label="copy"
            onClick={handleCopy}
          >
            <CopyAllOutlined size={40} />
          </IconButton>
        </div>
        <Divider className='my-2' />
        <EmailShareButton
          url={baseUrl}
          className='flex min-w-[400px]'>
          <div className='flex flex-row items-center justify-between w-full'>
            <h1>Email</h1>
            <EmailIcon size={40} round />
          </div>
        </EmailShareButton>
        <Divider className='my-2' />
        <FacebookMessengerShareButton
         url={baseUrl}
          className='flex min-w-[400px]'>
          <div className='flex flex-row items-center justify-between w-full'>
            <h1>Messenger</h1>
            <FacebookMessengerIcon size={40} round />
          </div>
        </FacebookMessengerShareButton>
        <Divider className='my-2' />
        <FacebookShareButton
          url={baseUrl}
          className='flex min-w-[400px]'>
          <div className='flex flex-row items-center justify-between w-full'>
            <h1>Facebook</h1>
            <FacebookIcon size={40} round />
          </div>
        </FacebookShareButton>
        <Divider className='my-2' />
        <TwitterShareButton
          url={baseUrl}
          className='flex min-w-[400px]'>
          <div className='flex flex-row items-center justify-between w-full'>
            <h1>Twitter</h1>
            <TwitterIcon size={40} round />
          </div>
        </TwitterShareButton>
        <Divider className='my-2' />
        <WhatsappShareButton
          url={baseUrl}
          className='flex min-w-[400px]'>
          <div className='flex flex-row items-center justify-between w-full'>
            <h1>WhatsApp</h1>
            <WhatsappIcon size={40} round />
          </div>
        </WhatsappShareButton>
      </DialogContent>
    </BootstrapDialog>
  );
}