import poster1 from "../../../../images/artstore_poster_1.webp";
import poster2 from "../../../../images/artstore_poster2.webp";
import poster3 from "../../../../images/artstore_poster3.webp";
import "./SlideShow.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const SlideShow = () => {
  const slidesArray = [
    <img
      fetchpriority="high"
      decoding="async"
      loading="eager"
      src={poster1}
      alt="Artstore Poster 1"
    />,
    <img
      decoding="async"
      loading="lazy"
      src={poster2}
      alt="Artstore Poster 2"
    />,
    <img
      decoding="async"
      loading="lazy"
      src={poster3}
      alt="Artstore Poster 3"
    />,
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
        modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
        {slidesArray.map((slide, index) => (
          <SwiperSlide key={index}>{slide}</SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default SlideShow;
