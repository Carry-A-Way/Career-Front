import React from "react";
import { GridLeftCol } from "../styles/common/Layout";
import styled from "styled-components";
import PointBox from "./Box/PointBox";
import { getNicknameFromToken } from "../auth/jwtFunctions";
import { getCookie } from "../cookie";
import WageBox from "./Wage/WageBox";
import { useQuery } from "react-query";
import { fetchMentorPoint } from "../api/point";

const MentorLeftForm = () => {
  const userName = getNicknameFromToken(getCookie("jwtToken"));
  const { data: point } = useQuery(
    ["mentor", "point"],
    () => fetchMentorPoint(),
    {
      refetchOnWindowFocus: false,
    }
  );
  return (
    <GridLeftCol>
      <NameContainer>
        <span>{userName}</span>님 반갑습니다!
      </NameContainer>
      <PointBox point={point} />
      <WageBox target={null} />
      {/* <MoveBox>
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
      </MoveBox> */}
    </GridLeftCol>
  );
};

export default MentorLeftForm;

const NameContainer = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  /* width: 22rem; */
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
  span {
    font-size: 2rem;
    font-weight: 600;
    color: #334b6c;
    padding-right: 1rem;
  }
`;
