import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PointModal from "../Modal/PointModal";
const PointBox = ({ point, style }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <StyledContainer style={style}>
      <main>
        <p>내 포인트 잔액</p>
        <span>{point.toLocaleString() || 0} 원</span>
      </main>
      <footer>
        <span onClick={() => setIsModalOpen(true)}>포인트 충전하기</span>
        <FontAwesomeIcon icon={faAngleRight} style={{ cursor: "pointer" }} />
      </footer>
      {isModalOpen && <PointModal setIsModalOpen={setIsModalOpen} />}
    </StyledContainer>
  );
};

export default PointBox;

const StyledContainer = styled.div`
  width: 100%;
  border: 1px solid #c7c5c5;
  border-radius: 10px;
  background-color: #fcfcfc;
  padding: 3rem 2rem 2rem 3rem;
  /* margin-bottom: 50px; */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  > main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1.5rem;
    font-weight: 500;
    span {
      font-size: 1.7rem;
      font-weight: 600;
      padding-right: 1rem;
    }
  }
  footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1rem;
    span {
      padding-right: 1rem;
      cursor: pointer;
    }
  }
`;
