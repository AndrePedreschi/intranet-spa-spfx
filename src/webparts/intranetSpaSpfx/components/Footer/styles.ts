import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 13vh;
  padding: 0 13.416666666666666vh;
  background-color: #c02c2e;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.25);
`;
export const Logo = styled.img`
  width: 14vh;
  height: 4.916666666666667vh;
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 3.333333333333333vh;
`;

export const Link = styled.a<{ isActive?: boolean }>`
  position: relative;
  color: #ffffff;
  text-decoration: none;
  font-size: 2vh;
  transition: color 0.3s;

  &:hover {
    color: #000000;
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
`;

export const RightsReserved = styled.h1`
  font-size: 2vh;
  font-weight: 400;
  color: #ffffff;
`;
