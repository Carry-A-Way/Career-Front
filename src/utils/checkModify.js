export const checkModify = (created, updated) => {
  const createdAt = new Date(created);
  const updatedAt = new Date(updated);
  const createdAtSeconds = Math.floor(createdAt.getTime() / 1000);
  const updatedAtSeconds = Math.floor(updatedAt.getTime() / 1000);
  return createdAtSeconds !== updatedAtSeconds;
};
