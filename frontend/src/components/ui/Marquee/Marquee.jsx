import React from "react";
import "./Marquee.css";

const images1 = [
  './images/company_logos/accolite.png',
  './images/company_logos/adobe.png',
  './images/company_logos/amazon.png',
  './images/company_logos/axtria.png',
  './images/company_logos/blackrock.png',
  './images/company_logos/chegg.png',
  './images/company_logos/ciena.png',
  './images/company_logos/coding_ninjas.png',
]


const images2 = [
  './images/company_logos/cvent.png',
  './images/company_logos/delloite.png',
  './images/company_logos/housing.png',
  './images/company_logos/microsoft.png',
  './images/company_logos/morgan_stanley.png',
  './images/company_logos/nagarrow.png',
  './images/company_logos/paytm.png',
  './images/company_logos/yamaha.png',
]




const Marquee = () => {
  return (
    <div className="marquee-container">
      <div className="wrapper ">
      {images1.map((image, index) => (
        <div key={index} className={`itemLeft item${index + 1}`}>
          <img src={image} alt={`Image ${index + 1}`} />
        </div>
      ))}
      </div>
      <div className="wrapper">
      {images2.map((image, index) => (
        <div key={index} className={`itemRight item${index + 1}`}>
          <img src={image} alt={`Image ${index + 1}`} />
        </div>
      ))}
      </div>
    </div>
  );
};

export default Marquee;
