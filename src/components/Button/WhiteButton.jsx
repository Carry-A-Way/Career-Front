import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";

export const WhiteButton = (props) => {
  const { onClick, text, disabled } = props;
  return (
    <StyledButton onClick={onClick} className={disabled ? `disabled-btn` : ``}>
      {text}
    </StyledButton>
  );
};

const StyledButton = styled.div`
  border: 1px solid ${colors.primaryBlue};
  padding: 0.7rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.color === "#D9D9D9" ? "#9D9D9D" : "" || `${colors.primaryBlue}`};
    color: white;
  }
  &.disabled-btn {
    background-color: #ababab;
    border: none;
    cursor: not-allowed;
  }
`;
