import { ReactElement, useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { BannerContainer } from "./styles";
import { getBannersList, TGetBannersList } from "../../services/logo.service";
import { useZustandStore } from "../../store";

export const Carroussel = (): ReactElement => {
  const { context } = useZustandStore();
  const [banners, setBanners] = useState<TGetBannersList[]>([]);

  const getData = useCallback(async () => {
    if (!context) return;

    try {
      const bannersList = await getBannersList(context);
      setBanners(bannersList);
    } catch (error) {
      console.error("Erro ao carregar os banners:", error);
    }
  }, [context]);

  useEffect(() => {
    getData();
  }, [getData]);

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
        {banners &&
          banners.map((banner) => (
            <SwiperSlide key={banner.Name}>
              <img
                style={{ backgroundImage: `url(${banner.ServerRelativeUrl})` }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </BannerContainer>
  );
};
