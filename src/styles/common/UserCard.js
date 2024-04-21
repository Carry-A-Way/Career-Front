import styled from "styled-components";
import { yScrollStyle } from "./Scroll";

export const UserCardLayout = styled.div`
  width: 80rem;
  max-width: 90vw;
  margin: 5rem auto 10rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

export const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  .user-name {
    font-size: 2rem;
    font-weight: 800;
  }
`;

export const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  gap: 1rem;
`;

export const Tag = styled.div`
  height: 2rem;
  border: 1px solid #334b6c;
  border-radius: 13px;
  background-color: #334b6c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  padding: 0.5rem 0.8rem;
`;

export const ProfileImgWrapper = styled.div`
  width: 10rem;
  height: 10rem;
  justify-self: center;
`;

export const TextBox = styled.div`
  width: 50rem;
  min-height: 5rem;
  border: 1px solid gray;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  overflow-y: auto;
  line-height: 1.3;
  ${yScrollStyle}
`;

export const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  > .title {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
`;
