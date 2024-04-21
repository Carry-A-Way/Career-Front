import styled, { keyframes } from "styled-components";
import { colors } from "../../styles/common/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowRightRotate,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <StyledLayout>
      <HomeSection>
        <h1>
          20살 이전에 <br />
          진로를 찾지 못하면
          <br />
          <strong style={{ color: "#042bf9" }}>반드시</strong> 후회합니다.
        </h1>
        <img
          className="background-img"
          alt="background"
          src="/png/mentorHome.png"
        />
        <div className="background-wrapper"></div>
      </HomeSection>
      <Section>
        <h2>
          하지만 코앞에는 시험, 입시.. <br />
          우리는{" "}
          <strong style={{ color: "#042bf9", fontWeight: "800" }}>시간</strong>
          이 없습니다. <br />
          그리고,
          <br />
          진로에 대한{" "}
          <strong style={{ color: "#042bf9", fontWeight: "800" }}>비밀</strong>
          은 대학 선배가 가장 잘 압니다.
          <br />
        </h2>
        <h2>
          무조건{" "}
          <strong style={{ fontWeight: "800" }}>취업보장 학과, 명문대</strong>를
          가면 좋을까요?
        </h2>
        <AvatarWrapper>
          <Avatar>
            <AvatarImage>
              <img src="/png/people1.png" alt="avatar1" />
            </AvatarImage>
            <AvatarContent>
              <div className="name-wrapper">
                <p className="name">채희문</p>
                <p className="major">전자공학과</p>
              </div>
              <p className="info">
                하고싶은 게 없어 취업이 잘되는
                <br />
                전자공학과를 선택한 채희문
              </p>
              <TimeLine style={{ alignSelf: "flex-start" }}>
                <p>입학대학</p>
                <p className="strong-text">최상위(SPK)</p>
              </TimeLine>
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ transform: "rotateZ(45deg)", fontSize: "2rem" }}
              />
              <TimeLine style={{ alignSelf: "flex-end" }}>
                <p>대학 생활</p>
                졸업까지<span className="strong-text"> 6년</span>
                <br />
                취업 <span className="strong-text">실패</span>
              </TimeLine>
              <p className="info">
                진로를 바꾸고 싶어도
                <p className="strong-text">이미 늦어버렸어요...</p>
              </p>
            </AvatarContent>
          </Avatar>
          <Avatar
            style={{
              background: "linear-gradient( #042df98f, #042BF9, #042df98f)",
              color: "white",
            }}
          >
            <AvatarImage style={{ backgroundColor: "#00bfff" }}>
              <img src="/png/people2.png" alt="avatar1" />
            </AvatarImage>
            <AvatarContent>
              <div className="name-wrapper">
                <p className="name">신종민</p>
                <p className="major">컴퓨터공학과</p>
              </div>
              <p className="info">
                <span className="strong-text" style={{ color: "#ffe600" }}>
                  코딩으로 실험하는 흥미
                </span>
                를 찾아
                <br />
                컴퓨터공학과를 선택한 신종민
              </p>
              <TimeLine
                style={{ alignSelf: "flex-start", backgroundColor: "#00bfff" }}
              >
                <p>입학대학</p>
                <p className="strong-text">지방거점국립</p>
              </TimeLine>
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ transform: "rotateZ(45deg)", fontSize: "2rem" }}
              />
              <TimeLine
                style={{ alignSelf: "flex-end", backgroundColor: "#00bfff" }}
              >
                <p>대학 생활</p>
                졸업까지
                <span className="strong-text" style={{ color: "#ffe600" }}>
                  {" "}
                  4년
                </span>
                <br />
                취업{" "}
                <span className="strong-text" style={{ color: "#ffe600" }}>
                  IT 대기업
                </span>
              </TimeLine>
              <p className="info">
                상담을 한 후로
                <p className="strong-text" style={{ color: "#ffe600" }}>
                  후회한 적이 없어요!
                </p>
              </p>
            </AvatarContent>
          </Avatar>
        </AvatarWrapper>
        <h2>
          지나간 시간을{" "}
          <strong style={{ fontWeight: "800", textDecoration: "underline" }}>
            후회
          </strong>
          하고 싶지 않다면 <br />
          지금 당장{" "}
          <strong style={{ fontWeight: "800", textDecoration: "underline" }}>
            상담
          </strong>
          을 받으셔야 합니다.
          <br />
        </h2>
        <h2
        // style={{
        //   background:
        //     "linear-gradient(to right, #e9e9e9, transparent, #e9e9e9)",
        //   width: "100%",
        //   padding: "2rem 0",
        // }}
        >
          캐리어웨이는
          <br />이 모든 것을{" "}
          <strong style={{ fontWeight: "800", color: "#042BF9" }}>
            한번에 해결
          </strong>
          합니다.
        </h2>
      </Section>
      <Section>
        <h2>
          1. <strong style={{ fontWeight: "800" }}>수많은 학과별 멘토</strong>가
          기다리고 있습니다.
        </h2>
        <MentorListWrapper>
          <img src="/png/homeMentor1.png" alt="sample-mentor" />
          <img src="/png/homeMentor2.png" alt="sample-mentor" />
        </MentorListWrapper>
        <h2>
          언제, 어디든지
          <br />
          <strong style={{ fontWeight: "800", color: "#042BF9" }}>
            단 10분만에{" "}
          </strong>
          진로를 놓치지 않습니다.
          <br />
          <strong style={{ fontWeight: "800", color: "#042BF9" }}>
            멘토는 철저한 검증{" "}
          </strong>
          아래 선발됩니다.
        </h2>
      </Section>
      <Section>
        <h2>
          2. <strong style={{ fontWeight: "800" }}>가격이 저렴</strong>합니다.
        </h2>
        <PointImgWrapper>
          <img src="/png/pointMount.png" alt="points" />
        </PointImgWrapper>
        <h2>
          멘토별 가격 자유제로
          <br />
          <strong style={{ fontWeight: "800", color: "#042BF9" }}>
            최소 5,000원
          </strong>
          에 상담이 가능하며,
          <br />
          원하는 가격의{" "}
          <strong style={{ fontWeight: "800", color: "#042BF9" }}>
            멘토를 선택
          </strong>
          할 수 있습니다.
        </h2>
      </Section>
      <Section>
        <h2>
          3.
          <strong style={{ fontWeight: "800" }}>카메라 자율화</strong>로 부담을
          줄였습니다.
          <br />
        </h2>
        <ImgWrapper>
          <img src="/png/homeCamera.png" alt="mentor" />
        </ImgWrapper>
        <h2>
          신뢰를 위해
          <strong style={{ fontWeight: "800", color: "#042BF9" }}>
            {" "}
            멘토의 모습은 공개
          </strong>
          되지만,
          <br />
          학생은 상담시{" "}
          <strong style={{ fontWeight: "800", color: "#042BF9" }}>
            카메라 여부가 자유롭습니다.
          </strong>
        </h2>
      </Section>
      <Section>
        <h2>
          4. 모든 것들은{" "}
          <strong style={{ fontWeight: "800" }}>후기가 증명</strong>합니다.
        </h2>
        <ImgWrapper>
          <img src="/png/homeReview.png" alt="mentor" />
        </ImgWrapper>
      </Section>
      <FooterSection>
        <h2>
          <strong style={{ color: "#042bf9", fontSize: "3.3rem" }}>10초</strong>
          만에 가입하고
          <br />
          <strong style={{ color: "#042bf9", fontSize: "3.3rem" }}>10년</strong>
          치 후회를 끝내세요.
        </h2>
        <SignupBtn href="/signup/mentee">10초 회원가입 바로가기</SignupBtn>
      </FooterSection>
    </StyledLayout>
  );
};

export default Home;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomeSection = styled.section`
  position: relative;
  padding: 2rem 0;
  > h1 {
    text-align: center;
    margin-top: 8rem;
    font-size: 3.6rem;
    font-weight: 700;
    line-height: 1.5;
  }
  height: 90vh;
  max-height: 75rem;
  /* background-color: black; */
  background: linear-gradient(to top, #bebebe, transparent);
  .background-img {
    position: absolute;
    bottom: 0;
    width: 100%;
    max-width: 90rem;
    max-height: 38rem;
    height: 60%;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.7;
    overflow: hidden;
  }
  > .background-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    width: 100%;
    max-width: 90rem;
    max-height: 40rem;
    height: 60%;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(to top, #bebebe, transparent);
  }
`;

const Section = styled.section`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  > h2 {
    text-align: center;
    font-size: 2.4rem;
    font-weight: 600;
    line-height: 1.8;
    margin-top: 3rem;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  font-weight: 500;
  width: 100%;
  background: linear-gradient(to bottom, transparent, #00bfff, transparent);
`;

const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  background: linear-gradient(#cfcfcf, #9f9f9f, #cfcfcf);
  border-radius: 1.8rem;
  position: relative;
  padding: 6rem 2rem 2rem 2rem;
  margin-top: 8rem;
`;

const AvatarImage = styled.header`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: #e2e2e2;
  border-radius: 50%;
  width: 10rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  > img {
    width: 70%;
  }
`;

const AvatarContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.8rem;
  gap: 2rem;
  .strong-text {
    font-weight: 700;
    font-size: 2rem;
  }
  > .name-wrapper {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    .name {
      font-weight: 700;
      font-size: 2.2rem;
    }
  }
  > .info {
    line-height: 1.5;
    text-align: center;
  }
`;

const TimeLine = styled.p`
  background-color: #e2e2e2;
  line-height: 1.5;
  padding: 1rem 2rem;
  border-radius: 1rem;
`;

const moveLeft = keyframes`
  0% {
    transform: translateX(-5%);
  }
  50% {
    transform: translateX(5%);
  }
  100% {
    transform: translateX(-5%);
  }
`;

const moveRight = keyframes`
  0% {
    transform: translateX(5%);
  }
  50% {
    transform: translateX(-5%);
  }
  100% {
    transform: translateX(5%);
  }
`;

const MentorListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 3rem;
  width: 100%;
  background: linear-gradient(to right, #fafafa, transparent, #fafafa);
  > img:first-child {
    width: 100%;
    max-width: 90rem;
    z-index: -1;
    animation: ${moveRight} 10s linear infinite;
  }
  > img:last-child {
    width: 100%;
    max-width: 90rem;
    z-index: -1;
    animation: ${moveLeft} 10s linear infinite;
  }
`;

const PointImgWrapper = styled.div`
  width: 100%;
  /* background: linear-gradient(to right, #fafafa, transparent, #fafafa); */
  display: flex;
  justify-content: center;
  > img {
    width: 100%;
    max-width: 90rem;
    z-index: -1;
  }
`;

const ImgWrapper = styled.div`
  margin: 2rem 0;
  > img {
    width: 100%;
    max-width: 90rem;
    opacity: 0.9;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  gap: 5rem;
  height: 50rem;
  /* background: linear-gradient(to bottom, transparent, #00bfff); */
  background: linear-gradient(to bottom, transparent, #dcdcdc);
  > h2 {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.8;
    margin-top: 3rem;
    text-align: center;
  }
`;
const SignupBtn = styled.a`
  padding: 1.5rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #042bf9;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  border-radius: 1rem;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: #1c40f4;
  }
`;
