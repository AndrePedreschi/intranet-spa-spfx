import styled from "styled-components";

export const SpinnerContainer = styled.div`
  @keyframes appear {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  svg {
    path {
      opacity: 0;
      animation: appear 400ms linear infinite;
      &:nth-child(1) {
        animation-delay: 0ms;
      }
      &:nth-child(2) {
        animation-delay: 50ms;
      }
      &:nth-child(3) {
        animation-delay: 100ms;
      }
      &:nth-child(4) {
        animation-delay: 150ms;
      }
      &:nth-child(5) {
        animation-delay: 200ms;
      }
      &:nth-child(6) {
        animation-delay: 250ms;
      }
      &:nth-child(7) {
        animation-delay: 300ms;
      }
      &:nth-child(8) {
        animation-delay: 350ms;
      }
    }
  }
`;
