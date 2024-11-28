import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h1 {
    color: #323232;
    font-size: 1.25rem;
    font-family: "Poppins";
    font-weight: 600;
  }
  p {
    color: #323232;
    font-size: 1rem;
    font-family: "Roboto";
  }
  hr {
    color: #eeeeee;
  }
`;
export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CommentSection = styled.section`
  //border: 1px solid #eeeeee;
  border: 1px solid red;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Comment = styled.div`
  padding: 1rem;
  border-bottom: 1px solid red;
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
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LikesSection = styled.section`
  display: flex;
  gap: 1rem;
`;

export const UserSection = styled.section`
  width: 100%;
  display: flex;
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
    font-family: "Poppins";
    color: #323232;
    font-weight: 600;
  }
  p {
    font-size: 0.75rem;
    //font-family:;
    color: #6f6f6f;
  }
`;
