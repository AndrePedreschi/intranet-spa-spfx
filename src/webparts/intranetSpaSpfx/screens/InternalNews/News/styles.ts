import styled from "styled-components";

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
export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  @media (max-width: 768px) {
    min-height: 85vh;
  }
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

export const UserSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

export const UserImg = styled.div<{ $url: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-image: url(${({ $url }) => $url});
  background-repeat: no-repeat;
  background-size: contain;
`;

export const NewsImg = styled.img`
  height: auto;
  width: 100%;
  object-fit: contain;
  border-radius: 12px;
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
