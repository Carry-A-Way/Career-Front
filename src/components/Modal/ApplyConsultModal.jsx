import React, { useState } from "react";
import { ModalWrapper } from "../../styles/common/ModalComponent";
import styled from "styled-components";
import TitleWithBar from "../Input/InputWithTitle";
import Input from "../Input/Input";
import MajorAutoComplete from "../List/MajorAutoComplete";
import { useQuery } from "react-query";
import { fetchMajorAutoComplete } from "../../api/fetchMajorList";
import { ButtonDiv } from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { getIdFromToken } from "../../auth/jwtFunctions";
import { getCookie } from "../../cookie";
import { localToIsoParse } from "../../utils/ParseFormat";
import { applyConsult } from "../../api/applyConsult";

const ApplyConsultModal = (props) => {
  const { setModalClose, startTime, endTime, mentor } = props;
  const titleStyle = {
    marginBottom: 0,
    fontSize: "1.2rem",
    width: "10rem",
  };
  const [consultMajor, setConsultMajor] = useState(""); // 상담 전공
  const [consultFlow, setConsultFlow] = useState(""); // 상담 방식
  const [consultQuestion, setConsultQuestion] = useState(""); // 상담 질문
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { data: keywordData } = useQuery(consultMajor, () =>
    fetchMajorAutoComplete(consultMajor)
  );

  const INPUT_WIDTH = "25rem";
  const INPUT_HEIGHT = "3rem";
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const onApplyConsult = () => {
    const data = {
      mentorId: mentor.id,
      menteeId: getIdFromToken(getCookie("jwtToken")),
      startTime: localToIsoParse(startTime),
      endTime: localToIsoParse(endTime),
      major: consultMajor,
      flow: "#" + consultFlow.replace(", ", ",").split(",").join("#"),
      questions: consultQuestion,
    };
    console.log(data);
    applyConsult(data);
    setModalClose();
  };
  return (
    <ModalWrapper>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <FontAwesomeIcon
          icon={faXmark}
          className="x-icon"
          onClick={setModalClose}
        />
        {!!mentor && <header>{mentor.name} 멘토에게 상담 신청</header>}
        <div className="input-wrapper">
          <TitleWithBar title="상담 시작 시간" style={titleStyle} />
          <div className="time">{startTime}</div>
        </div>
        <div className="input-wrapper">
          <TitleWithBar title="상담 종료 시간" style={titleStyle} />
          <div className="time">{endTime}</div>
        </div>
        <div className="input-wrapper">
          <TitleWithBar title="상담 전공" style={titleStyle} />
          <div className="major-wrapper">
            <Input
              placeholder="상담할 전공을 선택해 주세요."
              value={consultMajor}
              onChange={(e) => setConsultMajor(e.target.value)}
              width={INPUT_WIDTH}
              height={INPUT_HEIGHT}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            {isInputFocused && keywordData && (
              <MajorAutoComplete
                inputValue={consultMajor}
                setInputValue={setConsultMajor}
                keywordData={keywordData}
                inputWidth={INPUT_WIDTH}
                inputHeight={INPUT_HEIGHT}
              />
            )}
          </div>
        </div>
        <div className="input-wrapper">
          <TitleWithBar title="상담 방식" style={titleStyle} />
          <Input
            placeholder="쉼표(,)로 구분하여 주세요. ex) 대면, 직설적"
            width={INPUT_WIDTH}
            height={INPUT_HEIGHT}
            value={consultFlow}
            onChange={(e) => setConsultFlow(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <TitleWithBar title="상담 질문" style={titleStyle} />
          <textarea
            style={{
              width: INPUT_WIDTH,
              height: "10rem",
              resize: "none",
              boxSizing: "border-box",
              padding: "1rem",
              fontSize: "1.1rem",
            }}
            placeholder="엔터로 구분하여 주세요."
            // height="10rem"
            // width={INPUT_WIDTH}
            value={consultQuestion}
            onChange={(e) => setConsultQuestion(e.target.value)}
          />
        </div>
        <div className="button-wrapper">
          <ButtonDiv onClick={onApplyConsult}>상담 신청하기</ButtonDiv>
        </div>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default ApplyConsultModal;

const ModalContainer = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  border-radius: 10px;
  position: relative;
  .x-icon {
    font-size: 1.8rem;
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    cursor: pointer;
  }
  > header {
    font-size: 1.6rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 2rem;
  }
  > .input-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    .time {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
  .major-wrapper {
    position: relative;
  }
  .button-wrapper {
    margin: 0 auto;
    width: 15rem;
    margin-top: 2rem;
  }
`;
