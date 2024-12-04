import styled from "styled-components";

export const Container = styled.div`
  margin: 0 auto;
  max-width: 90rem;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    min-height: 85vh;
  }
  @media (max-width: 540px) {
    padding: 0 0.5rem;
  }
`;

export const Back = styled.div`
  width: 100%;
`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-column-gap: 1.25rem;
  padding-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const MostViewedSection = styled.section`
  @media (max-width: 768px) {
    display: none;
  }
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
