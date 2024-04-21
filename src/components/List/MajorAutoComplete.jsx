import React from "react";
import styled from "styled-components";
import { yScrollStyle } from "../../styles/common/Scroll";

const MajorAutoComplete = (props) => {
  const { keywordData, inputWidth, inputHeight, inputValue, setInputValue } =
    props;
  return (
    <StyledContainer top={inputHeight} width={inputWidth}>
      {keywordData.map((keywordItem, idx) => (
        <li
          key={idx}
          onClick={() => {
            setInputValue(keywordItem);
          }}
          style={{
            display: inputValue && inputValue === keywordItem ? "none" : "",
          }}
        >
          {keywordItem}
        </li>
      ))}
    </StyledContainer>
  );
};

export default MajorAutoComplete;

const StyledContainer = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${(prop) => prop.top};
  width: ${(prop) => prop.width};
  background-color: #f8f8f8df;
  z-index: 99;
  font-size: 1.1rem;
  max-height: 20rem;
  overflow-y: auto;
  box-sizing: border-box;
  border: 1px solid #b9b9b9df;
  ${yScrollStyle}
  > li {
    padding: 0.7rem;
    cursor: pointer;
    border: 1px solid #b9b9b9df;
    border-top: none;
    &:last-child {
      border-bottom: none;
    }
    &:hover {
      background-color: #d8d8d8df;
    }
  }
`;
