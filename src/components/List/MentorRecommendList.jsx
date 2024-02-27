import React, { useState } from "react";
import styled from "styled-components";
import { yScrollStyle } from "../../styles/common/Scroll";
import { setDefaultImage } from "../../utils/DefaultValue";
import { calculateAge } from "../../utils/ParseFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { fetchMentor } from "../../api/fetchMentor";

const MentorRecommendList = (props) => {
  const { target, setTarget } = props;
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (mentor) => {
    setTarget(mentor);
  };

  const { data, isLoading } = useQuery(
    "recommend-mentor",
    () =>
      fetchMentor({
        keyword: "",
        sortOption: 1,
        page: 0,
        size: 20,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  if (isLoading) return <ListWrapper>Loading...</ListWrapper>;
  else
    return (
      <ListWrapper>
        <div className="header-wrapper">
          <header className="list-title">추천 멘토</header>
          <span className="list-subtitle">
            * 클릭시 멘토의 시간표가 보여집니다.
          </span>
        </div>
        <List>
          {data ? (
            data.map((mentor, idx) => {
              const majorList = [
                mentor.consultMajor1,
                mentor.consultMajor2,
                mentor.consultMajor3,
              ];
              return (
                <CardContainer
                  key={idx}
                  onClick={() => {
                    handleCardClick(mentor);
                    setSelectedCard(idx);
                  }}
                  isSelected={selectedCard === idx && !!target}
                >
                  <img alt="" src={setDefaultImage(mentor.profileImg)} />
                  <div className="card-info">
                    <span className="card-info__name">
                      {mentor.name}{" "}
                      {!!mentor.birth && `(${calculateAge(mentor.birth)})`}
                    </span>
                    <span>
                      {!!mentor.schoolList && mentor.schoolList.length ? (
                        mentor.schoolList.map((school, idx) =>
                          school.schoolType === "대학교" ? (
                            <main key={idx}>
                              <span>{school.schoolName}대학교 </span>
                              <span>
                                {school.majorName} ({school.state})
                              </span>
                            </main>
                          ) : null
                        )
                      ) : (
                        <span>학교 미입력</span>
                      )}
                    </span>
                    <span>
                      {!!majorList &&
                        majorList.map(
                          (major, idx) =>
                            !!major && <span key={idx}>#{major} </span>
                        )}
                    </span>
                    <span>
                      리뷰 : {mentor.rateCount || 0}개, 평점 :{" "}
                      <FontAwesomeIcon
                        icon={faStar}
                        style={{ color: "#ffd900" }}
                      />{" "}
                      {mentor.rateAvg || 0}점
                    </span>
                  </div>
                </CardContainer>
              );
            })
          ) : (
            <span>추천 멘토가 없습니다.</span>
          )}
        </List>
      </ListWrapper>
    );
};

export default MentorRecommendList;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: end;
    .list-title {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .list-subtitle {
      margin-bottom: 0.5rem;
    }
  }
`;
const List = styled.div`
  max-height: 30rem;
  overflow-y: auto;
  ${yScrollStyle}
  font-size: 1rem;
  border: 1px solid lightgray;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  width: 90%;
  padding: 1rem;
  border: ${(prop) =>
    prop.isSelected ? "1.5px solid gray" : "1px solid #f0f0f0"};
  background-color: #f0f0f0;
  cursor: pointer;
  &:hover {
    border: 1.5px solid gray;
  }
  > img {
    width: 8rem;
    height: 8rem;
    border: 1px solid gray;
    border-radius: 5px;
    object-fit: cover;
  }
  .card-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    padding-left: 1rem;
    box-sizing: border-box;
    &__name {
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
`;
