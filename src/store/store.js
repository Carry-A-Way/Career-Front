import { configureStore } from "@reduxjs/toolkit";
import isMentorReducer from "./isMentorSlice";
import isLoginReducer from "./isLoginSlice";
import kakaoInfoReducer from "./kakaoInfoSlice";
export default configureStore({
  reducer: {
    isMentor: isMentorReducer,
    isLogin: isLoginReducer,
    kakaoInfo: kakaoInfoReducer,
  },
});
