import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../styles/common/Theme";
import { MentorCardSize } from "../../styles/common/Size";
import { setDefaultImage } from "../../utils/DefaultValue";
import { calculateAge } from "../../utils/ParseFormat";

const MentorCard = ({ mentor, rank }) => {
  const { profileImg, name, nickname, birth, schoolList } = mentor;
  const majorList = [
    mentor.consultMajor1,
    mentor.consultMajor2,
    mentor.consultMajor3,
  ];
  return (
    <StyledContainer>
      {rank ? (
        <FontAwesomeIcon
          className="icon"
          icon={faCrown}
          style={{ color: "#ffec00" }}
        />
      ) : (
        ""
      )}
      <img alt="" src={setDefaultImage(profileImg)} />
      <div className="content">
        <header>
          {name} ({calculateAge(birth)})
        </header>
        {!!schoolList && schoolList.length ? (
          schoolList.map((school, idx) =>
            school.schoolType === "대학교" ? (
              <main key={idx}>
                <span>{school.schoolName}대학교</span>
                <span>
                  {school.majorName} ({school.state})
                </span>
              </main>
            ) : null
          )
        ) : (
          <main>
            <span>학교 미입력</span>
          </main>
        )}
        <footer>
          {!!majorList &&
            majorList.map(
              (major, idx) => !!major && <span key={idx}>#{major}</span>
            )}
        </footer>
      </div>
    </StyledContainer>
  );
};

export default MentorCard;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${MentorCardSize.width};
  height: ${MentorCardSize.height};
  border: 1px solid black;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  box-shadow: 1px 1px 10px ${colors.primaryBlue};
  .icon {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 2rem;
    background-color: #00000061;
    padding: 10px;
    border-radius: 50%;
  }
  img {
    width: ${MentorCardSize.width};
    height: calc(${MentorCardSize.width} - 1.5rem);
    object-fit: cover;
    object-position: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    text-align: center;
    font-size: 1.1rem;
    background-color: #f5f5f5;
    box-sizing: border-box;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    font-weight: 500;
    flex: 1;
    padding: 1rem;
    header {
      font-size: 1.3rem;
      height: 20%;
    }
    main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 40%;
      gap: 5px;
    }
    footer {
      display: flex;
      gap: 3px;
      width: 100%;
      font-size: 1rem;
      flex-wrap: wrap;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      justify-content: center;
      align-items: center;
      height: 40%;
    }
  }
`;
