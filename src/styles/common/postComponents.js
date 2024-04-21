import styled from "styled-components";

export const ProfileInfo = styled.div`
  display: flex;
  gap: 3rem;
  > .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.3rem;
    color: black;
    > .name {
      font-size: 1.2rem;
      font-weight: 600;
    }
    > .date {
      font-size: 1rem;
    }
  }
`;

export const CommentHeader = styled.header`
  background-color: #eeeeee;
  width: 100%;
  border-bottom: 1px solid #b3b3b3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 2rem;
  box-sizing: border-box;
  position: relative;
`;

export const CommentMain = styled.main`
  padding: 2rem 3rem 0;
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  font-size: 1.2rem;
  line-height: 2rem;
  color: black;
  .main-title {
    font-size: 1.1rem;
    font-weight: 700;
  }
  .main-content {
    resize: none;
    display: block;
    width: 100%;
    background-color: white;
    border: none;
  }
  .main-content-write {
    border: 1px solid gray;
  }
`;

export const CommentContainer = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  > footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding: 0 3rem;
    box-sizing: border-box;
    color: black;
    .footer-left {
      display: flex;
      gap: 0.5rem;
      .icon {
        font-size: 1.4rem;
        cursor: pointer;
      }
      span {
        font-size: 1.2rem;
        margin-right: 1rem;
      }
    }
  }
`;
