import MentorList from "./MentorList";
import { ButtonDiv } from "../Button/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MenteeHeader } from "../../styles/common/mentee/MenteeForm";

const SuggestionMentor = () => {
  const navigate = useNavigate();
  const emptyRecommendMentors = [];
  return (
    <StyledContainer>
      <MenteeHeader>나의 맞춤형 멘토</MenteeHeader>
      {emptyRecommendMentors && emptyRecommendMentors.length ? (
        <>
          <div className="notice">* 멘토 프로필 클릭시 상세보기</div>
          <MentorList mentors={emptyRecommendMentors} />
          <div className="button-wrapper">
            <ButtonDiv
              onClick={() => {
                navigate("/mentee/mentor/recommend");
              }}
            >
              추천멘토 더 보러가기
            </ButtonDiv>
          </div>
        </>
      ) : (
        <NoList>
          <div>추천 멘토가 없습니다.</div>
          <div>태그를 등록하고 멘토를 추천 받으세요!</div>
          <ButtonDiv onClick={() => navigate("/mentee/tag")}>
            태그 등록하기
          </ButtonDiv>
        </NoList>
      )}
    </StyledContainer>
  );
};

export default SuggestionMentor;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .notice {
    width: 100%;
    text-align: end;
    font-size: 1.1rem;
    color: #334b6c;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .button-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
`;

const NoList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.2rem;
  margin: 3rem 0;
`;
