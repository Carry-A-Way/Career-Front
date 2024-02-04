import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MenteeHeader } from "../../styles/common/Mentee";
import { colors } from "../../styles/common/Theme";
import TagList from "../../components/List/TagList";
import { fetchMenteeProfile } from "../../api/fetchProfile";
import { useQuery } from "react-query";
import { modifyMenteeProfile } from "../../api/modifyProfile";
import { ButtonDiv } from "../../components/Button/Button";

const EnterTag = () => {
  const [tagList, setTagList] = useState([]);
  const { data, isLoading } = useQuery("tag", fetchMenteeProfile, {
    staleTime: 1000 * 60 * 10,
    onSuccess: (data) => {
      setTagList(!!data.tagList ? [...data.tagList] : []);
    },
  });

  const onInsertTag = (e) => {
    modifyMenteeProfile({ tagList: [...tagList] }, null);
    window.alert("태그를 등록했습니다.");
  };

  const onDeleteTag = (e) => {
    modifyMenteeProfile({ tagList: [...tagList] }, null);
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
      {!!tagList && (
        <TagList tagList={tagList} setTagList={setTagList} view={false} />
      )}
      <ButtonDiv
        size="large"
        height="2.7rem"
        onInsert={onInsertTag}
        onDelete={onDeleteTag}
      >
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

const EnterButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primaryBlue};
  border-radius: 5px;
  color: white;
  border: 1px solid #2f5383;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem 2rem;
  box-sizing: border-box;
  cursor: pointer;
  height: 3rem;
`;
