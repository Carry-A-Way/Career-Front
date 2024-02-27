import React from "react";
import { GridLeftCol } from "../styles/common/Layout";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCalendar,
  faTicket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import PointBox from "./Box/PointBox";
import MoveBox from "./Box/MoveBox";
import { getUsernameFromToken } from "../auth/jwtFunctions";
import { getCookie } from "../cookie";

const MenteeLeftForm = () => {
  const userName = getUsernameFromToken(getCookie("jwtToken"));

  return (
    <GridLeftCol style={{ width: "30rem" }}>
      <NameContainer>
        <span>{userName}</span>님 반갑습니다!
      </NameContainer>
      <StyledWrapper>
        <PointBox point="10,000" />
      </StyledWrapper>
      <MoveBox>
        <div>
          <FontAwesomeIcon icon={faUser} />
          <span>친구 초대하기</span>
        </div>
        <FontAwesomeIcon icon={faAngleRight} />
      </MoveBox>
      <MoveBox>
        <div>
          <FontAwesomeIcon icon={faCalendar} />
          <span>상담 예약하기</span>
        </div>
        <FontAwesomeIcon icon={faAngleRight} />
      </MoveBox>
      <MoveBox>
        <div>
          <FontAwesomeIcon icon={faTicket} />
          <span>이용권 구매하기</span>
        </div>
        <FontAwesomeIcon icon={faAngleRight} />
      </MoveBox>
    </GridLeftCol>
  );
};

export default MenteeLeftForm;

const StyledWrapper = styled.div`
  width: 100%;
  margin: 1rem 0 2rem 0;
`;
const NameContainer = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  width: 100%;
  max-width: 25rem;
  span {
    font-size: 2rem;
    font-weight: 600;
    color: #334b6c;
    padding-right: 1rem;
  }
`;
