export const DefaultImg =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
export const CommunityMenu = ["전체보기", "카테고리", "활동 내역"];
export const CommunityMenuLinkList = [
  "/community",
  "/community/category",
  "/community/activity",
];

// mentor/consult
export const MentorConsultMenu = [
  "전체보기",
  "예정된 상담",
  "완료된 상담",
  "취소한 상담",
];
export const MentorConsultLinkList = [
  "/mentor/consult",
  "/mentor/consult/upcoming",
  "/mentor/consult/completed",
  "/mentor/consult/cancel",
];

// mentee/mentor
export const MenteeMentorMenu = ["멘토 추천", "멘토 찾기", "내 멘토"];
export const MenteeMentorLinkList = [
  "/mentee/mentor",
  "/mentee/mentor/find",
  "/mentee/mentor/my-mentors",
];

// export const CommunityCategoryList = [
//   "진로",
//   "성적",
//   "입시",
//   "일상",
//   "공부법",
//   "수업",
//   "생활기록부",
//   "기타",
// ];

export const CommunityCategoryList = [
  {
    title: "진로",
    info: "진로 관련된 상담이 필요한 게시글입니다.",
    content:
      "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
  },
  {
    title: "성적",
    info: "성적 관련된 상담이 필요한 게시글입니다.",
    content:
      "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
  },
  {
    title: "입시",
    info: "공부 관련된 상담이 필요한 게시글입니다.",
    content:
      "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
  },
  {
    title: "일상",
    info: "일상 관련된 상담이 필요한 게시글입니다.",
    content:
      "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
  },
  {
    title: "공부법",
    info: "공부법 관련된 상담이 필요한 게시글입니다.",
    content:
      "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
  },
  {
    title: "수업",
    info: "수업 관련된 상담이 필요한 게시글입니다.",
    content:
      "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
  },
  {
    title: "생활기록부",
    info: "생활기록부 관련된 상담이 필요한 게시글입니다.",
    content:
      "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
  },
  {
    title: "기타",
    info: "기타 상담이 필요한 게시글입니다.",
    content:
      "부모님과 희망 학과가 달라서 갈등이 있습니다. 어떻게 해결하면 좋을지 도와주세요.",
  },
];

export const Review = [
  {
    id: 0,
    writer: "신종민",
    content: "멘토님 너무 친절하고 재밌으셔서 시간 가는 줄 몰랐습니다.",
    score: 5,
  },
  {
    id: 1,
    writer: "한재준",
    content: "상담비가 전혀 아깝지 않을 정도로 열정적이세요.",
    score: 5,
  },
  {
    id: 2,
    writer: "채희문",
    content:
      "멘토님은 정말 좋으세요. 하지만 사전질문에 대한 답변을 듣지 못해 아쉬웠어요. 다음 상담을 기대해보겠습니다!",
    score: 4,
  },
];

export const FAQ = [
  {
    question: "상담은 어떻게 진행되나요?",
    answer: "줌을 통한 비대면 상담으로 진행됩니다.",
  },
  {
    question: "상담시간은 얼마나 걸리나요?",
    answer: "20분, 40분 중에 선택하여 상담할 수 있습니다.",
  },
  {
    question: "이른 아침 상담이나 새벽 상담도 가능한가요?",
    answer:
      "제 상담 가능시간은 보통 저녁시간이지만 매월 마지막주는 모든 시간대를 상담 가능 시간으로 열어두고 있습니다.",
  },
];
export const RecommendMentors = [
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
];

export const TotalRecommendMentors = [
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
];

export const PopularMentors = [
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
];

export const TotalPopularMentors = [
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
];

export const TotalMentors = [
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
  {
    name: "김성애",
    age: 20,
    schoolList: [
      {
        schoolName: "한양",
        schoolType: "대학교",
        majorName: "컴퓨터소프트웨어학부",
        state: "졸업",
      },
    ],
    consultMajor1: "컴퓨터공학과",
    consultMajor2: "심리학과",
    profileImg:
      "https://profileImg.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  },
  {
    name: "신종민",
    age: 21,
    schoolList: [
      {
        schoolName: "고려",
        schoolType: "대학교",
        majorName: "물리학과",
        state: "재학중",
      },
    ],
    consultMajor1: "물리학과",
    consultMajor2: "철학과",
    profileImg:
      "https://profileImg.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
  },
  {
    name: "한재준",
    age: 22,
    schoolList: [
      {
        schoolName: "연세",
        schoolType: "대학교",
        majorName: "천문학과",
        state: "졸업예정",
      },
    ],
    consultMajor1: "천문학과",
    consultMajor2: "우주과학과",
    profileImg:
      "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
  },
  {
    name: "채희문",
    age: 23,
    schoolList: [
      {
        schoolName: "서울",
        schoolType: "대학교",
        majorName: "화학과",
        state: "재학중",
      },
    ],
    consultMajor1: "화학과",
    consultMajor2: "화학공학과",
    consultMajor2: "물리학과",
    profileImg: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
  },
];
