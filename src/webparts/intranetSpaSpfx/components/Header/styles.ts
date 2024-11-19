import styled from "styled-components";

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 7vh;
  padding: 0 13.416666666666666vh;
  background-color: white;
  box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, 0.25);
`;
export const Logo = styled.img`
  width: 14vh;
  height: 4.916666666666667vh;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 3.333333333333333vh;
`;

export const Link = styled.a<{ isActive?: boolean }>`
  position: relative;
  color: #000000;
  text-decoration: none;
  font-size: 2vh;
  transition: color 0.3s;

  &:hover {
    color: #fe202d;
  }

  &::after {
    content: "";
    position: absolute;
    display: block;
    width: ${(props) => (props.isActive ? "100%" : "0")};
    height: 2px;
    background-color: #fe202d;
    bottom: -5px;
    left: 0;
  }
`;
