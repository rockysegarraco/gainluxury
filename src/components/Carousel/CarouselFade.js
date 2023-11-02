import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import "./Carousel.css";

const content = [
  <div className="relative h-full w-full">
    <img
      src="https://images.unsplash.com/photo-1689826493949-5e5824a5474e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3132&q=80"
      alt="image 3"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bottom-0 grid h-full w-full place-items-center bg-black/50">
      <div className="absolute bottom-16 w-3/4 text-center md:w-2/4">
        <img className="h-16 mb-4" src="mark.svg" />
        <div className="text-2xl lg:text-5xl text-white fancy mb-16 lg:leading-[3.5rem]">
          The Global Epicenter of
          <br /> Luxury Shopping
        </div>
        <a href="/home/cars">
          <Typography
            variant="h1"
            color="white"
            className="mb-0 text-[14px] lg:text-base uppercase font-medium font-inter tracking-widest"
          >
            CARS
          </Typography>
        </a>
      </div>
    </div>
  </div>,
  <div className="relative h-full w-full">
    <img
      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3550&q=80"
      alt="image 1"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bottom-0 grid h-full w-full place-items-center bg-black/[.50]">
      <div className="absolute bottom-16 w-3/4 text-center md:w-2/4">
        <img className="h-16 mb-4" src="mark.svg" />
        <div className="text-2xl lg:text-5xl text-white fancy mb-16 lg:leading-[3.5rem]">
          The Global Epicenter of
          <br /> Luxury Shopping
        </div>
        <a href="/home/real-estate">
          <Typography
            variant="h1"
            color="white"
            className="mb-0 text-[14px] lg:text-base uppercase font-medium font-inter tracking-widest"
          >
            Residential Real Estate
          </Typography>
        </a>
      </div>
    </div>
  </div>,
  <div className="relative h-full w-full">
    <img
      src="https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=2924&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="image 2"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bottom-0 grid h-full w-full place-items-center bg-black/50">
      <div className="absolute bottom-16 w-3/4 text-center md:w-2/4">
        <img className="h-16 mb-4" src="mark.svg" />
        <div className="text-2xl lg:text-5xl text-white fancy mb-16 lg:leading-[3.5rem]">
          The Global Epicenter of
          <br /> Luxury Shopping
        </div>
        <a href="/home/marine">
          <Typography
            variant="h1"
            color="white"
            className="mb-0 text-[14px] lg:text-base uppercase font-medium font-inter tracking-widest"
          >
            MARINE
          </Typography>
        </a>
      </div>
    </div>
  </div>,
  <div className="relative h-full w-full">
    <img
      src="https://images.unsplash.com/photo-1583169327375-a5078762c09c?auto=format&fit=crop&q=80&w=3091&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="image 3"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bottom-0 grid h-full w-full place-items-center bg-black/50">
      <div className="absolute bottom-16 w-3/4 text-center md:w-2/4">
        <img className="h-16 mb-4" src="mark.svg" />
        <div className="text-2xl lg:text-5xl text-white fancy mb-16 lg:leading-[3.5rem]">
          The Global Epicenter of
          <br /> Luxury Shopping
        </div>
        <a href="/home/aviation">
          <Typography
            variant="h1"
            color="white"
            className="mb-0 text-[14px] lg:text-base uppercase font-medium font-inter tracking-widest"
          >
            Aviation
          </Typography>
        </a>
      </div>
    </div>
  </div>,
  <div className="relative h-full w-full">
    <img
      src="https://images.unsplash.com/photo-1614969263964-f381e32b337d?auto=format&fit=crop&q=80&w=3731&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="image 3"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bottom-0 grid h-full w-full place-items-center bg-black/50">
      <div className="absolute bottom-16 w-3/4 text-center md:w-2/4">
        <img className="h-16 mb-4" src="mark.svg" />
        <div className="text-2xl lg:text-5xl text-white fancy mb-16 lg:leading-[3.5rem]">
          The Global Epicenter of
          <br /> Luxury Shopping
        </div>
        <a href="/home/real-estate">
          <Typography
            variant="h1"
            color="white"
            className="mb-0 text-[14px] lg:text-base uppercase font-medium font-inter tracking-widest"
          >
            Commercial Real Estate
          </Typography>
        </a>
      </div>
    </div>
  </div>,
];

const Carousel = () => {
  const [counter, setCounter] = useState(1);
  const [pause, setPause] = useState(false);

  const handleNext = () => {
    if (counter !== content.length) {
      setCounter(counter + 1);
    } else {
      setCounter(1);
    }
  };

  const handlePre = () => {
    if (counter !== 1) {
      setCounter(counter - 1);
    } else {
      setCounter(content.length);
    }
  };

  const handlePage = (page) => {
    setCounter(page);
  };

  const handleMouse = () => {
    setPause(!pause);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (!pause) {
        handleNext();
      } else {
        clearInterval(interval);
      }
    }, 9000);
    return () => clearInterval(interval);
  });

  return (
    <div className="App">
      <div
        className="slide"
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
      >
        {content.map((item, index) => (
          <div
            className={counter - 1 === index ? "show" : "not-show"}
            key={index}
          >
            {item}
          </div>
        ))}

        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePre}
          className="!absolute top-2/4 left-4 -translate-y-2/4 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>

        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      </div>

      <div className="absolute bottom-24 lg:bottom-28 left-2/4 z-50 flex -translate-x-2/4 gap-2">
        {new Array(content.length).fill("").map((_, i) => (
          <span
            key={i}
            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
              counter - 1 === i ? "w-8 bg-white" : "w-4 bg-white/50"
            }`}
            onClick={() => handlePage(i + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
