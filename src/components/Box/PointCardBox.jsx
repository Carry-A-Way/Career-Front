import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";

const PointCardBox = ({ point }) => {
  return (
    <StyledContainer
      style={{
        backgroundColor: point ? `${colors.secondaryBlue}` : `${colors.gray}`,
      }}
    >
      <PointContent>
        <header>CARRY-A-WAY</header>
        <main>
          <p>내 포인트 잔액</p>
          {point ? (
            <p id="point">{point.toLocaleString()}P</p>
          ) : (
            <p style={{ fontSize: "1.7rem", color: `${colors.darkGray}` }}>
              잔액 부족
            </p>
          )}
        </main>
      </PointContent>
      <CardChipWrapper>
        <img src="/cardchip.png" alt="cardchip" />
        <p>* 1P = 1원</p>
      </CardChipWrapper>
    </StyledContainer>
  );
};

export default PointCardBox;

const StyledContainer = styled.div`
  width: 22rem;
  height: 14rem;
  color: white;
  display: flex;
  padding: 2rem;
  box-sizing: border-box;
  justify-content: space-between;
  border-radius: 0.5rem;
  box-shadow: 5px 5px 10px gray;
`;

const PointContent = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 500;
  > main {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    #point {
      color: ${colors.yellow};
      font-size: 1.7rem;
      font-weight: bold;
    }
  }
`;

const CardChipWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: 600;
  > img {
    width: 4rem;
    height: 4rem;
  }
`;
