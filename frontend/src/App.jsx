import React from 'react'
import Header from './components/Header'
import Carousel from './components/Carousel'
const slides = [
  "./images/slides/1.jpeg",
  "./images/slides/2.jpeg",
  "./images/slides/3.jpeg",
  "./images/slides/4.jpeg"
];

const App = () => {
  return (
    <div className='h-screen'>
        <Header></Header>
        <div className="mt-[2rem] w-[90%] mx-auto">
        <Carousel autoSlide={true} autoSlideInterval={3000}>
          {slides.map((s, index) => (
            <img key={index} src={s} alt={`Slide ${index + 1}`} />
          ))}
        </Carousel>
        </div>
    </div>
  )
}

export default App