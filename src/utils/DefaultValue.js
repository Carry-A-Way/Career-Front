import { DefaultImg } from "../settings/config";

export const setDefaultImage = (image) => {
  return image || DefaultImg;
};
