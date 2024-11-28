import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Back = styled.div`
  width: 100%;
`;

export const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-column-gap: 1.25rem;
`;
