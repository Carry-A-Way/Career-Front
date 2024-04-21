import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";

const BottomFixButton = (props) => {
  const { backgroundColor, color, children, onClick } = props;
  return (
    <BottomButton
      backgroundColor={backgroundColor}
      color={color}
      onClick={onClick}
    >
      {children}
    </BottomButton>
  );
};

export default BottomFixButton;

const BottomButton = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  background-color: ${(prop) =>
    prop.backgroundColor ? prop.backgroundColor : colors.secondaryBlue};
  color: ${(prop) => (prop.color ? prop.color : "white")};
`;
