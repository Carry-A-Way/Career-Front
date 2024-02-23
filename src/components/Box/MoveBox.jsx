import React from "react";
import styled from "styled-components";

const MoveBox = ({ children }) => {
  return <MoveWrapper>{children}</MoveWrapper>;
};

export default MoveBox;

const MoveWrapper = styled.div`
  width: 22rem;
  height: 2.5rem;
  border: 1px solid #c7c5c5;
  border-radius: 10px;
  background-color: #fcfcfc;
  font-size: 1.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  span {
    margin-left: 1rem;
  }
`;
