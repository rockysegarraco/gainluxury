import React, { useState } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import FullScreenDialog from './Dialog/FullScreenDialog';
import ImageGalleryModal from './Dialog/ImageGalleryModal';

function srcset(image, size, rows = 1, cols = 1) {
	return {
		src: `${image}?w=${size * cols}&h=${size * rows}&fit=contain&auto=format`,
		srcSet: `${image}?w=${size * cols}&h=${size * rows
			}&fit=contain&auto=format&dpr=2`,
	};
}

const Gallery = ({ images }) => {
	const [isOpen, setIsOpen] = useState(false);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageDialog = (index) => {
    setCurrentIndex(index);
    setDialogOpen(true);
  }

	const imageGrid = () => {
		let imageData = [];
		if (images.length === 1) {
			imageData = [{
				title: 'image1',
				img: images[0],
				rows: 1,
				cols: 6
			}]
		}
		if (images.length === 2) {
			imageData = [
				{
					title: 'image1',
					img: images[0],
					rows: 2,
					cols: 6
				},
				{
					title: 'image2',
					img: images[1],
					rows: 2,
					cols: 6
				}
			]
		}
		if (images.length === 3) {
			imageData = [
				{
					title: 'image1',
					img: images[0],
					rows: 2,
					cols: 6
				},
				{
					title: 'image2',
					img: images[1],
					rows: 2,
					cols: 3
				},
				{
					title: 'image3',
					img: images[2],
					rows: 2,
					cols: 3
				}
			]
		}
		if (images.length === 4) {
			imageData = [
				{
					title: 'image1',
					img: images[0],
					rows: 2,
					cols: 6
				},
				{
					title: 'image2',
					img: images[1],
					cols: 3
				},
				{
					title: 'image3',
					img: images[2],
					cols: 3
				},
				{
					title: 'image3',
					img: images[3],
					cols: 6
				}
			]
		}
		if (images.length >= 5) {
			imageData = [
				{
					title: 'image1',
					img: images[0],
					rows: 2,
					cols: 6
				},
				{
					title: 'image2',
					img: images[1],
					cols: 3
				},
				{
					title: 'image3',
					img: images[2],
					cols: 3
				},
				{
					title: 'image3',
					img: images[3],
					cols: 3
				},
				{
					title: 'image3',
					img: images[4],
					cols: 3
				}
			]
		}
		return imageData;
	}

	return (
		<div className='relative'>
		<ImageList
			sx={{ borderRadius: 3, maxHeight: 450}}
			variant="quilted"
			cols={12}
		>
			{imageGrid()?.map((item, index) => (
				<ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
					<img
						onClick={() => setIsOpen(true)}
						className='hover:opacity-80 cursor-pointer'
						{...srcset(item.img, 121, item.rows, item.cols)}
						style={{maxHeight: 450, height: index !== 0 ? (imageGrid().length > 3 ? 223 : 450)  : 450}}
						alt={item.title}
						loading="lazy"
					/>
				</ImageListItem>
			))}
		</ImageList>
		<div 
		onClick={() => setIsOpen(true)}
		className='bg-white border border-1 border-black px-3 py-1 absolute right-4 bottom-4 cursor-pointer rounded text-sm font-semibold'>
			Show all photos
		</div>
		<FullScreenDialog 
      handleImageDialog={handleImageDialog}
      open={isOpen} 
      setOpen={() => setIsOpen(!isOpen)} 
      images={images} selectedItem={2}  />
    <ImageGalleryModal
            open={isDialogOpen}
            setOpen={() => setDialogOpen(!isDialogOpen)}
            images={images}
            currentIndex={currentIndex}
          />
		</div>
	)
}

export default Gallery
