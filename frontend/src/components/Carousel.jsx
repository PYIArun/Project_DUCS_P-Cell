import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import React from "react";

export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 5000,
}) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(() => {
      next(); // Call `next` directly
    }, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval]); // Remove `curr` from dependencies

  return (
    <div className="overflow-hidden relative h-[20rem] sm:h-[30rem] md:h-[40rem] lg:h-[48rem]">
      {/* Slides Container */}
      <div
        className="flex transition-transform ease-out duration-500 h-full"
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            {/* Ensure images take full width and height */}
            <div className="w-full h-full">
              {React.cloneElement(slide, {
                className: "w-full h-full object-cover", // Apply Tailwind classes to the image
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow transition-all ease-in text-white hover:bg-white hover:text-gray-800 hover:opacity-40"
        >
          <ChevronLeft size={30} className="sm:w-8 sm:h-8 md:w-10 md:h-10" />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow transition-all ease-in text-white hover:bg-white hover:text-gray-800 hover:opacity-40"
        >
          <ChevronRight size={30} className="sm:w-8 sm:h-8 md:w-10 md:h-10" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`
                transition-all w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full
                ${curr === i ? "p-1 sm:p-2" : "bg-opacity-50"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}