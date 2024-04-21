import React, { useState } from "react";
import styled from "styled-components";
import { MenteeHeader } from "../../styles/common/mentee/MenteeForm";
import { colors } from "../../styles/common/Theme";
import TagList from "../../components/List/TagList";
import { fetchMenteeProfile } from "../../api/fetchProfile";
import { useQuery } from "react-query";
import { modifyMenteeTag } from "../../api/modifyProfile";
import { ButtonDiv } from "../../components/Button/Button";

const EnterTag = () => {
  const [tagList, setTagList] = useState([]);
  const { isLoading } = useQuery("tag", fetchMenteeProfile, {
    staleTime: 1000 * 60 * 10,
    onSuccess: (data) => {
      setTagList(!!data.tagList ? [...data.tagList] : []);
    },
  });

  const onInsertTag = () => {
    modifyMenteeTag(tagList);
    window.alert("태그를 등록했습니다.");
  };

  return (
    <StyledLayout>
      <MenteeHeader>태그를 등록하면 나에게 맞는 멘토를 바로 추천!</MenteeHeader>
      <Content>
        <p>등록된 태그를 바탕으로</p>
        <p>
          <span style={{ color: `${colors.secondaryBlue}`, fontWeight: "700" }}>
            여러분에게 필요한 멘토
          </span>
          를 추천해 드립니다.
        </p>
        <p>관심 학과, 원하는 상담 스타일 등을 작성해 주세요!</p>
      </Content>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        !!tagList && (
          <TagList tagList={tagList} setTagList={setTagList} view={false} />
        )
      )}
      <ButtonDiv size="large" height="2.7rem" onClick={onInsertTag}>
        등록하기
      </ButtonDiv>
    </StyledLayout>
  );
};

export default EnterTag;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6rem;
  gap: 4rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  gap: 1rem;
`;
