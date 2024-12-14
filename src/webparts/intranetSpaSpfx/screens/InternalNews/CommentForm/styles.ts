import styled, { css } from "styled-components";

export const Container = styled.div<{ $formType: string }>`
  ${({ $formType }) => {
    if ($formType === "Comment") {
      return css`
        padding: 1rem 0 1rem 1rem;
        border-radius: 16px;
        border: 1px solid #eeeeee;
        -webkit-box-shadow: 0px 12px 48px 0px rgba(233, 233, 233, 1);
        -moz-box-shadow: 0px 12px 48px 0px rgba(233, 233, 233, 1);
        box-shadow: 0px 12px 48px 0px rgba(233, 233, 233, 1);
      `;
    } else if ($formType === "SubComment") {
      return css`
        padding: 0 0 1rem 1rem;
      `;
    } else {
      return css`
        padding: 0;
      `;
    }
  }}
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

export const InputSection = styled.section`
  display: flex;
  align-items: center;

  button {
    position: relative;
    top: 2px;
    left: -28px;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

export const FormElementSection = styled.section`
  width: 100%;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    input {
      padding: 1rem 2.25rem 1rem 1rem;
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

export const NotificationSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
`;

export const ErrorContainer = styled.div`
  height: 14px;
  width: 125px;
  p {
    font-weight: 700;
    color: #ff786f;
    font-size: 12px;
    font-style: italic;
  }
`;
