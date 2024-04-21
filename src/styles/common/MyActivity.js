import styled from "styled-components";
import { colors } from "./Theme";

export const Form = styled.div`
  height: 70%;
  display: flex;
  margin: 60px 0;
  justify-content: center;
  box-sizing: border-box;
`;

export const FormLeft = styled.div`
  min-width: 20rem;
  min-height: 73vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 6rem;
  margin-top: 2rem;
  .menu-list {
    &__item {
      font-size: 1.4rem;
      padding: 0.8rem;
      border-bottom: 1px solid black;
      cursor: pointer;
    }
    &__item-selected,
    &__item:hover {
      background-color: #f4f4f4;
      font-weight: 600;
    }
  }
`;

export const FormRight = styled.div`
  min-width: 50rem;
  max-width: 70rem;
  min-height: 73vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 8rem;
  border-left: 1px solid #bcbcbc;
`;

export const PostWrapper = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 2rem;
  .selected-menu-header {
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
    margin: 1rem 0 2rem;
  }
`;

export const UtilBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: fixed;
  bottom: 2rem;
  right: 3rem;
  .util-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    border: 1px solid black;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    padding: 0.7rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
  .up {
    background-color: ${colors.primaryBlue};
    color: white;
  }
`;
