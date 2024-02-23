import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Input from "../Input/Input";
import { InputForm } from "../../styles/common/FormComponents";
import { Button } from "../Button/Button";
import MajorAutoComplete from "./MajorAutoComplete";
import { fetchMajorAutoComplete } from "../../api/fetchMajorList";
import { useQuery } from "react-query";

const TagList = ({ tagList, setTagList, view }) => {
  const [tmpTag, setTmpTag] = useState("");
  const tagId = useRef(tagList.length ? tagList.length + 1 : 1);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const INPUT_WIDTH = "15rem";
  const INPUT_HEIGHT = "3rem";
  const onUpdateTag = (value) => {
    setTagList((current) => [...current, { idx: tagId.current, name: value }]);
    tagList = [...tagList, { idx: tagId.current, name: value }];
    tagId.current += 1;
  };
  const onDeleteTag = (idx) => {
    setTagList(tagList.filter((a) => a.idx !== idx));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const { data: keywordData } = useQuery(tmpTag, () =>
    fetchMajorAutoComplete(tmpTag)
  );

  useEffect(() => {
    tagId.current = tagList.length + 1;
  }, [tagList]);
  return (
    <StyledForm onSubmit={onSubmit}>
      <InputForm>
        <Input
          width={INPUT_WIDTH}
          height={INPUT_HEIGHT}
          placeholder="태그명"
          onChange={(e) => {
            setTmpTag(e.target.value);
          }}
          value={tmpTag}
          disabled={view}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {isInputFocused && keywordData && (
          <MajorAutoComplete
            inputWidth={INPUT_WIDTH}
            inputHeight={INPUT_HEIGHT}
            keywordData={keywordData}
            inputValue={tmpTag}
            setInputValue={setTmpTag}
          />
        )}
        {!view && (
          <Button
            height={INPUT_HEIGHT}
            onClick={() => {
              onUpdateTag(tmpTag);
              setTmpTag("");
            }}
          >
            추가
          </Button>
        )}
      </InputForm>
      <TagWrapper>
        {tagList.length
          ? tagList.map((item) => {
              return (
                <Tag key={item.idx}>
                  <span className="full-name">{item.name}</span>
                  <span className="short-name">#{item.name}</span>
                  {!view && (
                    <FontAwesomeIcon
                      onClick={() => onDeleteTag(item.idx)}
                      className="delete-icon"
                      icon={faXmark}
                    />
                  )}
                </Tag>
              );
            })
          : ""}
      </TagWrapper>
    </StyledForm>
  );
};

export default TagList;

const StyledForm = styled.form``;
const TagWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 2rem 0;
`;
const Tag = styled.div`
  width: 6rem;
  height: 2rem;
  border: 1px solid #334b6c;
  border-radius: 10px;
  background-color: #334b6c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  padding: 0 0.5rem;
  position: relative;
  .short-name {
    width: 70%;
    margin-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .full-name {
    /* visibility: hidden; */
    position: absolute;
    bottom: 2.2rem;
    color: black;
    background-color: #d5d5d5;
    visibility: hidden;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
    font-size: 0.8rem;
    text-align: center;
  }
  &:hover {
    .full-name {
      visibility: visible;
    }
  }
  .delete-icon {
    cursor: pointer;
  }
`;
