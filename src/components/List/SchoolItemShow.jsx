import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const SchoolItemShow = ({ item }) => {
  return (
    <>
      <InputForm>
        <StyledText>{item.schoolType}</StyledText>
        <StyledText>{item.schoolName}</StyledText>
        <StyledText>
          {item.startDate.slice(0, 4)}-{item.startDate.slice(4, 6)}
        </StyledText>
        <div style={{ display: "flex", alignItems: "center" }}>~</div>
        <StyledText>
          {item.endDate.slice(0, 4)}-{item.endDate.slice(4, 6)}
        </StyledText>
        <StyledText>{item.state}</StyledText>
      </InputForm>
      {item.schoolType === "대학교" && (
        <MajorWrapper>
          <FontAwesomeIcon icon={faArrowRight} />
          <div>전공 : </div>
          <MajorName>{item.majorName}</MajorName>
        </MajorWrapper>
      )}
    </>
  );
};

export default SchoolItemShow;

const InputForm = styled.div`
  display: flex;
  min-width: 25rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
  height: 3.1rem;
`;

const StyledText = styled.div`
  width: 9rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: #fafafa;
`;

const MajorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const MajorName = styled(StyledText)`
  width: 20rem;
  height: 2.5rem;
`;
