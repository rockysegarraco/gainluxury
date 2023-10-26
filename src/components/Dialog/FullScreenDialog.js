import React from "react";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { XMarkIcon } from "@heroicons/react/20/solid";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  open,
  setOpen,
  images,
  selectedItem = 0,
  handleImageDialog
}) {

  return (
      <div>
        <Dialog
          fullScreen
          open={open}
          onClose={setOpen}
          TransitionComponent={Transition}
        >
          <Stack sx={{ alignItems: "center" }}>
            <ImageList
              sx={{
                transform: "translateZ(0)",
              }}
              gap={1}
            >
              {images.map((item, i) => {
                const cols = 1;
                const rows = 2;
                return (
                  <ImageListItem
                    autoFocus={selectedItem === i}
                    key={i}
                    cols={cols}
                    rows={rows}
                  >
                    <img
                      className="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                      src={item}
                      onClick={() => handleImageDialog(i)}
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
        </Dialog>
      </div>
  );
}
