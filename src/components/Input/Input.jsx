import React from "react";
import styled from "styled-components";
function Input({
  size,
  placeholder,
  type,
  height,
  width,
  onChange,
  onFocus,
  onBlur,
  value,
  disabled,
  required,
}) {
  return (
    <StyledInput
      className={size}
      placeholder={placeholder}
      type={type}
      height={height}
      width={width}
      value={value || ""}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={() => {
        setTimeout(onBlur, 150);
      }}
      required={required}
      disabled={disabled}
    />
  );
}

Input.defaultProps = {
  size: "medium",
  placeholder: "입력해 주세요.",
  type: "text",
};

export default Input;

const StyledInput = styled.input`
  text-align: center;
  font-size: 1.1rem;
  border-radius: 2px;
  border: ${(props) =>
    props.disabled === true ? "1px solid #b7b7b7" : " 1px solid gray"};
  color: ${(props) => (props.disabled === true ? "gray" : "black")};
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
