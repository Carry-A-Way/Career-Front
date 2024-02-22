import React from "react";
import styled from "styled-components";
import { MentorCardGrid } from "../../styles/common/mentee/MentorCard";
import { MenteeHeader } from "../../styles/common/mentee/MenteeForm";
import MentorCard from "../../components/List/MentorCard";
import { TotalPopularMentors } from "../../settings/config";

const LikeMentor = () => {
  return (
    <StyledLayout>
      <MenteeHeader>내가 찜한 멘토</MenteeHeader>
      <MentorCardGrid>
        {TotalPopularMentors.map((item, idx) => (
          <MentorCard key={idx} mentor={item} />
        ))}
      </MentorCardGrid>
    </StyledLayout>
  );
};

export default LikeMentor;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;
