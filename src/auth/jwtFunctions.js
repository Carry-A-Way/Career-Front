// jwt 토큰 decode
import { jwtDecode } from "jwt-decode";

export function decodeJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

export function isTokenExpired(token) {
  const decoded = decodeJwt(token);
  if (!decoded) return true;
  const now = Date.now().valueOf() / 1000;
  return typeof decoded.exp !== "undefined" && decoded.exp < now;
}

export function getIdFromToken(token) {
  const decoded = decodeJwt(token);
  if (!decoded || decoded.id === "undefined") return -1;
  return decoded.id;
}

export function getUsernameFromToken(token) {
  const decoded = decodeJwt(token);
  if (!decoded || decoded.sub === "undefined") return -1;
  return decoded.sub;
}

export function getNicknameFromToken(token) {
  const decoded = jwtDecode(token);
  if (!decoded || typeof decoded.nickname === "undefined") return -1;
  return decoded.nickname;
}
