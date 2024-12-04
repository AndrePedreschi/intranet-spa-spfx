import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TextSection = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-family: "Poppins";
    font-size: 1.125rem;
    font-weight: 600;
  }
  a {
    font-family: "Poppins";
    font-size: 0.75rem;
    color: #6f6f6f;
    font-weight: 200;
  }
`;
