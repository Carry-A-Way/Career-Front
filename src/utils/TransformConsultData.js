export const transformConsultData = (consultData, target, isMentor = false) => {
  if (!!target) {
    return consultData.map((item) => ({
      ...item,
      id: item.consultId,
      title: item.status ? `멘토의\n예정된 상담` : `멘토의\n대기중인 상담`,
      start: new Date(item.startTime),
      end: new Date(item.endTime),
      status: item.status,
      target: "mentor",
    }));
  } else {
    return consultData.map((item) => ({
      ...item,
      id: item.consultId,
      title: isMentor
        ? `[${item.major}]\n${item.student.nickname}`
        : `[${item.major}]\n${item.mentor.nickname}`,
      start: new Date(item.startTime),
      end: new Date(item.endTime),
      status: item.status,
      target: null,
    }));
  }
};
