import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Share from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from "@mui/material/IconButton";
import ImageGallery from "react-image-gallery";
import styled from "@emotion/styled";

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
        <div style={{ backgroundColor: "#212121" }}>
            <Dialog
                PaperProps={{
                    style: {
                        backgroundColor: "#212121"
                    }
                }}
                fullScreen
                open={open}
                onClose={setOpen}
                className="relative"
            >
                <Stack
                    sx={{ flexDirection: 'row', justifyContent: 'space-between', m: 1 }} >
                    <div>
                        <IconButton onClick={setOpen}>
                            <ArrowBackIosNewIcon color="primary" />
                        </IconButton>
                    </div>
                    <Stack sx={{ flexDirection: 'row' }}>
                        <IconButton size="medium">
                            <Share color="primary" />
                        </IconButton>
                        <IconButton size="medium">
                            <FavoriteBorderIcon color="warning" />
                        </IconButton>
                    </Stack>
                </Stack>

                <Stack sx={{ alignItems: 'center' }}>
                    <ImageContainer>
                        <ImageGallery items={ImageItems()} startIndex={currentIndex} showFullscreenButton={false} />
                    </ImageContainer>
                </Stack>

            </Dialog>
        </div>
    );
}
