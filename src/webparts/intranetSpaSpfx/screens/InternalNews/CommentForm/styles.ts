import styled, { css } from "styled-components";

export const Container = styled.div<{ $formType: string }>`
  ${({ $formType }) =>
    $formType === "Comment"
      ? css`
          padding: 1rem 0 1rem 1rem;
          border-radius: 16px;
          border: 1px solid #eeeeee;
          -webkit-box-shadow: 0px 12px 48px 0px rgba(233, 233, 233, 1);
          -moz-box-shadow: 0px 12px 48px 0px rgba(233, 233, 233, 1);
          box-shadow: 0px 12px 48px 0px rgba(233, 233, 233, 1);
        `
      : css`
          padding: 0 0 1rem 1rem;
        `}
  display: flex;
  gap: 1rem;
`;

export const UserSection = styled.div`
  width: 2.5rem;
  height: 2.5rem;
`;

export const UserImg = styled.div<{ $url: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-image: url(${({ $url }) => $url});
  background-repeat: no-repeat;
  background-size: contain;
`;

export const Form = styled.form`
  width: 100%;
`;

export const ActionSection = styled.section`
  display: flex;
  align-items: center;

  button {
    position: relative;
    left: -28px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

export const InputsSection = styled.section`
  width: 100%;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    input {
      padding: 1rem;
      width: 100%;
      height: 2.5rem;
      border-radius: 8px;
      border: 1px solid #eeeeee;
      background-color: #f5f5f5;
      color: #98a1b0;
      font: 14px;
      font-family: "Roboto" sans-serif;
    }
  }
`;

export const ErrorContainer = styled.div`
  height: 14px;

  p {
    font-weight: 700;
    color: #ff786f;
    font-size: 12px;
    font-style: italic;
  }
`;
