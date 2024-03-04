import React from "react";
import styled from "styled-components";

const ColorInfo = ({ color, children }) => {
  return (
    <ColorInfoContainer>
      <div className="color__circle" style={{ backgroundColor: color }}></div>
      <p className="color__text">{children}</p>
    </ColorInfoContainer>
  );
};

export default ColorInfo;

const ColorInfoContainer = styled.div`
  display: flex;
  gap: 1rem;
  .color__circle {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
`;
