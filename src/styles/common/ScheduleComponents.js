import styled from "styled-components";
import { colors } from "./Theme";

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
export const List = styled.div`
  width: 30rem;
  max-width: 40vw;
  font-size: 1rem;
  .list-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  > .header,
  .main {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: ${colors.primaryBlue};
    color: white;
    gap: 0.5rem;
    li {
      flex: 2;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:first-child,
      &:last-child {
        flex: 0.5;
      }
      > .icon {
        font-size: 1rem;
        cursor: pointer;
      }
    }
  }
  > .main {
    background-color: white;
    color: black;
    border: 1px solid lightgray;
    border-top: none;
  }
  .main-detail {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.7rem;
    border: 1px solid lightgray;
    border-top: none;
    &__item {
      display: flex;
      width: 100%;
      .item__title {
        width: 25%;
        padding-left: 1rem;
      }
      .item__content {
        font-weight: 700;
        color: #334b6c;
      }
      .question-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }
    }
    .detail-btn {
      margin: 1rem auto 0;
      padding: 0.3rem 2rem;
      background-color: transparent;
      border: 1px solid gray;
      border-radius: 5px;
      font-size: 1.1rem;
      cursor: pointer;
      &:hover {
        background-color: #334b6c;
        color: white;
      }
    }
  }
`;

export const DetailModal = styled.div`
  width: 55rem;
  background-color: white;
  padding: 3rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .detail-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    position: relative;
    padding-top: 0.5rem;
    .icon {
      font-size: 2rem;
      cursor: pointer;
      position: absolute;
      top: 0rem;
      right: 0rem;
      color: #515151;
    }
    &__img {
      width: 5rem;
      height: 5rem;
      background-image: ${(props) =>
        props.img
          ? `url(${props.img})`
          : `url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")`};
      background-size: cover;
      border: 1px solid gray;
      border-radius: 50%;
    }
    &__name {
      font-size: 2rem;
      font-weight: 500;
    }
    &__date {
      /* position: absolute;
    top: 0rem;
    right: 4rem; */
      font-size: 1.2rem;
      font-weight: 600;
      padding: 0.5rem 1rem;
      background-color: #334b6c;
      color: white;
      border-radius: 0.7rem;
    }
  }
  > main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .detail-main-row {
      display: flex;
      gap: 1rem;
      .detail-main__tag-wrapper {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .detail-main__tag {
        background-color: #334b6c;
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 1rem;
        font-size: 1rem;
        /* max-width: 5rem; */
        /* white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis; */
      }
    }
    .detail-main {
      max-height: 10rem;
      overflow: auto;
      font-size: 1.2rem;
      line-height: 1.5rem;
      border: 1px solid black;
      padding: 2rem 1rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      background-color: #f3f3f3;
      box-shadow: 0 0.1rem 0.5rem 0 gray;
      gap: 1rem;
      flex: 1;
      &__title {
        font-weight: 600;
      }
      &__content {
        white-space: pre-line;
      }
    }
  }
  .detail-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    &__btn {
      font-size: 1.3rem;
      font-weight: 600;
      cursor: pointer;
      &:last-child {
        color: #334b6c;
      }
    }
  }
`;
