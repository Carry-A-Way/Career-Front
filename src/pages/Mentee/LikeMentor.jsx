import React from "react";
import styled from "styled-components";
import { MentorCardGrid } from "../../styles/common/mentee/MentorCard";
import { MenteeHeader } from "../../styles/common/mentee/MenteeForm";
import MentorCard from "../../components/List/MentorCard";
import { useQuery } from "react-query";
import { fetchHeartMentorList } from "../../api/heartMentor";

const LikeMentor = () => {
  const {
    data: heartMentorList,
    isLoading,
    refetch,
  } = useQuery("heart-mentor", () => fetchHeartMentorList(), {
    refetchOnWindowFocus: false,
  });
  return (
    <StyledLayout>
      <MenteeHeader>내가 찜한 멘토</MenteeHeader>
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <MentorCardGrid>
          {heartMentorList.map((item, idx) => (
            <MentorCard key={idx} mentor={item} refetch={refetch} />
          ))}
        </MentorCardGrid>
      )}
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
