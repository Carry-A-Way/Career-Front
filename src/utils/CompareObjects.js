export const CompareObjects = (originData, editData) => {
  const differences = {};
  console.log("compare", originData, editData);
  Object.keys(originData).forEach((key) => {
    if (JSON.stringify(originData[key]) !== JSON.stringify(editData[key])) {
      console.log(originData[key], editData[key]);
      differences[key] = editData[key];
    }
  });

  return differences;
};
