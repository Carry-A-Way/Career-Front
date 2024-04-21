import React from "react";
import styled from "styled-components";

function VerticalLine({ height }) {
  return <Line height={height} />;
}

// VerticalLine.defaultProps = {
//   size: "large",
// };

export default VerticalLine;

const Line = styled.div`
  background-color: #bcbcbc;
  box-sizing: border-box;
  width: 1px;
  height: ${(props) => props.height || "100%"};
`;
