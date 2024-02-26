import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFull } from "@fortawesome/free-solid-svg-icons";
import { dateParse, middleNameParse } from "../../utils/ParseFormat";

const ReviewList = ({ review }) => {
  const scoreToStar = (score) => {
    const scoreList = [];
    for (var i = 0; i < Number(score); i++) {
      scoreList.push(<FontAwesomeIcon key={`full_${i}`} icon={faStarFull} />);
    }
    for (var j = 0; j < 5 - Number(score); j++) {
      scoreList.push(<FontAwesomeIcon key={`empty_${i}`} icon={faStar} />);
    }
    return scoreList;
  };

  const averageScore = () => {
    var sum = 0;
    for (var i = 0; i < review.length; i++) {
      sum += review[i].rate;
    }
    return Math.round((sum / review.length) * 10) / 10;
  };
  return (
    <ReviewTable>
      <thead>
        <tr>
          <th>총 리뷰: {review.length} 개 </th>
          <th></th>
          <th>평점 : {averageScore()}점</th>
        </tr>
      </thead>
      <tbody>
        {review.map((item) => (
          <tr key={item.id}>
            <td>{item.comment}</td>
            {/* <td>{middleNameParse(item.writer)}</td> */}
            <td>{dateParse(item.createdAt)}</td>
            <td>{scoreToStar(item.rate)}</td>
          </tr>
        ))}
      </tbody>
    </ReviewTable>
  );
};

export default ReviewList;

const ReviewTable = styled.table`
  font-size: 1.1rem;
  width: 50rem;
  border-collapse: collapse;
  margin: 20px 0;
  td {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    min-height: 2rem;
    padding: 10px 0;
  }
  th {
    text-align: start;
  }
  td:nth-child(1) {
    width: 60%;
  }
  td:nth-child(2) {
    width: 20%;
    text-align: center;
  }
  td:nth-child(3),
  th:nth-child(3) {
    width: 20%;
    text-align: center;
  }
`;
