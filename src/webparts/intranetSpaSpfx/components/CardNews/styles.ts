import styled from "styled-components";

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
