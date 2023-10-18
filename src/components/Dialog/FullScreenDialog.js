import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageGalleryModal from "./ImageGalleryModal";
import { XMarkIcon } from "@heroicons/react/20/solid";


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

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setDialogOpen(true);
  }

  return (
    <>
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={setOpen}
          TransitionComponent={Transition}
        >
        
          <Stack sx={{ alignItems: 'center' }}>
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
                  <ImageListItem autoFocus={selectedItem === i} key={i} cols={cols} rows={rows}>
                    <img
                      onClick={() => handleImageClick(i)}
                      {...srcset(item, 250, 200, rows, cols)}
                      alt={i}
                      loading="lazy"
                    />
                  </ImageListItem>
                );
              })}
            </ImageList>
          </Stack>
          <button
              onClick={setOpen}
              type="button"
              className="absolute top-4 right-4 inline-flex items-center bg-[#F2F2F2] rounded-md p-4 text-sm text-gray-900 hover:bg-gray-200"
            >
              <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
            </button>
          <ImageGalleryModal open={isDialogOpen} setOpen={() => setDialogOpen(!isDialogOpen)} images={images} currentIndex={currentIndex} />
        </Dialog>
      </div>
    </>
  );
}
