import React, { useState, useEffect } from "react";
import corosal1 from "../assets/luxuryhome.jpg"
import corosal2 from "../assets/coursel2.jpg"
import corosal3 from "../assets/coursel3.jpg"



const Carousel = () => {


  const slides = [
    { id: 1, image: corosal1, alt: "Slide 1", category: "Bangalore ", subtitle: "Silicon Valley of India" },
    { id: 2, image: corosal2, alt: "Slide 2", category: "Mumbai ", subtitle: " City of Dreams" },
    { id: 3, image: corosal3, alt: "Slide 3", category: "Delhi  ", subtitle: "Where History Meets Hustle" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  return (
    <div className="relative w-full mt-8 pl-2.5 max-sm:max-h-[200px] pr-2.5 max-lg:w-full mx-auto ">
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-lg ">
        {/* Slides */}
        <div
          className="flex max-sm:min-h-[200px] transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="flex-shrink-0 w-full relative "
              style={{ flexBasis: "100%" }}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full lg:max-h-[530px]  object-cover  "
              />
              {/* Overlay Box */}
              <div className="max-lg:hidden lg:max-xl:p-[16px]  lg:max-xl:bottom-[30px] lg:max-xl:left-[30px] absolute p-[20px]  tracking-[1px] flex flex-row justify-around items-center bottom-[0px] left-[0px]  w-full h-full  rounded-[12px] xl:w-full xl:h-full bg-gradient-to-t from-black/90 via-black/60 to-transparent">

                <div className="flex flex-col justify-center items-center leading-[5px] text-[58px]">
                  <span style={{
                    textShadow: '0 1px 90px #8f8fff',
                  }} className=" uppercase poppins-bold text-stroke text-9xl  ">{slide.category}</span>
                  <span className=" allura-regular text-[#8f8fff]   ">{slide.subtitle}</span>
                </div>



              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-5 z-10 transform -translate-y-1/2 backdrop-blur-xl bg-black /70 hover:bg-black/20 text-white px-2 py-2 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32px" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-5 z-10 transform -translate-y-1/2 backdrop-blur-xl bg-black/70 hover:bg-black/20 text-white px-2 py-2 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32px" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex
              ? "bg-blue-500"
              : "bg-gray-300 hover:bg-gray-400"
              }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
