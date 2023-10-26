import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import ImageGallery from "react-image-gallery";
import styled from "@emotion/styled";
import { XMarkIcon } from "@heroicons/react/20/solid";

const ImageContainer = styled.div`
.image-gallery-image {
    width: 900px;
    height: 650px;
}
`;

export default function ImageGalleryModal({ open, setOpen, images, currentIndex = 0 }) {

  const ImageItems = () => {
    const imageData = images.map((item) => {
      return { original: item, thumbnail: item }
    })
    return imageData;
  }

  return (
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "black",
          }
        }}
        fullScreen
        open={open}
        onClose={setOpen}
      >
        <Stack className="items-end mx-4 mt-5" >
          <button
            onClick={setOpen}
            type="button"
            className="relative inline-flex items-center bg-[#F2F2F2] rounded-md p-2 text-sm text-gray-900 hover:bg-gray-200"
          >
            <XMarkIcon className="h-5 w-5 text-gray-900" aria-hidden="true" />
          </button>
        </Stack>

        <Stack sx={{ alignItems: 'center' }}>
          <ImageContainer>
            <ImageGallery items={ImageItems()} startIndex={currentIndex} showFullscreenButton={false} />
          </ImageContainer>
        </Stack>
      </Dialog>
  );
}
