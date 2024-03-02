import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";

const Wage = ({ wage }) => {
  if (!wage || wage === -1)
    return <StyledContainer>가격 미설정</StyledContainer>;
  return (
    <StyledContainer style={{ color: "yellow", fontWeight: 600 }}>
      30분당 {wage.toLocaleString()}P
    </StyledContainer>
  );
};

export default Wage;

const StyledContainer = styled.p`
  background-color: ${colors.primaryBlue};
  color: white;
  padding: 0.5rem;
  box-sizing: border-box;
  width: 13rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
`;
