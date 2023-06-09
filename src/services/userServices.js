import axios from "axios";
import {
  USER_URL,
  PROFIE_UPDATE_URL,
  PENDING_BOOKING_REQUEST_URL,
  ACCEPTED_BOOKING_REQUEST_URL,
  CREATE_DJ_URL,
  DJ_LIST_URL,
  DJ_OF_THE_WEEK_URL,
  DJ_DETAIL_URL,
  CREATE_BOOKING_URL,
  GET_USER_BOOKING,
  UPDATE_BOOKING_URL,
  CREATE_REVIEW_RATINGS,
  GET_RATINGS_REVIEW,
  CREATE_MESSAGE,
  GET_USER_MESSAGES_LIST,
  GET_DJ_MESSAGES_LIST,
  ALL_MESSAGES,
  UPDATE_MESSAGE_REACTION,
  GET_DJ_CALENDAR,
  DELETE_BOOKING_DJID,
  CREATE_DJ_OFF,
  SET_USER_SOUND_PREFERENCE,
  SEARCH_DJ,
  GET_DJ_GRAPH,
  UPDATE_PASSWORD,
} from "../constant/constants";

const getUser = async (currentUser) => {
  const response = await axios.get(USER_URL, {
    headers: {
      Authorization: `Bearer ${currentUser.data.token}`,
    },
  });
  return response.data;
};

const upateProfile = async (userProfile, accessToken) => {
  const response = await axios.post(PROFIE_UPDATE_URL, userProfile, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
const upateProfileImage = async (userProfileImage, accessToken) => {
  const response = await axios.post(PROFIE_UPDATE_URL, userProfileImage, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const updatePass = async (userPass, accessToken) => {
  const response = await axios.post(UPDATE_PASSWORD, userPass, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const getPendingRequest = async (accessToken) => {
  const response = await axios.get(PENDING_BOOKING_REQUEST_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const getAcceptedRequest = async (accessToken) => {
  const response = await axios.get(ACCEPTED_BOOKING_REQUEST_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const createDj = async (djProfile, accessToken) => {
  const response = await axios.post(CREATE_DJ_URL, djProfile, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
const getDjUsersList = async (accessToken) => {
  const response = await axios.get(DJ_LIST_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
const getUserDjOfTheWeek = async (accessToken) => {
  const response = await axios.get(DJ_OF_THE_WEEK_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const getDjUserById = async (djProfileId, accessToken) => {
  const response = await axios.get(`${DJ_DETAIL_URL}${djProfileId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const createDjBookingById = async (djProfile, accessToken) => {
  const response = await axios.post(CREATE_BOOKING_URL, djProfile, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const updateBookingStatus = async (bookingStatus, accessToken) => {
  const response = await axios.post(UPDATE_BOOKING_URL, bookingStatus, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const getUserDjsBookings = async (accessToken) => {
  const response = await axios.get(GET_USER_BOOKING, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const createRatingsReview = async (reviewAndRatings, accessToken) => {
  const response = await axios.post(CREATE_REVIEW_RATINGS, reviewAndRatings, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const getRagtingsReview = async (djId, accessToken) => {
  const response = await axios.get(`${GET_RATINGS_REVIEW}/${djId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const sendUserMessageToDj = async (messageToDj, accessToken) => {
  const response = await axios.post(CREATE_MESSAGE, messageToDj, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const getAllUserMessagesList = async (currentUserId, accessToken) => {
  const response = await axios.get(
    `${GET_USER_MESSAGES_LIST}/${currentUserId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

const getAllDjMessagesList = async (currentUserId, accessToken) => {
  const response = await axios.get(`${GET_DJ_MESSAGES_LIST}/${currentUserId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const getAllMessages = async (messages, accessToken) => {
  const response = await axios.post(ALL_MESSAGES, messages, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const updateCurrentUserReaction = async (updateReaction, accessToken) => {
  const response = await axios.post(UPDATE_MESSAGE_REACTION, updateReaction, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const getDjCalendarForUser = async (djId, accessToken) => {
  const response = await axios.get(`${GET_DJ_CALENDAR}/${djId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const getDjCalendarForDjUser = async (currentUserId, accessToken) => {
  const response = await axios.get(`${GET_DJ_CALENDAR}/${currentUserId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const deleteDjBooking = async (bookingId, accessToken) => {
  const response = await axios.get(`${DELETE_BOOKING_DJID}/${bookingId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const createDjOffBooking = async (djIdAndDate, accessToken) => {
  const response = await axios.post(CREATE_DJ_OFF, djIdAndDate, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const setUserSounds = async (sounds, accessToken) => {
  const response = await axios.post(SET_USER_SOUND_PREFERENCE, sounds, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const getFilterItems = async (fiterItems, accessToken) => {
  const response = await axios.post(SEARCH_DJ, fiterItems, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const getDjGraph = async (djId, accessToken) => {
  const response = await axios.get(`${GET_DJ_GRAPH}/${djId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

const userServices = {
  getUser,
  upateProfile,
  upateProfileImage,
  updatePass,
  getPendingRequest,
  getAcceptedRequest,
  createDj,
  getDjUsersList,
  getUserDjOfTheWeek,
  getDjUserById,
  createDjBookingById,
  getUserDjsBookings,
  updateBookingStatus,
  createRatingsReview,
  getRagtingsReview,
  sendUserMessageToDj,
  getAllUserMessagesList,
  getAllDjMessagesList,
  getAllMessages,
  updateCurrentUserReaction,
  getDjCalendarForUser,
  getDjCalendarForDjUser,
  deleteDjBooking,
  createDjOffBooking,
  setUserSounds,
  getFilterItems,
  getDjGraph,
};

export default userServices;
