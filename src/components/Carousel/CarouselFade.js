import React, { useState, useEffect } from "react";
import { IconButton } from "@material-tailwind/react";
import { Typography, Button } from "@material-tailwind/react";
import "./Carousel.css";

const content = [
  <div className="relative h-full w-full">
  <img
    src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
    alt="image 1"
    className="h-full w-full object-cover"
  />
  <div className="absolute inset-0 bottom-0 grid h-full w-full place-items-center bg-black/75">
    <div className="absolute bottom-0 w-3/4 text-center md:w-2/4">
      <a href="/">
        <Typography
          variant="h1"
          color="white"
          className="mb-0 text-base uppercase"
        >
          3057 Se Dune Drive, Stuart, Fl
        </Typography>
        <Typography className="mb-12 opacity-80 text-base text-white">
          6 Beds 8 Baths 8,542 sqft 33,977 sqft lot $1,931/sqft
        </Typography>
      </a>
    </div>
  </div>
</div>,
<div className="relative h-full w-full">
  <img
    src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
    alt="image 2"
    className="h-full w-full object-cover"
  />
  <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
    <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
      <Typography
        variant="h1"
        color="white"
        className="mb-4 text-3xl md:text-4xl lg:text-5xl"
      >
        The Beauty of Nature
      </Typography>
      <Typography
        variant="lead"
        color="white"
        className="mb-12 opacity-80"
      >
        It is not so much for its beauty that the forest makes a claim
        upon men&apos;s hearts, as for that subtle something, that
        quality of air that emanation from old trees, that so
        wonderfully changes and renews a weary spirit.
      </Typography>
      <div className="flex gap-2">
        <Button size="lg" color="white">
          Explore
        </Button>
        <Button size="lg" color="white" variant="text">
          Gallery
        </Button>
      </div>
    </div>
  </div>
</div>,
<div className="relative h-full w-full">
  <img
    src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
    alt="image 3"
    className="h-full w-full object-cover"
  />
  <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
    <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
      <Typography
        variant="h1"
        color="white"
        className="mb-4 text-3xl md:text-4xl lg:text-5xl"
      >
        The Beauty of Nature
      </Typography>
      <Typography
        variant="lead"
        color="white"
        className="mb-12 opacity-80"
      >
        It is not so much for its beauty that the forest makes a claim
        upon men&apos;s hearts, as for that subtle something, that
        quality of air that emanation from old trees, that so
        wonderfully changes and renews a weary spirit.
      </Typography>
      <div className="flex gap-2">
        <Button size="lg" color="white">
          Explore
        </Button>
        <Button size="lg" color="white" variant="text">
          Gallery
        </Button>
      </div>
    </div>
  </div>
</div>
]

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

  const handlePage = page => {
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
    }, 3000);
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
          className="!absolute top-2/4 left-4 -translate-y-2/4"
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


      <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
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
