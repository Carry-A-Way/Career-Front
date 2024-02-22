import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBullhorn } from "@fortawesome/free-solid-svg-icons";
import MenuLine from "../../components/Line/MenuLine";
import HorizontalLine from "../../components/Line/HorizontalLine";
import LikeList from "../../components/List/LikeList";
import { colors } from "../../styles/common/Theme";
const Setting = () => {
  const revenue = [
    {
      date: "2023.04.01 16:42",
      name: "신종민 학생 상담",
      money: 16000,
    },
    {
      date: "2023.05.06 20:39",
      name: "채희문 학생 상담",
      money: 12000,
    },
  ];
  // const sum = 48000;
  // const [sumRevenue, setSumRevenue] = useState(revenue[0].money);
  const sumRevenue = revenue[0].money;
  // const calcSum = (money) => {
  //   setSumRevenue(sumRevenue + money);
  // };

  const [alarm1, setAlarm1] = useState(true);
  const changeAlarm1 = () => {
    setAlarm1((current) => !current);
  };
  const [alarm2, setAlarm2] = useState(true);
  const changeAlarm2 = () => {
    setAlarm2((current) => !current);
  };
  const [alarm3, setAlarm3] = useState(true);
  const changeAlarm3 = () => {
    setAlarm3((current) => !current);
  };
  return (
    <>
      <Notice>
        <FontAwesomeIcon icon={faBullhorn} />
        <span>[2023.06.12 공지] 멘토 프로모션 진행 예정</span>
        <span
          style={{
            fontWeight: "500",
            marginRight: "10px",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          바로가기
        </span>
        <FontAwesomeIcon
          icon={faAngleRight}
          style={{
            cursor: "pointer",
          }}
        />
      </Notice>
      <SubMenu>
        <span>거래 내역</span>
        <span>수익 관리</span>
        <span>커뮤니티 작성글</span>
        <span>좋아요 한 글</span>
        <span>알림 설정</span>
      </SubMenu>
      <Form>
        <Wrapper>
          <Title>
            <MenuLine size="small" />
            <span>거래 내역</span>
          </Title>
          <Content>
            <None></None>
          </Content>
        </Wrapper>
        <div style={{ width: "80%" }}>
          <HorizontalLine />
        </div>
        <Wrapper>
          <Title>
            <MenuLine size="small" />
            <span>수익 관리</span>
          </Title>
          <Content>
            <ScrollWrapper>
              <table>
                <tr>
                  <th>
                    총 수익금
                    <br />
                    76,800 원
                  </th>
                  <th>
                    출금한 수익금
                    <br />
                    12,000 원
                  </th>
                  <th>
                    출금 가능한 수익금
                    <br />
                    64,800원
                  </th>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      backgroundColor: "#EAEAEA",
                      padding: "5px",
                      textAlign: "center",
                    }}
                  >
                    2023년 04월
                  </td>
                </tr>
                <tbody>
                  {revenue &&
                    revenue.map((item, i) => {
                      return (
                        <tr>
                          <td>{item.date}</td>
                          <td>{item.name}</td>
                          <td>
                            {item.money} 원<br />총 수익 :{sumRevenue}원
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </ScrollWrapper>
            <ButtonWrapper>
              <Button>출금 신청하기</Button>
            </ButtonWrapper>
          </Content>
        </Wrapper>
        <div style={{ width: "80%" }}>
          <HorizontalLine />
        </div>
        <Wrapper>
          <Title>
            <MenuLine size="small" />
            <span>커뮤니티 작성글</span>
          </Title>
          <Content>
            <None></None>
          </Content>
        </Wrapper>
        <div style={{ width: "80%" }}>
          <HorizontalLine />
        </div>
        <Wrapper>
          <Title>
            <MenuLine size="small" />
            <span>좋아요 한 글</span>
          </Title>
          <Content>
            <LikeList />
          </Content>
        </Wrapper>
        <Wrapper>
          <Title>
            <MenuLine size="small" />
            <span>알림 설정</span>
          </Title>
          <Content>
            <AlarmWrapper>
              <AlarmContainer>
                <span>전공 관련 추천 상담사</span>
                <div style={{ width: "8rem" }}>
                  <HorizontalLine color={"#9D9D9D"} />
                </div>
                {alarm1 ? (
                  <div className="on" onClick={changeAlarm1}>
                    <div>ON</div>
                  </div>
                ) : (
                  <div className="off" onClick={changeAlarm1}>
                    <div>OFF</div>
                  </div>
                )}
              </AlarmContainer>
              <AlarmContainer>
                <span>수업 전 카카오톡 알림</span>
                <div style={{ width: "8rem" }}>
                  <HorizontalLine color={"#9D9D9D"} />
                </div>
                {alarm2 ? (
                  <div className="on" onClick={changeAlarm2}>
                    <div>ON</div>
                  </div>
                ) : (
                  <div className="off" onClick={changeAlarm2}>
                    <div>OFF</div>
                  </div>
                )}
              </AlarmContainer>
              <AlarmContainer>
                <span>수업 신청 시 알림</span>
                <div style={{ width: "8rem" }}>
                  <HorizontalLine color={"#9D9D9D"} />
                </div>
                {alarm3 ? (
                  <div className="on" onClick={changeAlarm3}>
                    <div>ON</div>
                  </div>
                ) : (
                  <div className="off" onClick={changeAlarm3}>
                    <div>OFF</div>
                  </div>
                )}
              </AlarmContainer>
            </AlarmWrapper>
          </Content>
        </Wrapper>
      </Form>
    </>
  );
};

export default Setting;

const Notice = styled.div`
  height: 1vh;
  min-height: 1rem;
  padding: 20px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  background-color: #2f5383;
  color: white;
  span {
    margin: 0 30px;
  }
`;

const SubMenu = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  text-decoration: underline;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  span {
    margin: 0 20px;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 5rem 0;
  width: 70%;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  span {
    margin-left: 20px;
  }
`;

const None = styled.div`
  width: 100%;
  height: 30rem;
  border: 1px solid black;
`;
const Content = styled.div`
  width: 45rem;
  min-height: 25rem;
  max-height: 35rem;
  padding: 20px;
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1.3rem;
    td,
    th {
      text-align: center;
      padding: 10px;
    }
    th {
      background-color: #516684;
      border: 1px solid #9d9d9d;
      color: white;
      font-weight: 400;
    }
    td:last-child {
      text-align: end;
    }
    tr {
      border: 1px solid #9d9d9d;
    }
  }
`;

const ScrollWrapper = styled.div`
  height: 30rem;
  border: 1px solid gray;
  overflow: auto;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;
const Button = styled.div`
  background-color: #516684;
  color: white;
  font-size: 1.2rem;
  width: 8rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlarmWrapper = styled.div`
  width: 100%;
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const AlarmContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px 0;
  span {
    font-size: 1.4rem;
    font-weight: 600;
    width: 12rem;
  }
  .on {
    width: 100px;
    height: 30px;
    border: 1px solid black;
    border-radius: 20px;
    display: flex;
    justify-content: flex-start;
    div {
      width: 60%;
      height: 28px;
      border: 1px solid black;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: ${colors.primaryBlue};
      color: white;
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
  .off {
    width: 100px;
    height: 30px;
    border: 1px solid black;
    border-radius: 20px;
    display: flex;
    justify-content: flex-end;
    div {
      width: 60%;
      height: 28px;
      border: 1px solid black;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background-color: ${colors.primaryBlue};
      color: white;
      font-size: 1.2rem;
      font-weight: 500;
    }
  }
`;
