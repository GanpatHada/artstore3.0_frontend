import { GrNext, GrPrevious } from "react-icons/gr";
import poster1 from "../../../../images/artstore_poster_1.svg";
import poster2 from "../../../../images/artstore_poster2.svg";
import poster3 from "../../../../images/artstore_poster3.svg";
import "./SlideShow.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Navigation,Autoplay} from 'swiper/modules';
const SlideShow = () => {
  const slidesArray = [
    <img src={poster1} alt="" />,
    <img src={poster2} alt="" />,
    <img src={poster3} alt="" />,
  ];

  return (
    <section id="slide-show">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay,Navigation]}
        className="mySwiper"
      >
        {
          slidesArray.map((slide,index)=>{
            return (
               <SwiperSlide key={index}>{slide}</SwiperSlide>
            )
          })
        }
      </Swiper>
    </section>
  );
};

export default SlideShow;
