import './Arrival.css';
import { useContext, useRef, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import nextArrow from './arrow.png';
import prevArrow from './prev.png';
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


function NewArrival() {
  const { Allproduct } = useContext(ShopContext);
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed:2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const addTiltEffect = () => {
    const slides = document.querySelectorAll('.slider-item');
    slides.forEach((slide) => {
      slide.classList.remove('tilt');
    });

    const currentSlide = sliderRef.current.innerSlider.list.querySelector('.slick-active');
    if (currentSlide) {
      currentSlide.classList.add('tilt');
    }
  };

  const next = () => {
    sliderRef.current.slickNext();
    addTiltEffect();
  };

  const prev = () => {
    sliderRef.current.slickPrev();
    addTiltEffect();
  };

  useEffect(() => {
    addTiltEffect();
  }, []);

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="collection-div" >
      <div>
      </div>
      <div className="main mt-8">
        <h1 className=" md:font-extralight md:font-sans font-playfair-display md:text-left md:ml-2  md:text-4xl text-4xl text-green-950 text-center ">New Arrival</h1>
        <div className="flex justify-end gap-6 mr-8">
          <img onClick={prev} className="cursor-pointer w-6 h-6" src={prevArrow} alt="Prev" />
          <img onClick={next} className="cursor-pointer w-6 h-6" src={nextArrow} alt="Next" />
        </div>
        <Slider ref={sliderRef} {...settings} className="md:w-full">
          {Allproduct.map((item, i) => {
            if (item.id >= 65) {
              return (
                <motion.div
                  key={i}
                  className="text-center mt-6 ml-6 slider-item transform transition duration-500 hover:scale-105 hover:z-10 tilt"
                  initial="hidden"
                  animate="visible"
                  variants={slideVariants}
                >
                  <Link to={`/product/${item.id}` }>
                    <img
                      className="cursor-pointer  mx-auto h-80 md:w-64 rounded-lg shadow-lg"
                      src={item.image}
                      alt={item.name}
                    />
                  </Link>
                  <p className="mt-3 text-lg font-bold">{item.name}</p>
                  <div className="flex justify-center gap-4 items-center">
                    <p className="text-gray-500 line-through">{item.oldPrice}</p>
                    <p className="text-red-500">{item.newPrice}</p>
                  </div>
                </motion.div>
              );
            }
            return null;
          })}
        </Slider>
      </div>
    </div>
  );
}

export default NewArrival;
