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
  @media (max-width: 767px) {
    max-width: 100%;
    max-height: 250px;
  }
`;

export const TitleNews = styled.h1`
  font-size: 1rem;
  line-height: auto;
  color: #323232;
`;

export const Typography = styled.p`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #6f6f6f;
  line-height: 1rem;
  > div {
    margin-right: 0.5rem;
  }
`;

export const TypographyText = styled.p`
  font-size: 0.75rem;
  color: #6f6f6f;
  line-height: 1rem;
`;

export const ReturnLink = styled.a`
  font-size: 1rem;
  padding: 0 1rem;
  color: #323232;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
`;
