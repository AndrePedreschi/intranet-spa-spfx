import styled from "styled-components";

export const ContainerNews = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;
  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 3rem;
  }
`;

export const CardNews = styled.div`
  max-width: 350px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  border: 1px solid #eeeeee;
  border-radius: 0.5rem;
  gap: 1rem;
  @media (max-width: 767px) {
    max-width: 90%;
    margin: auto;
    max-height: inherit;
  }
`;

export const Banner = styled.img`
  width: 100%;
  max-width: 350px;
  height: 150px;
  max-height: 150px;
  background-size: cover;
  border-radius: 0.5rem 0.5rem 0 0;
  @media (max-width: 767px) {
    max-width: 100%;
    max-height: 250px;
  }
`;

export const TitleNews = styled.h1`
  font-size: 1rem;
  padding: 0 0.5rem;
  line-height: auto;
  color: #323232;
`;

export const Typography = styled.p`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  padding: 0 0.5rem;
  color: #6f6f6f;
  line-height: 1rem;
  > div {
    display: flex;
    gap: 0.5rem;
  }
`;

export const TypographyText = styled.p`
  font-size: 0.75rem;
  padding: 0 0.5rem;
  color: #6f6f6f;
  line-height: 1rem;
`;

export const ReturnLink = styled.div`
  padding: 0 1rem;
`;

export const ButtonBack = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  color: #323232;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
`;

export const DoubleArrow = styled.img`
  width: 24px;
  height: 24px;
`;

export const IconHeart = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
