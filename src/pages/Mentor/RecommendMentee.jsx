import React from "react";
import { RecommendWrapper } from "../../styles/common/mentor/MentorForm";
import RecommendMenteeItem from "../../components/List/RecommendMenteeItem";
import { RecommendMenteeList } from "../../settings/config";

const RecommendMentee = ({ longHeight }) => {
  return (
    <RecommendWrapper className={longHeight ? "recommend-wrapper__long" : ""}>
      <RecommendMenteeItem recommendList={RecommendMenteeList} />
    </RecommendWrapper>
  );
};

export default RecommendMentee;
