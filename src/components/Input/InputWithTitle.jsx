import React from "react";
import MenuLine from "../Line/MenuLine";
import styled from "styled-components";

const TitleWithBar = ({ size, title, required, style }) => {
  return (
    <StyledWrapper style={style}>
      <MenuLine size={size} />
      <span>{title}</span>
      {required && <Required>*</Required>}
    </StyledWrapper>
  );
};

export default TitleWithBar;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.2rem;
  span {
    margin-left: 1.2rem;
  }
`;

const Required = styled.span`
  color: red;
`;
