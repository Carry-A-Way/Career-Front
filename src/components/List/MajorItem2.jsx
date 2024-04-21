import React, { useState } from "react";
import Input from "../Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const MajorItem = ({ majorName, view }) => {
  const [major, setMajor] = useState(majorName || "");
  return (
    <>
      <FontAwesomeIcon icon={faArrowRight} />
      <div>전공 : </div>
      <Input
        size="medium"
        placeholder="학과를 입력해 주세요."
        value={major}
        height="100%"
        onChange={(e) => {
          majorName = e.target.value;
          setMajor(e.target.value);
        }}
        disabled={view}
      />
    </>
  );
};

export default MajorItem;
