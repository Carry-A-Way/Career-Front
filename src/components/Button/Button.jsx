import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";

export const ButtonDiv = ({
  children,
  size,
  weight,
  onClick,
  height,
  disabled,
  style,
}) => {
  return (
    <StyledButtonDiv
      className={
        disabled ? ` ${size} ${weight} disabled-btn` : ` ${size} ${weight}`
      }
      height={height}
      onClick={disabled ? () => {} : onClick}
      style={style}
    >
      {children}
    </StyledButtonDiv>
  );
};

export const Button = ({
  children,
  size,
  weight,
  onClick,
  height,
  disabled,
}) => {
  return (
    <StyledButton
      className={
        disabled ? ` ${size} ${weight} disabled-btn` : ` ${size} ${weight}`
      }
      height={height}
      onClick={disabled ? () => {} : onClick}
    >
      {children}
    </StyledButton>
  );
};

ButtonDiv.defaultProps = {
  size: "",
  weight: "regular",
};

Button.defaultProps = {
  size: "",
  weight: "regular",
};

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primaryBlue};
  border-radius: 5px;
  color: white;
  border: 1px solid #2f5383;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem 2rem;
  box-sizing: border-box;
  cursor: pointer;
  height: ${(props) => (props.height ? `${props.height}` : "100%")};
  &.medium {
    width: 10rem;
  }
  &.large {
    width: 20rem;
  }
  &.disabled-btn {
    background-color: #ababab;
    border: none;
    cursor: not-allowed;
  }
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primaryBlue};
  border-radius: 5px;
  color: white;
  border: 1px solid #2f5383;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem 2rem;
  box-sizing: border-box;
  cursor: pointer;
  height: ${(props) => (props.height ? `${props.height}` : "100%")};
  &.medium {
    width: 10rem;
  }
  &.large {
    width: 20rem;
  }
  &.disabled-btn {
    background-color: #ababab;
    border: none;
    cursor: not-allowed;
  }
`;
