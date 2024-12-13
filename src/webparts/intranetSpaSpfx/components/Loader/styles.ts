import styled, { keyframes } from "styled-components";

const jump = keyframes`
  0% {
    opacity: 0.2;
    transform: translateY(0px);
  }
  33% {
    opacity: 0.6;
    transform: translateY(-9px);
  }
  66% {
    opacity: 0.2;
    transform: translateY(0px);
  }
  `;

export const Dots = styled.div`
  display: flex;
  gap: 0.25rem;

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fe202d;
    opacity: 0.2;
    animation: ${jump} 0.6s var(--delay) linear infinite;
  }
  .dot:nth-child(1) {
    --delay: 0ms;
  }
  .dot:nth-child(2) {
    --delay: 100ms;
  }
  .dot:nth-child(3) {
    --delay: 200ms;
  }
`;
