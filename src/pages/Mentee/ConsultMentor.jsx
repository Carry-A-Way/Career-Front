import React from "react";
import styled from "styled-components";
import { TotalPopularMentors } from "../../settings/config";
import { MentorDetailCardGrid } from "../../styles/common/mentee/MentorCard";
import { MenteeHeader } from "../../styles/common/mentee/MenteeForm";
import MentorDetailCard from "../../components/List/MentorDetailCard";

const ConsultMentor = () => {
  return (
    <StyledLayout>
      <MenteeHeader>상담 예정 멘토</MenteeHeader>
      <MentorDetailCardGrid>
        {TotalPopularMentors.map((item, idx) => (
          <MentorDetailCard key={idx} mentor={item} consult={true} />
        ))}
      </MentorDetailCardGrid>
    </StyledLayout>
  );
};

export default ConsultMentor;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;
