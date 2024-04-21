import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { ModalWrapper } from "../../styles/common/ModalComponent";
const ImageModal = (props) => {
  const { setModalOpen, selectImg, setSelectImg, imgList } = props;
  return (
    <ModalWrapper
      style={{ backgroundColor: "#000000bf" }}
      onClick={() => setModalOpen(false)}
    >
      <DetailModal onClick={(e) => e.stopPropagation()}>
        <FontAwesomeIcon
          className="icon"
          icon={faChevronLeft}
          style={{
            visibility: selectImg > 0 ? "visible" : "hidden",
          }}
          onClick={() => setSelectImg(selectImg - 1)}
        />
        <img src={imgList[selectImg]} alt={`img-${selectImg}`} />
        <FontAwesomeIcon
          className="icon"
          icon={faChevronRight}
          style={{
            visibility: selectImg < imgList.length - 1 ? "visible" : "hidden",
          }}
          onClick={() => setSelectImg(selectImg + 1)}
        />
      </DetailModal>
    </ModalWrapper>
  );
};

export default ImageModal;

const DetailModal = styled.div`
  display: flex;
  align-items: center;
  > .icon {
    color: white;
    font-size: 3rem;
    cursor: pointer;
    position: absolute;
    top: 50%;
    &:first-child {
      left: 6rem;
    }
    &:last-child {
      right: 6rem;
    }
  }
  > img {
    max-width: 50rem;
    max-height: 50rem;
  }
`;
