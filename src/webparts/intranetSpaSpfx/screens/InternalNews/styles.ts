import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  @media (max-width: 768px) {
    padding: 1rem;
  }
  @media (max-width: 540px) {
    padding: 0.5rem;
  }
`;

export const Back = styled.div`
  width: 100%;
`;

export const Section = styled.section`
  max-width: 90rem;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-column-gap: 1.25rem;
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
