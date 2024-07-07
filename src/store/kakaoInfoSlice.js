import { createSlice } from "@reduxjs/toolkit";

export const kakaoInfoSlice = createSlice({
  name: "oauthInfo",
  initialState: {
    code: "",
    ageRange: "",
    ageRangeNeedsAgreement: false,
    birthday: "",
    birthdayNeedsAgreement: false,
    birthdayType: "",
    email: "",
    emailNeedsAgreement: false,
    gender: "",
    genderNeedsAgreement: false,
    hasAgeRange: false,
    hasBirthday: false,
    hasEmail: false,
    hasGender: false,
    isEmailValid: false,
    isEmailVerified: false,
    profile: {
      nickname: "",
      thumbnailImageUrl: "",
      profileImageUrl: "",
      isDefaultImage: false,
      isDefaultNickname: false,
    },
    profileImageNeedsAgreement: false,
    profileNicknameNeedsAgreement: false,
  },
  reducers: {
    setKakaoInfo: (state, action) => {
      return action.payload;
    },
  },
});

export const { setKakaoInfo } = kakaoInfoSlice.actions;

export default kakaoInfoSlice.reducer;
