import { useState } from "react";
import { ModalWrapper } from "../../styles/common/ModalComponent";
import styled from "styled-components";
import Input from "../Input/Input";
import { colors } from "../../styles/common/Theme";
import CloseButton from "../Button/CloseButton";

const ConsultWageModal = ({ setIsModalOpen, myWage }) => {
  const [wage, setWage] = useState(7000);
  return (
    <ModalWrapper
      onClick={() => {
        setIsModalOpen(false);
      }}
    >
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setIsModalOpen(false)} />
        <header>가격 설정</header>
        <main>
          <span>30분당</span>
          <Input
            value={wage}
            onChange={(e) => setWage(e.target.value)}
            placeholder="상담 가격을 입력해 주세요."
          />
          <span>P</span>
        </main>
        <footer>
          <div className="info-wrapper">
            <p>* 상담 수수료 : 상담가의 3.85%</p>
            <p>* 1P = 1원</p>
          </div>
          <div className="setting__button">확인</div>
        </footer>
      </StyledModal>
    </ModalWrapper>
  );
};

export default ConsultWageModal;

const StyledModal = styled.div`
  position: relative;
  background-color: white;
  min-width: 30rem;
  padding: 3rem 4rem;
  border-radius: 1rem;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  > header {
    font-size: 1.7rem;
    font-weight: 600;
  }
  > main {
    font-size: 1.4rem;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  > footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .setting__button {
      font-size: 1.2rem;
      font-weight: 600;
      cursor: pointer;
      padding: 0.8rem 1rem;
      box-sizing: border-box;
      border-radius: 0.5rem;
      background-color: ${colors.primaryBlue};
      color: white;
    }
  }
`;
