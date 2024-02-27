import styled from "styled-components";
const MentorFeeBox = ({ target, fee }) => {
  return (
    <PointWrapper>
      <header>{target.name} 멘토의 상담 가격</header>
      <main>
        <span>30분당 {fee.toLocaleString() || 0} </span> 원
      </main>
    </PointWrapper>
  );
};

export default MentorFeeBox;

const PointWrapper = styled.div`
  width: 100%;
  height: 12rem;
  border: 1px solid #c7c5c5;
  border-radius: 10px;
  background-color: #fcfcfc;
  padding: 2rem 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  header,
  main {
    margin-left: 3rem;
    font-size: 1.5rem;
    font-weight: 500;
    span {
      font-size: 1.7rem;
      font-weight: 600;
      padding-right: 1rem;
    }
  }
`;
