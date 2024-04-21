import React from "react";
import styled from "styled-components";

const MoveBox = ({ children }) => {
  return <MoveWrapper>{children}</MoveWrapper>;
};

export default MoveBox;

const MoveWrapper = styled.div`
  width: 100%;
  /* max-width: 25rem; */
  border: 1px solid #c7c5c5;
  border-radius: 10px;
  background-color: #fcfcfc;
  font-size: 1.3rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: pointer;
  span {
    margin-left: 1rem;
  }
`;
