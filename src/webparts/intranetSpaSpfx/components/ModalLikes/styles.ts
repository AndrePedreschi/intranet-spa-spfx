import styled from "styled-components";

export const AllLikesModal = styled.div`
  display: none;
  position: fixed;
  overflow-y: auto;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 20%;
  p {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 2rem;
    line-height: 2rem;
    color: black;
  }
`;

export const Close = styled.button`
  position: relative;
  top: -15px;
  left: calc(100% - 20px);
  border: none;
  background-color: transparent;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
`;

export const ListUsers = styled.ul`
  padding: 0px;
`;

export const List = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  text-align: left;
  list-style: none;
  font-size: 2rem;
  border-bottom: 1px solid #6f6f6f;
  color: #6f6f6f;
`;

export const UserImg = styled.div<{ $url: string }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-image: url(${({ $url }) => $url});
  background-repeat: no-repeat;
  background-size: contain;
`;
