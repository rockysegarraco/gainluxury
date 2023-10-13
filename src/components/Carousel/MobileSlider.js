import React from "react";
import Typography from "@mui/material/Typography";
import { Carousel } from 'react-responsive-carousel';

const MobileSlider = () => {
  const settings = {
    autoPlay: true,
    infiniteLoop: true,
    showArrows: false,
    showThumbs: false,
    swipeable: true,
    showStatus: false,
  };
  return (
      <Carousel {...settings}>
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3550&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bottom-0 grid h-full w-full place-items-center bg-black/[.50]">
            <div className="absolute bottom-0 w-3/4 text-center md:w-2/4">
              <img className="h-16 mb-4" src="mark.svg" />
              <div className="text-2xl lg:text-5xl text-white fancy mb-16 lg:leading-[3.5rem]">
                The Global Epicenter of
                <br /> Luxury Shopping
              </div>
              <a href="/">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-0 text-[14px] lg:text-base uppercase font-bold"
                >
                  795 Fifth Avenue 2311, New York, Ny 10065
                </Typography>
                <Typography className="mb-12 opacity-80 font-semibold text-[12px] lg:text-sm text-white uppercase">
                  6 Beds 8 Baths 8,542 sqft 33,977 sqft
                </Typography>
              </a>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3432&q=80"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bottom-0 grid h-full w-full place-items-center bg-black/50">
            <div className="absolute bottom-0 w-3/4 text-center md:w-2/4">
              <img className="h-16 mb-4" src="mark.svg" />
              <div className="text-2xl lg:text-5xl text-white fancy mb-16 lg:leading-[3.5rem]">
                The Global Epicenter of
                <br /> Luxury Shopping
              </div>
              <a href="/">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-0 text-[14px] lg:text-base uppercase font-bold"
                >
                  136 East Street 6 A, New York, Ny 10075
                </Typography>
                <Typography className="mb-12 opacity-80 font-semibold text-[12px] lg:text-sm text-white uppercase">
                  4 Beds 4 Baths 863 sqm lot
                </Typography>
              </a>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full">
          <img
            src="https://images.unsplash.com/photo-1689826493949-5e5824a5474e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3132&q=80"
            alt="image 3"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bottom-0 grid h-full w-full place-items-center bg-black/50">
            <div className="absolute bottom-0 w-3/4 text-center md:w-2/4">
              <img className="h-16 mb-4" src="mark.svg" />
              <div className="text-2xl lg:text-5xl text-white fancy mb-16 lg:leading-[3.5rem]">
                The Global Epicenter of
                <br /> Luxury Shopping
              </div>
              <a href="/">
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-0 text-[14px] lg:text-base uppercase font-bold"
                >
                  2019 Bugatti Chiron Sport
                </Typography>
                <Typography className="mb-12 opacity-80 font-semibold text-[12px] lg:text-sm text-white uppercase">
                  Monaco, Monaco
                </Typography>
              </a>
            </div>
          </div>
        </div>
      </Carousel>
  );
}

export default MobileSlider;