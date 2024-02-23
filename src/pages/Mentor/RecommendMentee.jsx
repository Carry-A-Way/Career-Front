import React from "react";
import {
  RecommendWrapper,
  SectionHeader,
} from "../../styles/common/mentor/MentorForm";
import RecommendMenteeItem from "../../components/List/RecommendMenteeItem";
import { RecommendMenteeList } from "../../settings/config";

const RecommendMentee = () => {
  return (
    <>
      <SectionHeader>추천 학생</SectionHeader>
      <RecommendWrapper className="recommend-wrapper__long">
        <RecommendMenteeItem recommendList={RecommendMenteeList} />
      </RecommendWrapper>
    </>
  );
};

export default RecommendMentee;
