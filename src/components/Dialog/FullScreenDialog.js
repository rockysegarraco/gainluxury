import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Share from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ListItemIcon } from "@mui/material";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}


export default function FullScreenDialog({ open, setOpen, images, selectedItem = 0 }) {
  return (
    <>
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={setOpen}
          TransitionComponent={Transition}
          className="relative"
        >
          <Stack
            sx={{ flexDirection: 'row', justifyContent: 'space-between', m: 1, position: 'sticky', top: 5  }} >
            <div>
              <IconButton onClick={setOpen}>
                <ArrowBackIosNewIcon />
              </IconButton>
            </div>
            <Stack sx={{ flexDirection: 'row' }} gap={2}>
              <Typography sx={{ fontSize: 16, cursor: "pointer" }}>
                <IconButton size="medium">
                  <Share />
                </IconButton> Share
              </Typography>
              <Typography sx={{ fontSize: 16, cursor: "pointer" }}>
                <IconButton size="medium">
                  <FavoriteBorderIcon />
                </IconButton> Save
              </Typography>
            </Stack>
          </Stack>

          <Stack sx={{ alignItems: 'center'}}>
            <ImageList
              sx={{
                transform: 'translateZ(0)',
              }}
              gap={1}
            >
              {images.map((item, i) => {
                const cols = 2;
                const rows = 2;
                return (
                  <ImageListItem autoFocus={selectedItem === i} key={ListItemIcon} cols={cols} rows={rows}>
                    <img
                      {...srcset(item, 250, 200, rows, cols)}
                      alt={i}
                      loading="lazy"
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </Stack>

        </Dialog>
      </div>
    </>
  );
}
