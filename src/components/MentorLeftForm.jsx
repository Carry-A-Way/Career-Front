import React from "react";
import { GridLeftCol } from "../styles/common/Layout";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faTicket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import PointBox from "./Box/PointBox";
import MoveBox from "./Box/MoveBox";
import { getUsernameFromToken } from "../auth/jwtFunctions";
import { getCookie } from "../cookie";

const MentorLeftForm = () => {
  const userName = getUsernameFromToken(getCookie("jwtToken"));

  return (
    <GridLeftCol>
      <NameContainer>
        <span>{userName}</span>님 반갑습니다!
      </NameContainer>
      <PointBox point="10,000" />
      <MoveBox>
        <div>
          <FontAwesomeIcon icon={faUser} />
          <span>친구 초대하기</span>
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

export default MentorLeftForm;

const NameContainer = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  width: 22rem;
  span {
    font-size: 2rem;
    font-weight: 600;
    color: #334b6c;
    padding-right: 1rem;
  }
`;
