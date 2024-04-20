import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SV_LOCAL } from "../../constants";
import { getCookie } from "../../cookie";
import { dateParse } from "../../utils/ParseFormat";
import { CommunityCategoryList } from "../../settings/config";
import ImageModal from "../../components/Modal/ImageModal";
import UtilBox from "../../components/Box/UtilBox";
import CommentInput from "../../components/Input/CommentInput";
import CommentList from "../../components/List/CommentList";
import OptionButton from "../../components/Button/OptionButton";
import ProfileImage from "../../components/Image/ProfileImage";
import { useQuery } from "react-query";
import { fetchPostDetail } from "../../api/fetchPost";
import { onAddHeart, onDeleteHeart } from "../../api/heartPost";

const PostDetail = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const [postUserId, setPostUserId] = useState();
  const [updatePost, setUpdatePost] = useState(true);

  const [editPostContent, setEditPostContent] = useState(false);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [editRecommentContent, setEditRecommentContent] = useState(false);

  const postInputRef = useRef(null);

  const [activeOptionId, setActiveOptionId] = useState(null);

  const [files, setFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [image, setImage] = useState([]);
  const [newImage, setNewImage] = useState([]);
  const [removeImg, setRemoveImg] = useState([]);

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectImg, setSelectImg] = useState("");

  const onChangeFiles = (e) => {
    let tmpFiles = [...newFiles, ...e.target.files];
    if (tmpFiles.length > 6) {
      tmpFiles.splice(6);
    }
    setNewFiles(tmpFiles);
    // console.log("tmp file ", tmpFiles);
    const filesArray = Object.values(tmpFiles);
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
        setNewImage([...imageDataArray]);
      });
    };

    loadImageData(filesArray);
  };
  const onDeleteFile = (fileName) => {
    setNewFiles(newFiles.filter((file) => file !== fileName));
  };

  const onEditPostContent = () => {
    const formData = new FormData();
    formData.append(
      "json",
      JSON.stringify({
        id: post.id,
        categoryId: post.categoryId,
        title: post.title,
        content: post.content,
        removedImageUrls: removeImg,
      })
    );
    if (Array.isArray(image)) {
      newFiles.forEach((file) => formData.append("images", file));
    } else {
      formData.append("images", newFiles);
    }
    axios
      .post(`${SV_LOCAL}/community/article/modify`, formData, {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setEditPostContent(false);
        setUpdatePost(true);
      });
  };

  const { data } = useQuery(
    ["postDetail", id, updatePost],
    () => fetchPostDetail(id),
    {
      onSuccess: (data) => {
        setPost(data.article || {});
        setComments(data.comments || []);
        setPostUserId(data.article?.user?.id || "");
        setImage([...data.article.imgs]);
        const fileName = [];
        for (let idx = 0; idx < data.article.imgs.length; idx++) {
          fileName.push({ name: `기존 이미지${idx + 1}` });
        }
        setFiles([...fileName]);
        setNewFiles([]);
        setNewImage([]);
        setRemoveImg([]);
        setUpdatePost(false);
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <Form>
        {editPostContent ? (
          <Post
            img={post.img || ""}
            onSubmit={(e) => {
              e.preventDefault();
              onEditPostContent();
            }}
          >
            <header>
              <select
                name="category-select"
                className="category-select"
                value={post.categoryId} //
                onChange={(e) => {
                  setPost({ ...post, categoryId: e.target.value });
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
              <span className="post-header__title">제목</span>
              <input
                type="text"
                className="post-header__input"
                placeholder="제목을 작성해 주세요."
                value={post.title}
                required
                onChange={(e) => setPost({ ...post, title: e.target.value })}
              />
            </header>
            <main style={{ padding: "2rem 3rem" }}>
              <textarea
                className={
                  editPostContent
                    ? "post-content post-content-write"
                    : "post-content"
                }
                required
                value={post.content}
                disabled={!editPostContent}
                ref={postInputRef}
                onChange={(e) => {
                  setPost({ ...post, content: e.target.value });
                }}
              />
            </main>
            <div className="write-file">
              <input
                id="file"
                type="file"
                multiple
                accept="image/*"
                className="write-file__input"
                onChange={(e) => onChangeFiles(e)}
                disabled={files.length + newFiles.length >= 6 ? true : false}
              />
              <label
                htmlFor="file"
                style={{
                  cursor:
                    files.length + newFiles.length >= 6
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                파일 선택
              </label>
              <span>6개 파일 중 {files.length + newFiles.length}개 선택</span>
              <div className="write-file-wrapper">
                <ul className="write-file__list-name">
                  {files.map((file, idx) => (
                    <li key={idx}>
                      <span>{file.name}</span>
                      <img
                        src="/svg/close-black.svg"
                        alt="close-button"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          // onDeleteFile(file);
                          setFiles(files.filter((item) => item !== file));
                          setRemoveImg((prev) => [...prev, image[idx]]);
                          setImage(
                            image.filter((file, index) => index !== idx)
                          );
                        }}
                      />
                    </li>
                  ))}
                  {newFiles.map((file, idx) => (
                    <li key={idx}>
                      <span>{file.name}</span>
                      <img
                        src="/svg/close-black.svg"
                        alt="close-button"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          onDeleteFile(file);
                          setNewImage(
                            newImage.filter((file, index) => index !== idx)
                          );
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
                  {newImage.map((img, imgIdx) => (
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
            <footer>
              <div
                className="button"
                style={{ margin: "0" }}
                onClick={() => {
                  setUpdatePost(true);
                  setEditPostContent(false);
                }}
              >
                취소
              </div>
              <button type="submit">등록</button>
            </footer>
          </Post>
        ) : (
          <>
            <Post img={post.img || ""}>
              <header>
                <div className="post-header__title">
                  [{CommunityCategoryList[post.categoryId]?.title}] {post.title}
                </div>
                <OptionButton
                  idx={postUserId}
                  item={post}
                  setEditContent={setEditPostContent}
                  inputRef={postInputRef}
                  checkId={postUserId}
                  option="게시글"
                  ids={{ postId: post.id }}
                  activeOptionId={activeOptionId}
                  setActiveOptionId={setActiveOptionId}
                  setUpdate={setUpdatePost}
                />
              </header>
              <main>
                <div className="post-main-info">
                  <ProfileImage profileImg={post.user?.profileImg} />
                  <span className="post-main-info__name">
                    {post.user?.nickname || ""} (
                    {post.user?.isTutor ? "멘토" : "멘티"})
                  </span>
                </div>
                <div className="post-date">
                  작성일 {dateParse(post.createdAt)}
                  {post.createdAt !== post.updatedAt ? " (수정됨)" : ""}
                </div>
                <textarea
                  className={"post-content"}
                  value={post.content}
                  disabled={!editPostContent}
                  ref={postInputRef}
                  onChange={(e) => {
                    setPost({ ...post, content: e.target.value });
                  }}
                />
                <div className="write-file-wrapper">
                  <ul className="write-file__list">
                    {image.map((img, imgIdx) => (
                      <img
                        key={imgIdx}
                        src={img}
                        alt=""
                        className="write-file__img"
                        onClick={() => {
                          setImageModalOpen(true);
                          setSelectImg(imgIdx);
                        }}
                      />
                    ))}
                  </ul>
                </div>
              </main>

              <footer>
                {post.isHeartClicked ? (
                  <FontAwesomeIcon
                    icon={faHeartFull}
                    className="icon heart-full"
                    onClick={() => {
                      onDeleteHeart(0, post.id); //게시글은 type 0
                      setUpdatePost(true);
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="icon"
                    onClick={() => {
                      onAddHeart(0, post.id); //게시글은 type 0
                      setUpdatePost(true);
                    }}
                  />
                )}
                <span>{post.heartCnt}</span>
                <FontAwesomeIcon icon={faMessage} className="icon" />
                <span>{post.commentCnt}</span>
              </footer>
            </Post>
            <CommentWrapper>
              <div
                style={{
                  fontSize: "1.35rem",
                  fontWeight: "500",
                  margin: "1rem 0",
                  width: "100%",
                  textAlign: "start",
                }}
              >
                댓글 ({post.commentCnt})
              </div>
              <CommentList
                comments={comments}
                setComments={setComments}
                editCommentContent={editCommentContent}
                setEditCommentContent={setEditCommentContent}
                setUpdate={setUpdatePost}
                setEditRecommentContent={setEditRecommentContent}
                editRecommentContent={editRecommentContent}
                activeOptionId={activeOptionId}
                setActiveOptionId={setActiveOptionId}
              />
              <CommentInput setUpdate={setUpdatePost} />
            </CommentWrapper>
          </>
        )}

        <UtilBox />
      </Form>
      {imageModalOpen && (
        <ImageModal
          setModalOpen={setImageModalOpen}
          selectImg={selectImg}
          setSelectImg={setSelectImg}
          imgList={image}
        />
      )}
    </>
  );
};

export default PostDetail;

const Form = styled.div`
  display: flex;
  margin: 8rem 0;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  footer button,
  footer .button {
    width: 5rem;
    height: 2.5rem;
    align-items: center;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 1.5rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    &:hover {
      font-weight: 600;
      background-color: #e9e9e9;
    }
  }
  button[type="submit"] {
    width: 5rem;
    height: 2.5rem;
    align-items: center;
    background-color: #516a8b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 1.5rem;
    font-size: 1.2rem;
    &:hover {
      background-color: #2f5383;
    }
  }
`;

const Post = styled.form`
  width: 60rem;
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  > header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    background-color: #2f5383;
    color: white;
    position: relative;
    height: 2rem;
    gap: 2rem;
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
    .post-header__title {
      font-size: 1.4rem;
      font-weight: 600;
    }
    .post-header__input {
      width: 60%;
      border: 1px solid gray;
      border-radius: 5px;
      padding: 0.5rem;
    }
  }
  > main {
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem 0;
    gap: 0.5rem;
    position: relative;

    .post-date {
      position: absolute;
      top: 1.7rem;
      right: 2rem;
      font-size: 1.2rem;
    }
    .post-main-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      &__name {
        font-size: 1.2rem;
        font-weight: 600;
      }
    }
    .post-content {
      font-size: 1.2rem;
      line-height: 2.5rem;
      border: none;
      background-color: transparent;
      color: black;
      resize: none;
    }
    .post-content-write {
      min-height: 25rem;
      vertical-align: top;
      align-items: start;
      border: 1px solid gray;
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
        cursor: pointer;
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
  > footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 4rem;
    padding: 0 1rem;
    box-sizing: border-box;
    color: #646464;
    gap: 0.5rem;
    .icon {
      font-size: 1.4rem;
      cursor: pointer;
    }
    span {
      font-size: 1.2rem;
      margin-right: 1rem;
    }
  }
`;

const CommentWrapper = styled.div`
  width: 60rem;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1rem;
`;
