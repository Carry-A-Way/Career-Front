import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ConsultWageModal from "../Modal/ConsultWageModal";
import { useEffect, useState } from "react";
const WageBox = ({ target, wage }) => {
  const isMentor = useSelector((state) => state.isMentor);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isModalOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isModalOpen]);

  return (
    <StyledWrapper>
      <main>
        <p>{target ? `${target.name} 멘토의 상담 가격` : "내 상담 가격"}</p>
        {wage !== -1 ? (
          <span>
            {wage ? `30분당 ${wage.toLocaleString()} 원` : "가격 미설정"}
          </span>
        ) : (
          <span>가격 미설정</span>
        )}
      </main>
      {isMentor && (
        <footer>
          <span onClick={() => setIsModalOpen(true)}>상담 가격 설정하기</span>
          <FontAwesomeIcon icon={faAngleRight} style={{ cursor: "pointer" }} />
        </footer>
      )}
      {isMentor && isModalOpen && (
        <ConsultWageModal setIsModalOpen={setIsModalOpen} />
      )}
    </StyledWrapper>
  );
};

export default WageBox;

const StyledWrapper = styled.div`
  width: 100%;
  border: 1px solid #c7c5c5;
  border-radius: 10px;
  background-color: #fcfcfc;
  padding: 3rem 2rem 2rem 3rem;
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
