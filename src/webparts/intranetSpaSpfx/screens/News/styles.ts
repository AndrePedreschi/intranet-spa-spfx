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
