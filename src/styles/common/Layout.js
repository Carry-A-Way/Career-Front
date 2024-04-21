import styled from "styled-components";

export const TwoColGrid = styled.div`
  width: 100%;
  max-width: 100rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  margin: 4rem auto;
`;

export const GridLeftCol = styled.section`
  min-width: 20rem;
  max-width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  padding: 0 3rem;
  padding-top: 2rem;
  box-sizing: border-box;
`;

export const GridRightCol = styled.section`
  min-width: 57rem;
  display: flex;
  flex-direction: column;
  padding: 0 5rem;
  gap: 2rem;
  padding-top: 2rem;
  box-sizing: border-box;
  border-left: 1px solid #bcbcbc;
`;

export const ScheduleLayout = styled.div`
  display: flex;
  gap: 5rem;
  margin: 60px auto;
  min-width: 70rem;
  min-height: 50rem;
  height: 80vh;
  max-height: 67rem;
  justify-content: center;
  box-sizing: border-box;
`;
