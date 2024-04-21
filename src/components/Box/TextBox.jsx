import React from "react";
import styled from "styled-components";

const TextBox = (props) => {
  const { size, height, width, value } = props;
  return (
    <StyledDiv
      className={size}
      height={height}
      width={width}
      value={value || ""}
    />
  );
};

export default TextBox;

const StyledDiv = styled.div`
  text-align: center;
  font-size: 1.1rem;
  border-radius: 2px;
  border: 1px solid gray;
  color: black;
  box-sizing: border-box;
  padding: 0; //나중에 reset.scss or reset.css 로 만들기
  height: ${(props) => props.height || "3rem"};
  &.small {
    width: ${(props) => props.width || "6.25rem"};
  }
  &.medium {
    width: ${(props) => props.width || "20rem"};
  }
  &.large {
    width: ${(props) => props.width || "35rem"};
  }
`;
