import styled from "styled-components";
const WageBox = ({ target, wage }) => {
  return (
    <StyledWrapper>
      <header>
        {target ? `${target.name} 멘토의 상담 가격` : "내 상담 가격"}
      </header>
      <main>
        {wage !== -1 ? (
          <span>
            {wage ? `30분당 ${wage.toLocaleString()} 원` : "가격 미설정"}
          </span>
        ) : (
          <span>가격 미설정</span>
        )}
      </main>
    </StyledWrapper>
  );
};

export default WageBox;

const StyledWrapper = styled.div`
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
