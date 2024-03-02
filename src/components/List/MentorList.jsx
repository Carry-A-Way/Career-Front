import styled from "styled-components";
import { xScrollStyle } from "../../styles/common/Scroll";
import MentorCard from "../Card/MentorCard";

const MentorList = ({ mentors, rank }) => {
  return (
    <MentorContainer>
      {mentors.map((item, i) => {
        return <MentorCard key={i} mentor={item} rank={rank} />;
      })}
    </MentorContainer>
  );
};

export default MentorList;

const MentorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  overflow: auto;
  ${xScrollStyle}
  padding: 1rem;
  box-sizing: border-box;
`;
