import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SV_LOCAL } from "../../constants";
import { getCookie } from "../../cookie";
import { CommunityCategoryList } from "../../settings/config";
import { colors } from "../../styles/common/Theme";
import { WRITE_POST } from "../../api/api";
import { writePost } from "../../api/community";

const CommunityWrite = () => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState([]);
  const onChangeFiles = (e) => {
    let newFiles = [...files, ...e.target.files];
    if (newFiles.length > 6) {
      newFiles.splice(6);
    }
    setFiles(newFiles);
    const filesArray = Object.values(newFiles);
    const loadImageData = (files) => {
      const promises = files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(promises).then((imageDataArray) => {
        setImage([...imageDataArray]);
      });
    };

    loadImageData(filesArray);
  };
  const onDeleteFile = (fileName) => {
    setFiles(files.filter((file) => file !== fileName));
  };

  const [newPost, setNewPost] = useState({
    categoryId: "",
    title: "",
    content: "",
  });

  const navigate = useNavigate();

  const onEnterPost = async () => {
    try {
      const response = await writePost(newPost, files);
      if (response.status === 200) {
        window.alert("게시글이 등록되었습니다.");
        navigate("/community");
      } else {
        window.alert(response.data);
      }
    } catch (err) {
      console.error(err);
      window.alert("게시글 등록에 실패하였습니다.");
    }
  };

  return (
    <WriteLayout
      onSubmit={(e) => {
        e.preventDefault();
        onEnterPost();
      }}
    >
      <div className="write-menu">게시글 작성하기</div>
      <WriteWrapper>
        <div className="write-header">
          <select
            name="category-select"
            className="category-select"
            onChange={(e) => {
              setNewPost({ ...newPost, categoryId: e.target.value });
            }}
            required
          >
            <option value="">카테고리</option>
            {CommunityCategoryList.map((category, idx) => (
              <option value={idx} key={idx}>
                {category.title}
              </option>
            ))}
          </select>
          {/* {newPost.categoryId === "" && (
            <span className="category-select__info">
              카테고리를 선택하세요.
            </span>
          )} */}
          <span className="write-header__title">제목</span>
          <input
            type="text"
            className="write-header__input"
            placeholder="제목을 작성해 주세요."
            required
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
        </div>
        <div className="write-content">
          <textarea
            name="write-content__input"
            className="write-content__input"
            placeholder={`무슨 이야기를 나누고 싶으신가요? 가벼운 이야기부터 시작해 보세요!`}
            maxLength="500"
            required
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
          ></textarea>
          <div className="write-file">
            <input
              id="file"
              type="file"
              multiple
              className="write-file__input"
              onChange={(e) => onChangeFiles(e)}
              disabled={files.length >= 6 ? true : false}
            />
            <label
              htmlFor="file"
              style={{ cursor: files.length >= 6 ? "not-allowed" : "pointer" }}
            >
              파일 선택
            </label>
            <span>6개 파일 중 {files.length}개 선택</span>
            <div className="write-file-wrapper">
              <ul className="write-file__list-name">
                {files.map((file, idx) => (
                  <li key={idx}>
                    <span>{file.name}</span>
                    <img
                      src="/svg/close-black.svg"
                      alt="close-button"
                      onClick={() => {
                        onDeleteFile(file);
                        setImage(image.filter((file, index) => index !== idx));
                      }}
                    />
                  </li>
                ))}
              </ul>
              <ul className="write-file__list">
                {image.map((img, imgIdx) => (
                  <img
                    key={imgIdx}
                    src={img}
                    alt=""
                    className="write-file__img"
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </WriteWrapper>
      <UtilBox>
        <div className="util-item" onClick={() => window.history.back()}>
          <img src="/svg/arrow-left.svg" alt="back-button" />
          <span>뒤로</span>
        </div>
      </UtilBox>
      <button type="submit" className="write-submit">
        등록하기
      </button>
    </WriteLayout>
  );
};

export default CommunityWrite;

const WriteLayout = styled.form`
  width: 60rem;
  /* height: 85vh; */
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  .write-menu {
    font-size: 2rem;
    font-weight: 600;
    width: 100%;
    text-align: center;
  }
  .write-submit {
    width: 10rem;
    height: 3rem;
    margin: 0 auto;
    font-size: 1.4rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #516a8b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #2f5383;
    }
  }
`;
const WriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid gray;
  border-radius: 5px;
  overflow: hidden;
  .write-header {
    height: 4rem;
    background-color: #2f5383;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    position: relative;
    .category-select {
      width: 10rem;
      height: 2.3rem;
      text-align: center;
      background-color: #f5f5f5;
      border-radius: 5px;
      &__info {
        position: absolute;
        left: 4rem;
        top: 4rem;
        font-size: 1rem;
        color: red;
      }
    }
    &__title {
      font-size: 1.7rem;
      font-weight: 500;
    }
    &__input {
      width: 60%;
      border: 1px solid gray;
      border-radius: 5px;
      padding: 0.5rem;
      box-sizing: border-box;
      font-size: 1.1rem;
      &::placeholder {
        text-align: center;
      }
    }
  }
  .write-content {
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    gap: 2rem;
    &__input {
      width: 90%;
      height: 25rem;
      border: 1px solid gray;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      font-size: 1.1rem;
      &::placeholder {
        text-align: center;
        line-height: 25rem;
      }
    }
  }
  .write-file {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    &__input {
      display: none;
      font-size: 1.2rem;
    }
    > label {
      font-size: 1.2rem;
      border: 1px solid gray;
      padding: 0.3rem 1rem;
    }
    &-wrapper {
      display: flex;
      gap: 2rem;
    }
    &__list {
      list-style: none;
      padding: 0;
      display: flex;
      gap: 1rem;
      font-size: 1.2rem;
      flex: 1;
      flex-wrap: wrap;
      .write-file__img {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
      }
    }
    &__list-name {
      display: flex;
      flex-direction: column;
      max-height: 10rem;
      overflow-y: auto;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        span {
          width: 17rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        img {
          width: 1rem;
        }
      }
    }
  }
`;

const UtilBox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 2rem;
  left: 3rem;
  .util-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 1px solid black;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    padding: 0.7rem;
    font-size: 1rem;
    background-color: ${colors.primaryBlue};
    color: white;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    img {
      width: 0.8rem;
    }
  }
`;
