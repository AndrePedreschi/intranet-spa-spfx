import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1 {
    color: #323232;
    font-size: 1.25rem;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
  }
  p {
    color: #323232;
    font-size: 1rem;
    font-family: "Roboto", sans-serif;
  }
  hr {
    border-top: 1px solid #eeeeee;
  }
`;

export const LoadingContainer = styled.div<{ $addHeight?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ $addHeight }) => {
    if ($addHeight) {
      return css`
        min-height: 80vh;
        @media (max-width: 768px) {
          min-height: 85vh;
        }
      `;
    }
  }}
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CommentSection = styled.section`
  border: 1px solid #eeeeee;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  -webkit-box-shadow: 0px 12px 48px 0px rgba(233, 233, 233, 1);
  -moz-box-shadow: 0px 12px 48px 0px rgba(233, 233, 233, 1);
  box-shadow: 0px 12px 48px 0px rgba(233, 233, 233, 1);
`;

export const Comment = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SubCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
export const SubCommentSection = styled.section`
  border-top: 1px solid #eeeeee;
  padding: 1rem 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @keyframes subCommentAppear {
    from {
      opacity: 0;
      transform: translate(-100px);
    }
    to {
      opacity: 1;
      transform: translate(0px);
    }
  }

  animation: subCommentAppear linear;
  animation-timeline: view();
  animation-range: entry 0%;
`;

export const NewsImg = styled.img`
  height: auto;
  width: 100%;
  object-fit: contain;
  border-radius: 12px;
`;
