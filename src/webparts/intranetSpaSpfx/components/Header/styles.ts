import styled from "styled-components";

export const NavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 7vh;
  padding: 0 5rem;
  margin-bottom: 3.125rem;
  background-color: white;
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

export const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  @media (max-width: 767px) {
    gap: 0.625rem;
  }

  a {
    position: relative;
    color: #000000;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s;

    &:hover {
      color: #fe202d;
    }

    @media (max-width: 767px) {
      font-size: 0.75rem;
    }
  }
  .isActive {
    width: 100%;
    border-bottom: 2px solid #fe202d;
  }
`;
