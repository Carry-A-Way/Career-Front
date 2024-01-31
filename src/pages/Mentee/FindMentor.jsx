import React, { useEffect, useState } from "react";
import {
  MenteeMentorLinkList,
  MenteeMentorMenu,
  PopularMentors,
  RecommendMentors,
  TotalMentors,
} from "../../settings/config";
import SubMenubar from "../../components/Menubar/SubMenubar";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";
import { MenteeHeader, MentorCardGrid } from "../../styles/common/Mentee";
import Input from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import MentorCard from "../../components/List/MentorCard";
import { useQuery } from "react-query";
import { fetchMentor } from "../../api/fetchMentor";

const FindMentor = () => {
  const subMenuList = MenteeMentorMenu;
  const subMenuLinkList = MenteeMentorLinkList;
  const subMenu = subMenuList[1];
  const SortOptions = ["최신순", "후기 많은순", "수강 많은순"];
  const [keyword, setKeyword] = useState("");
  const [tmpKeyword, setTmpKeyword] = useState("");
  const [sort, setSort] = useState(1);

  const { data: mentorData } = useQuery(["findMentor", { sort, keyword }], () =>
    fetchMentor({
      keyword,
      sortOption: sort,
      page: 0,
      size: 10,
    })
  );

  const onSearch = (e) => {
    e.preventDefault();
    setKeyword(tmpKeyword);
  };
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenu}
        subMenuLinkList={subMenuLinkList}
      />
      <StyledLayout>
        <MenteeHeader>
          전공 태그를 통해 원하는 멘토를 검색해 보세요!
        </MenteeHeader>
        <SearchContainer onSubmit={onSearch}>
          <Input
            size="large"
            placeholder="전공 태그를 입력해 주세요."
            onChange={(e) => setTmpKeyword(e.target.value)}
            value={tmpKeyword}
          />
          <Button height="auto">검색</Button>
        </SearchContainer>
        <SortList>
          {SortOptions &&
            SortOptions.map((item, idx) => (
              <div
                className={sort === idx ? "selected-sort" : ""}
                key={idx}
                onClick={() => setSort(idx)}
              >
                {item}
              </div>
            ))}
        </SortList>
        {!!mentorData ? ( // !isLoading 넣기???
          <MentorCardGrid>
            {mentorData.map((item, idx) => (
              <MentorCard key={idx} mentor={item} />
            ))}
          </MentorCardGrid>
        ) : (
          <div>loading...</div>
        )}
      </StyledLayout>
    </>
  );
};

export default FindMentor;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin: 3rem 0 5rem;
`;

const SearchContainer = styled.form`
  display: flex;
  gap: 1rem;
`;
const Header = styled.div`
  border: 1px solid black;
  width: 8rem;
  padding: 0.5rem 2rem;
  background-color: #334b6c;
  color: white;
  border-radius: 1.5rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
`;

const LineGap = styled.div`
  width: 100%;
  margin: 4rem 0;
`;

const SortList = styled.div`
  div {
    border: 2px solid black;
    padding: 0.5rem 1rem;
    text-align: center;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    &:hover,
    &.selected-sort {
      background-color: ${colors.primaryBlue};
      color: white;
    }
  }
  margin: 1rem 0;
  display: flex;
  gap: 1rem;
`;
