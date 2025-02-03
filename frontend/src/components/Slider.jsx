import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import slide_image_1 from './assets/images/img_1.jpg';
import slide_image_2 from './assets/images/img_2.jpg';
import slide_image_3 from './assets/images/img_3.jpg';
import slide_image_4 from './assets/images/img_4.jpg';
import slide_image_5 from './assets/images/img_5.jpg';
import slide_image_6 from './assets/images/img_6.jpg';
import slide_image_7 from './assets/images/img_7.jpg';

import { MdOutlineSwipeLeft, MdOutlineSwipeRight } from "react-icons/md";

function Slider() {
  // Example data with the old images as placeholders for the "person" images
  const data = [
    { img: slide_image_1, name: 'John Doe', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    { img: slide_image_2, name: 'Jane Smith', description: 'Curabitur ac felis arcu. Ut tincidunt quam vitae fringilla tempus.' },
    { img: slide_image_3, name: 'Michael Lee', description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.' },
    { img: slide_image_4, name: 'Sarah Williams', description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada.' },
    { img: slide_image_5, name: 'Chris Johnson', description: 'Aenean ut justo et arcu finibus laoreet at quis sapien.' },
    { img: slide_image_6, name: 'Emily Davis', description: 'Duis placerat massa eget erat tincidunt scelerisque.' },
    { img: slide_image_7, name: 'David Brown', description: 'Maecenas volutpat massa quis volutpat feugiat.' },
  ];

  return (
    <div className="container w-[60%] mx-auto px-4 py-8">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper-container h-[520px] py-8 relative"
      >
        {data.map((person, index) => (
          <SwiperSlide key={index} className="w-[370px] h-[420px] relative flex items-center justify-center">
            <div className="flex w-full h-full bg-white shadow-xl rounded-lg">
              {/* Left Section: Image */}
              <div className="w-[40%] flex items-center justify-end   h-full p-4">
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-[90%] h-[90%] object-cover rounded-lg"
                />
              </div>
              {/* Right Section: Description */}
              <div className="w-2/3 h-full p-4 flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-2">{person.name}</h3>
                <p className="text-gray-600 text-justify">{person.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="slider-controler mt-8 flex items-center justify-center">

          <MdOutlineSwipeRight className='text-[3rem] swiper-button-prev slider-arrow w-14 h-14 opacity-80 rounded-full flex items-center justify-center cursor-pointer'/>
          <MdOutlineSwipeLeft className='text-[3rem] swiper-button-next slider-arrow w-14 h-14 opacity-80 rounded-full flex items-center justify-center cursor-pointer'/>
          <div className="swiper-pagination relative w-60 bottom-4"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default Slider;
