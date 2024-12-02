import styled from "styled-components";

export const BannerContainer = styled.div`
  width: 100%;

  .swiper {
    width: 100%;
    height: 300px;
  }

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper-pagination-bullet {
    background-color: #000000;
    opacity: 0.7;
  }

  .swiper-pagination-bullet-active {
    background-color: #d22730;
    opacity: 1;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .swiper-button-next {
    right: 10px;
  }

  .swiper-button-prev {
    left: 10px;
  }
`;
