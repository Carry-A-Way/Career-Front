import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, option = {}, expiresIn = null) => {
  const cookieOptions = {
    ...option,
  };
  if (!!expiresIn) {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + expiresIn);
    cookieOptions.expires = expires;
  }
  console.log("expires in : ", expiresIn);
  return cookies.set(name, value, cookieOptions);
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const deleteCookie = (name, option = {}) => {
  return cookies.remove(name, { ...option, expires: new Date(0) });
};
