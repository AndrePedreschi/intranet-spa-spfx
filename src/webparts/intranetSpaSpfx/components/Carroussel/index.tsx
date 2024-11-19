import { ReactElement } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { BannerContainer } from "./styles";

export const Carrousel = (): ReactElement => {
  return (
    <BannerContainer>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ dynamicBullets: true }}
        loop
        breakpoints={{
          1024: {
            slidesPerView: 1,
          },

          0: {
            slidesPerView: 1,
          },
        }}
      >
        <SwiperSlide>
          <img src="https://via.placeholder.com/800x300" alt="Banner 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://via.placeholder.com/800x300" alt="Banner 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://via.placeholder.com/800x300" alt="Banner 3" />
        </SwiperSlide>
      </Swiper>
    </BannerContainer>
  );
};
