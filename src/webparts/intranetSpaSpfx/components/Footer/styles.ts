import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 13vh;
  padding: 0 5rem;
  background-color: #c02c2e;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.25);
  @media (max-width: 767px) {
    padding: 0 1rem;
    height: 8vh;
  }
`;
export const Logo = styled.img`
  width: 14vh;
  max-width: 144px;
  height: 40px;
  max-height: 40px;
  @media (max-width: 767px) {
    width: 70px;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    position: relative;
    color: #ffffff;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s;

    &:hover {
      color: #000000;
    }
    @media (max-width: 767px) {
      font-size: 0.75rem;
    }
  }

  @media (max-width: 767px) {
    gap: 0.625rem;
  }
`;

export const RightsContainer = styled.div`
  width: 100%;
  height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #000000;
  @media (max-width: 767px) {
    height: 4vh;
  }
`;

export const RightsReserved = styled.h1`
  font-size: 1rem;
  font-weight: 400;
  color: #ffffff;
  @media (max-width: 767px) {
    font-size: 0.75rem;
  }
`;
