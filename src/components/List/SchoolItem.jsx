import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import Input from "../Input/Input";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import MajorItem from "./MajorItem2";
import { StringToDateParse, dateToStringParse } from "../../utils/ParseFormat";
const SchoolItem = ({
  item,
  index,
  length,
  addSchoolItem,
  removeSchoolItem,
  view,
}) => {
  const [schoolType, setSchoolType] = useState(item.schoolType || "");
  const [schoolName, setSchoolName] = useState(item.schoolName || "");
  const [startDate, setStartDate] = useState(item.startDate);
  const [endDate, setEndDate] = useState(item.endDate);
  const [state, setState] = useState(item.state || "");
  const [majorList, setMajorList] = useState(
    item.majorList ? [...item.majorList] : []
  );
  const nextMajorIdx = useRef(item.majorList ? item.majorList.length : 1);
  const addUnivMajorItem = () => {
    const majorItem = {
      idx: nextMajorIdx.current,
      unit: "주전공",
      major: "",
    };
    setMajorList((current) => [...current, majorItem]);
    nextMajorIdx.current += 1;
  };
  const removeUnivMajorItem = (i) => {
    setMajorList(majorList.filter((a) => a.idx !== i));
  };

  useEffect(() => {
    if (schoolType === "대학교" && !!majorList) {
      setMajorList([
        {
          idx: 1,
          unit: "주전공",
          major: "",
        },
      ]);
      item.majorList = [
        {
          idx: 1,
          unit: "주전공",
          major: "",
        },
      ];
    } else {
      setMajorList([]);
      item.majorList = [];
    }
  }, [schoolType]);

  // useEffect(() => {
  //   setMajorList(item.majorList);
  // }, [item.majorList]);

  // useEffect(() => {

  //   console.log(majorList);
  //   console.log("major list ", item.majorList);
  // }, [majorList]);
  return (
    <>
      <InputForm>
        <SchoolSelect
          name="schoolType"
          onChange={(e) => {
            item.schoolType = e.target.value;
            setSchoolType(e.target.value);
          }}
          value={schoolType}
          disabled={view}
        >
          <option name="schoolType" value="고등학교">
            고등학교
          </option>
          <option name="schoolType" value="대학교">
            대학교
          </option>
        </SchoolSelect>
        <Input
          placeholder="학교명"
          size="small"
          width="10rem"
          height="100%"
          onChange={(e) => {
            item.schoolName = e.target.value;
            setSchoolName(e.target.value || "");
          }}
          value={schoolName}
          disabled={view}
        />
        <DatePicker
          placeholderText="입학 날짜"
          dateFormat="yyyy-MM"
          shouldCloseOnSelect
          selected={StringToDateParse(startDate)}
          onChange={(date) => {
            const parseDate = dateToStringParse(date);
            setStartDate(parseDate);
            item.startDate = parseDate;
          }}
          showMonthYearPicker
          showIcon
          disabled={view}
        />
        <div style={{ display: "flex", alignItems: "center" }}>~</div>
        <DatePicker
          selected={StringToDateParse(endDate)}
          placeholderText="졸업 날짜"
          dateFormat="yyyy-MM"
          // minDate={startDate}
          shouldCloseOnSelect
          onChange={(date) => {
            const parseDate = dateToStringParse(date);
            setEndDate(parseDate);
            item.endDate = parseDate;
          }}
          showMonthYearPicker
          showIcon
          disabled={view}
        />

        <SchoolSelect
          name="state"
          onChange={(e) => {
            item.state = e.target.value;
            setState(e.target.value);
          }}
          value={state}
          disabled={view}
        >
          <option name="state" value="졸업">
            졸업
          </option>
          <option name="state" value="졸업예정">
            졸업예정
          </option>
          <option name="state" value="재학">
            재학
          </option>
          <option name="state" value="휴학">
            휴학
          </option>
          <option name="state" value="자퇴">
            자퇴
          </option>
        </SchoolSelect>
        {(index !== 0) & !view ? (
          <Icon>
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={() => {
                removeSchoolItem(item.idx);
              }}
            />
          </Icon>
        ) : (
          ""
        )}
        {index === length - 1 && !view && index !== 4 && (
          <Icon>
            <FontAwesomeIcon icon={faPlusCircle} onClick={addSchoolItem} />
          </Icon>
        )}
      </InputForm>
      {/* {schoolType === "대학교"
        ? majorList &&
          majorList.length > 0 &&
          majorList.map((majorItem, index) => {
            return (
              <Form key={majorItem.idx}>
                <MajorItem
                  item={majorItem}
                  index={index}
                  length={majorList.length}
                  addUnivMajorItem={addUnivMajorItem}
                  removeUnivMajorItem={removeUnivMajorItem}
                  view={view}
                />
              </Form>
            );
          })
        : ""} */}
      {schoolType === "대학교" && (
        <Form>
          <MajorItem majorName={item.majorName} view={view} />
        </Form>
      )}
    </>
  );
};

export default SchoolItem;

const InputForm = styled.div`
  display: flex;
  min-width: 25rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
  height: 3.1rem;
`;
const SchoolSelect = styled.select`
  min-width: 9rem;
  text-align: center;
  background-color: #eaeaea;
  height: 100%;
  font-size: 1rem;
`;

const Form = styled.div`
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin-bottom: 10px;
  gap: 10px;
  height: 2.5rem;
`;
const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2f5383;
  height: 100%;
  svg {
    height: 2rem;
    cursor: pointer;
  }
`;
