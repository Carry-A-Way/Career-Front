import axios from "axios";
import { SV_LOCAL } from "../constants";
import { LOGIN } from "../settings/url";

export const handleLogin = async (id, password) => {
  try {
    const response = await axios.post(`${SV_LOCAL}/${LOGIN}`, {
      username: id,
      password: password,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
