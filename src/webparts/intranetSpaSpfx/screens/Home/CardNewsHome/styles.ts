import styled from "styled-components";

export const NewsContainer = styled.div`
  display: grid;
  grid-template-columns: 49% 49%;
  max-width: 100%;
  margin: 20px auto;
  gap: 2%;

  @media (max-width: 834px) {
    grid-template-columns: 100%;
  }
`;

export const MainNews = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  align-items: flex-start;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 6px 6px 0 0;
  }

  h2 {
    margin: 10px 0;
    text-align: left;
    font-size: 1.125rem;
    color: #323232;
  }

  p {
    color: #6f6f6f;
    font-size: 0.938rem;
    text-align: left;
  }
  .main-news-content {
    width: 100%;
    padding: 2rem;
  }
`;

export const OtherNews = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NewsItem = styled.div`
  display: grid;
  grid-template-columns: 50% 45%;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  gap: 2rem;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 6px 0 0 6px;
  }
  col {
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin: 10px 0 5px;
    font-size: 1.125rem;
    text-align: left;
    color: #323232;
  }

  p {
    color: #6f6f6f;
    font-size: 0.938rem;
    text-align: left;
  }
`;
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  div {
    flex: 1;
    padding: 20px 0;
    align-items: center;
    justify-content: flex-end;

    p:first-child {
      font-weight: bold;
      margin: 0;
      color: #323232;
      font-size: 0.875rem;
    }

    p:last-child {
      font-size: 0.75rem;
      color: #6f6f6f;
      margin: 0;
    }
  }
`;

export const Stats = styled.div`
  display: block;

  span {
    font-size: 12px;
    color: #555;
  }
`;
