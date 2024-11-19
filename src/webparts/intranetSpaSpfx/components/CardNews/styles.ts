import styled from "styled-components";

export const NewsContainer = styled.div`
  display: grid;
  grid-template-columns: 49% 49%;
  max-width: 100%;
  margin: 20px auto;
  gap: 2%;
`;

export const MainNews = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 6px 6px 0 0;
  }

  h2 {
    margin: 10px 0;
    text-align: center;
  }

  p {
    color: #555;
    text-align: center;
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
  grid-template-columns: 50% 50%;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;

  img {
    width: 100%;
    height: 232px;
    object-fit: cover;
    border-radius: 6px 0 0 6px;
  }
  div {
    display: flex;
    flex-direction: column;
  }
  h3 {
    margin: 10px 0 5px;
    text-align: center;
  }

  p {
    color: #777;
    font-size: 14px;
    text-align: center;
  }
`;
