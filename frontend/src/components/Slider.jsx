import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import slide_image_1 from '../../public/images/alumni_photos/ankush_khanna.jpeg';
import slide_image_2 from '../../public/images/alumni_photos/sandeep_jain.jpeg';
import slide_image_3 from '../../public/images/alumni_photos/anubhav_sethi.jpeg';
import slide_image_4 from '../../public/images/alumni_photos/manisha_bansal.jpeg';
import slide_image_5 from '../../public/images/alumni_photos/nikhil_aggarwal.jpeg';
import slide_image_6 from '../../public/images/alumni_photos/manoj_yadav.jpeg';
import slide_image_7 from '../../public/images/alumni_photos/seema_goel.jpeg';

function Slider() {
  const data = [
    { img: slide_image_6, name: 'Manoj Yadav', description: 'Founder&CEO @ Prismberry Technologies, General Manager @ eYantra Ventures - EMEA' },
    { img: slide_image_5, name: 'Nikhil Aggarwal', description: 'CEO @ VectoScalar, Co-Founder & CTO at WorldClass Tech Talent Pvt. Ltd.' },
    { img: slide_image_7, name: 'Seema Goel', description: 'Vice President at HCL Technologies, Ex-AVP Ex-Global Director at HCL Technologies' },
    { img: slide_image_2, name: 'Sandeep Jain', description: 'Sr. Engineering Manager at Adobe, Personal Finance guide, Coach & Mentor' },
    { img: slide_image_4, name: 'Manisha Bansal', description: 'SDE at Cisco (San Jose), Ex-Technical Lead at Aricent Group' },
    { img: slide_image_1, name: 'Ankush Khanna', description: 'SDE III at Google, Ex- SDE II at Microsoft, Ex- SDE II at Zomato, Ex-SDE at Paytm' },
    { img: slide_image_3, name: 'Anubhav Sethi', description: 'SDE III at Google, Ex-SDE at Amazon, Ex-SDE at Walmart, Ex-SDE at HiLabs' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 sm:w-[90%] md:w-[75%] lg:w-[60%]">
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
        className="swiper-container h-auto py-8 relative"
      >
        {data.map((person, index) => (
          <SwiperSlide key={index} className="max-w-[90%] sm:max-w-[80%] md:max-w-[370px] h-auto flex items-center justify-center">
            <div className="w-full flex flex-col sm:flex-row bg-white shadow-xl rounded-lg p-4">
              {/* Image Section */}
              <div className="w-full sm:w-[40%] flex items-center justify-center">
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-auto object-cover rounded-lg max-h-[300px]"
                />
              </div>
              {/* Description Section */}
              <div className="w-full sm:w-2/3 h-full p-4 flex flex-col justify-center text-center sm:text-left">
                <h3 className="text-lg sm:text-2xl font-semibold mb-2">{person.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{person.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Controls */}
        {/* <div className="slider-controler mt-4 sm:mt-8 flex items-center justify-center gap-4">
          <MdOutlineSwipeLeft className='text-[2rem] sm:text-[3rem] swiper-button-prev slider-arrow opacity-80 rounded-full cursor-pointer'/>
          <MdOutlineSwipeRight className='text-[2rem] sm:text-[3rem] swiper-button-next slider-arrow opacity-80 rounded-full cursor-pointer'/>
        </div> */}
        
        {/* Pagination */}
        {/* <div className="swiper-pagination relative w-40 sm:w-60 bottom-2 sm:bottom-4"></div> */}
      </Swiper>
    </div>
  );
}

export default Slider;
