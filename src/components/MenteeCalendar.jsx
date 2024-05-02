import moment from "moment/moment";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../styles/big-calendar.css";
import styled from "styled-components";
import { ButtonDiv } from "./Button/Button";
import { PossibleDateList } from "../settings/config";
import { ModalWrapper } from "../styles/common/ModalComponent";
import ApplyConsultModal from "./Modal/ApplyConsultModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { fetchMentorCalendar } from "../api/calendar";
import { useQuery } from "react-query";
import { fetchMentorPossibleTime } from "../api/possibleTime";
import ColorInfo from "./ColorInfo";

const localizer = momentLocalizer(moment);
const MenteeCalendar = (props) => {
  const { target, setTarget, upcomingConsult, lastUpcomingConsult, refetch } =
    props;
  // state 0 이면 수락전, 1이면 수락완료-상담전, 2이면 상담완료
  console.log(lastUpcomingConsult, upcomingConsult);
  const [events, setEvents] = useState([
    ...lastUpcomingConsult,
    ...upcomingConsult,
  ]);
  console.log(events);
  useEffect(() => {
    console.log("here");
    setEvents([...lastUpcomingConsult, ...upcomingConsult]);
  }, [lastUpcomingConsult, upcomingConsult]);
  //const [possibleTimeList, setPossibleTimeList] = useState(PossibleDateList);
  const today = moment();
  const [selectedSlot, setSelectedSlot] = useState({
    start: "",
    end: "",
  });
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyFormOpen, setApplyFormOpen] = useState(false);
  const [isPossibleConsult, setIsPossibleConsult] = useState(false);

  const { data: possibleTimeList } = useQuery(
    ["possible", target?.id],
    () => fetchMentorPossibleTime(target.id),
    {
      refetchOnWindowFocus: false,
      enabled: !!target?.id,
    }
  );
  const isCustomTimeCell = (start) => {
    let customStartTime = new Date();
    let customEndTime = new Date();
    let check = false;
    const today = new Date();
    // const beforeToday = start <= today.setMinutes(today.getMinutes() - 30);
    const beforeToday = start <= today;
    if (beforeToday) return null;
    else {
      !!possibleTimeList &&
        possibleTimeList.some((possibleTime) => {
          check = false;
          possibleTime.possibleTimeList.some((time) => {
            customStartTime = new Date(possibleTime.date + " " + time.start);
            customEndTime = new Date(possibleTime.date + " " + time.end);
            if (start >= customStartTime && start < customEndTime) {
              // 시간 범위안에 포함되면 true
              check = true;
              return true;
            }
            check = false;
            return false;
          });
          if (check) return true;
          else return false;
        });
      return check;
    }
  };

  const slotPropGetter = useCallback(
    (date) => {
      const isSelected = isCustomTimeCell(date);
      var style = {
        backgroundColor: isSelected
          ? "#fff893"
          : isSelected === null
          ? "#dcdcdc98"
          : "white",
      };
      if (
        // 드래그할때
        new Date(date) >= new Date(selectedSlot.start) &&
        new Date(date) < new Date(selectedSlot.end)
      ) {
        if (!moment(selectedSlot.start).isBefore(today)) {
          style = { backgroundColor: "#526684", border: "none" };
        }
      }
      return { style };
    },
    [possibleTimeList]
  );

  const eventPropGetter = (event, start) => {
    console.log("events ", event);
    const isPastDate = moment(start).isBefore(today); // 오늘 이전인지 확인

    const style = {
      backgroundColor: isPastDate ? "lightgray" : "", // 오늘 이전인 경우 회색 배경, 그렇지 않으면 흰 배경
      borderColor: isPastDate ? "lightgray" : "",
      color: isPastDate ? "#3b3b3b" : "white",
    };

    if (!event.status) {
      style.opacity = "0.8";
      style.borderColor = "white";
      style.color = isPastDate ? "#3b3b3b" : "white";
      style.borderStyle = "dashed";
    }

    return { style };
  };

  const { data } = useQuery([target], () => fetchMentorCalendar(target.id), {
    refetchOnWindowFocus: false,
    enabled: !!target,
    onSuccess: (data) => {
      const consultDataList = data;
      const tmpList = [...consultDataList.lastUpcomingConsult];
      tmpList.push(...consultDataList.upcomingConsult);
      const convertEvents = [];
      tmpList.forEach((item) =>
        convertEvents.push({
          ...item,
          id: item.consultId,
          title: item.status ? "상담 예정" : "상담 대기",
          start: new Date(item.startTime),
          end: new Date(item.endTime),
          status: item.status,
        })
      );
      const filteredEvents = convertEvents.filter(
        // 거절된 상담을 시간표에 표시되지 않도록 작업
        (event) => event.status !== 3
      );
      setEvents([
        // ...lastUpcomingConsult,
        // ...upcomingConsult,
        ...filteredEvents,
      ]);
    },
  });

  const handleSelectSlot = (date) => {
    const momentStart = moment(new Date(date.start));
    const momentEnd = moment(new Date(date.end));
    const formattedStartDate = momentStart.format("YYYY.MM.DD HH:mm");
    const formattedEndDate = momentEnd.format("YYYY.MM.DD HH:mm");
    setSelectedSlot({ start: formattedStartDate, end: formattedEndDate });
    const today = new Date();
    const beforeToday = date.start <= today;
    if (!beforeToday) {
      setApplyModalOpen(true);
    }
    setIsPossibleConsult(onCheckPossibleTime(date.start, date.end));
  };

  const onCheckPossibleTime = (start, end) => {
    let startTime = new Date();
    let endTime = new Date();
    return (
      !!possibleTimeList &&
      possibleTimeList.some((possibleTime) => {
        return possibleTime.possibleTimeList.some((time) => {
          startTime = new Date(possibleTime.date + " " + time.start);
          endTime = new Date(possibleTime.date + " " + time.end);
          if (start >= startTime && end <= endTime) {
            // 시간 범위안에 포함되면 true
            return true;
          }
        });
      })
    );
  };

  const renderApplyModal = () => {
    if (target === null) onCloseModal();
    else if (isPossibleConsult) {
      return (
        <ModalWrapper onClick={onCloseModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon
              icon={faXmark}
              className="x-icon"
              onClick={onCloseModal}
            />
            <header>
              <span>{selectedSlot.start}</span>
              <span>~ {selectedSlot.end}</span>
            </header>
            <main>
              <div
                className="button"
                onClick={() => {
                  // onApplyConsult();
                  setApplyModalOpen(false);
                  setApplyFormOpen(true);
                }}
              >
                상담 신청하기
              </div>
            </main>
          </Modal>
        </ModalWrapper>
      );
    } else {
      return (
        <ModalWrapper onClick={onCloseModal}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <FontAwesomeIcon
              icon={faXmark}
              className="x-icon"
              onClick={onCloseModal}
            />
            <main>상담이 불가능한 시간대입니다.</main>
          </Modal>
        </ModalWrapper>
      );
    }
  };

  const onCloseModal = () => {
    setApplyModalOpen(false);
    setSelectedSlot({ start: "", end: "" });
  };

  return (
    <CalendarContainer>
      <Header>
        <ColorInfoWrapper>
          <ColorInfo color="yellow">멘토 상담 가능 시간</ColorInfo>
        </ColorInfoWrapper>
        <Title>
          {!!target ? `${target.name} 멘토의 시간표` : "내 시간표"}
          {!!target && (
            <ButtonDiv
              height="2rem"
              onClick={() => {
                setTarget(null);
                console.log([...lastUpcomingConsult, ...upcomingConsult]);
                setEvents([...lastUpcomingConsult, ...upcomingConsult]);
              }}
            >
              내 시간표 보기
            </ButtonDiv>
          )}
        </Title>
      </Header>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={"start"}
        endAccessor={"end"}
        selectable
        defaultView="week"
        eventPropGetter={eventPropGetter}
        slotPropGetter={slotPropGetter}
        onSelectSlot={handleSelectSlot}
        min={new Date(0, 0, 0, 7, 0, 0)} // 표시할 최소 시간
        max={new Date(0, 0, 0, 23, 59, 59)} // 표시할 최대 시간
        step={30}
      />
      {applyModalOpen && renderApplyModal()}
      {applyFormOpen && (
        <ApplyConsultModal
          setModalClose={() => {
            setApplyFormOpen(false);
            setSelectedSlot({ start: "", end: "" });
          }}
          startTime={selectedSlot.start}
          endTime={selectedSlot.end}
          mentor={target}
          refetch={refetch}
        />
      )}
    </CalendarContainer>
  );
};

export default MenteeCalendar;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Title = styled.nav`
  font-size: 1.3rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ColorInfoWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border: 1px solid #d6d6d6;
  border-radius: 0.4rem;
  background-color: #fafafa;
`;

const Modal = styled.div`
  background-color: white;
  padding: 2rem 5rem;
  border-radius: 1rem;
  position: relative;
  .x-icon {
    position: absolute;
    font-size: 1.4rem;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
  > header {
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 600;
  }
  > main {
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-size: 1rem;
    font-weight: 500;
    .button {
      padding: 0.5rem 1.5rem;
      cursor: pointer;
      border-radius: 0.7rem;
      background-color: #516a8b;
      color: white;
      &:hover {
        background-color: #2f5383;
      }
    }
  }
`;
