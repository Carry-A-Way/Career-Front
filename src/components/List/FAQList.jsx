import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";

const FAQList = ({ FAQ }) => {
  return (
    <StyledContainer>
      {FAQ.map((item, idx) => (
        <FAQWrapper key={idx}>
          <TextBox>
            <span className="mark">Q.</span>
            <p>{item.question}</p>
          </TextBox>
          <TextBox>
            <span className="mark">A.</span>
            <p>{item.answer}</p>
          </TextBox>
        </FAQWrapper>
      ))}
    </StyledContainer>
  );
};

export default FAQList;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-left: 3px solid ${colors.primaryBlue};
  padding-left: 0.5rem;
`;

const TextBox = styled.div`
  width: 25rem;
  height: 3rem;
  padding: 0 2rem;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 1rem;
  border: 1px solid ${colors.secondaryBlue};
  border-radius: 0.5rem;
  .mark {
    font-weight: 700;
  }
`;
