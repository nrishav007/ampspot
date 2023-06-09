import axios from "axios";
import {
  REGISTER_URL, 
  PLUG_URL,
  LOGIN_URL,
  PROFILE_URL,
} from "../constant/constants";

const register = async (userCredentials) => {
  const response = await axios.post(REGISTER_URL, userCredentials);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const login = async (userCredentials) => {
  const response = await axios.post(LOGIN_URL, userCredentials);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const setPlug = async (userPlug, accessToken) => {
  const response = await axios.post(PLUG_URL, userPlug, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

const setProfile = async (userProfile, accessToken) => {
  const response = await axios.post(PROFILE_URL, userProfile, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

const authService = {
  register,
  setPlug,
  setProfile,
  login,
};

export default authService;
