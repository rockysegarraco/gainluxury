import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({open, setOpen, setItem}) {
  
 
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={setOpen}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={setOpen}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Select Category
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button onClick={() => setItem('cars')}>
            <ListItemText primary="Sell Cars" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setItem('property')}>
            <ListItemText
              primary="Sell Property"
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
