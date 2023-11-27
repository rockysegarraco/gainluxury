import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import "./Carousel.css";
import { useDispatch } from "react-redux";
import { setTab } from "../../store/tabSlice";



const Carousel = ({ content, link }) => {
  const [counter, setCounter] = useState(1);
  const [pause, setPause] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleMouse = () => {
    setPause(!pause);
  };

   return (
    <div className="App">
      <div
        className="slide2"
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
      >
        {content?.map((item, index) => (
          <div
            className={counter - 1 === index ? "show" : "not-show"}
            key={index}
          >
            <button onClick={() => navigate(link)|dispatch(setTab(""))}>
              <img
                src={item}
                className="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                alt=""
              />
            </button>
          </div>
        ))}

        {pause && (<IconButton
          variant="text"
          size="lg"
          onClick={handlePre}
          className="!absolute top-2/4 left-4 -translate-y-2/4 ring-1 ring-white bg-white"
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
        </IconButton>)}

        {pause && (<IconButton
          variant="text"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4 ring-1 ring-white bg-white"
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
        </IconButton>)}
      </div>

      <div className="absolute bottom-5 left-2/4 z-50 flex -translate-x-2/4 gap-2">
        {new Array(content.length).fill("").map((_, i) => (
          <span
            key={i}
            className={`block h-1 cursor-pointer rounded-full transition-all content-[''] ${counter - 1 === i ? "w-2 bg-white" : "w-2 bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
