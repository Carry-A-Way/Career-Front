import React from "react";
import { ModalWrapper } from "../../styles/common/ModalComponent";
import styled from "styled-components";
import { getNicknameFromToken } from "../../auth/jwtFunctions";
import { getCookie } from "../../cookie";
import { colors } from "../../styles/common/Theme";
import PointCardBox from "../Box/PointCardBox";
import CloseButton from "../Button/CloseButton";
import { ButtonDiv } from "../Button/Button";
import { useState } from "react";
import Input from "../Input/Input";

const PointModal = ({ setIsModalOpen, point }) => {
  const [bank, setBank] = useState("카카오뱅크");
  const [accountNumber, setAccountNumber] = useState("");
  return (
    <ModalWrapper
      onClick={() => {
        setIsModalOpen(false);
      }}
    >
      <StyledModal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setIsModalOpen(false)} />
        <section>
          <p>
            <span
              style={{ color: `${colors.secondaryBlue}`, fontWeight: "bold" }}
            >
              {getNicknameFromToken(getCookie("jwtToken"))}
            </span>{" "}
            님의 포인트는 아래와 같습니다.
          </p>
        </section>
        <PointCardBox point={point} />
        <section>
          <p>
            <span
              style={{ color: `${colors.secondaryBlue}`, fontWeight: "bold" }}
            >
              10초
            </span>
            만에 포인트 충전하고 상담받아보세요!
          </p>
          <ButtonDiv style={{ backgroundColor: colors.secondaryBlue }}>
            포인트 충전하기
          </ButtonDiv>
        </section>
        <section>
          <p>포인트를 환급받고 싶으신가요?</p>
          <RefundPoint>
            <span>환급받을 계좌</span>
            <select
              name="bank"
              onChange={(e) => setBank(e.target.value)}
              value={bank}
            >
              <option name="bank" value="카카오뱅크">
                카카오뱅크
              </option>
              <option name="bank" value="하나">
                하나
              </option>
              <option name="bank" value="우리">
                우리
              </option>
            </select>
            <Input
              height="2.5rem"
              placeholder={"계좌번호를 입력해 주세요."}
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value);
              }}
            />
            <ButtonDiv
              height="2.5rem"
              style={{ backgroundColor: colors.secondaryBlue }}
            >
              포인트 환급신청
            </ButtonDiv>
          </RefundPoint>
        </section>
      </StyledModal>
    </ModalWrapper>
  );
};

export default PointModal;

const StyledModal = styled.div`
  position: relative;
  background-color: white;
  min-width: 40rem;
  padding: 4rem;
  border-radius: 1rem;
  color: black;
  > section {
    > p {
      font-size: 1.5rem;
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const RefundPoint = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.3rem;
  align-items: center;
  > select {
    height: 2.5rem;
    padding: 0 1rem;
  }
`;
