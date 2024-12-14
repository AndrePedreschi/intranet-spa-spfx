import styled from "styled-components";

export const UserContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const UserSection = styled.section`
  display: flex;
  gap: 1rem;
`;
export const ActionSection = styled.section``;

export const UserImg = styled.div<{ $url: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-image: url(${({ $url }) => $url});
  background-repeat: no-repeat;
  background-size: contain;
`;

export const UserData = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h1 {
    font-size: 0.75rem;
    font-family: "Poppins", sans-serif;
    color: #323232;
    font-weight: 600;
  }
  p {
    font-size: 0.75rem;
    font-family: "Roboto", sans-serif;
    color: #6f6f6f;
  }
`;
