const BASE_URL = "https://api.ampspot.co";

// current user auth api's 
export const REGISTER_URL = `${BASE_URL}/api/user/register-user`;
export const LOGIN_URL = `${BASE_URL}/api/user/login-user`;
export const PLUG_URL = `${BASE_URL}/api/user/set-user-plug`;
export const PROFILE_URL = `${BASE_URL}/api/user/set-user-profile`;

// user and dj api's
export const USER_URL = `${BASE_URL}/api/user/get-user`;
export const PROFIE_UPDATE_URL = `${BASE_URL}/api/user/update-profile`;
export const PENDING_BOOKING_REQUEST_URL = `${BASE_URL}/api/booking/pending-decline-booking`;
export const ACCEPTED_BOOKING_REQUEST_URL = `${BASE_URL}/api/booking/accept-booking`;
export const CREATE_BOOKING_URL = `${BASE_URL}/api/booking/create-booking`;
export const UPDATE_BOOKING_URL = `${BASE_URL}/api/booking/update-booking-status`;
export const CREATE_DJ_URL = `${BASE_URL}/api/djOfWeek/create-dj-of-week`;
export const GET_USER_BOOKING = `${BASE_URL}/api/booking/get-user-booking`;
export const CREATE_REVIEW_RATINGS = `${BASE_URL}/api/booking/create-rating`;
export const GET_RATINGS_REVIEW = `${BASE_URL}/api/booking/get-dj-rating`;
export const DJ_LIST_URL = `${BASE_URL}/api/user/get-all-dj`;
export const DJ_DETAIL_URL = `${BASE_URL}/api/user/get-dj-detail/`;
export const DJ_OF_THE_WEEK_URL = `${BASE_URL}/api/djOfWeek/dj-of-week`;
export const CREATE_MESSAGE = `${BASE_URL}/api/message/create-message`;
export const ALL_MESSAGES = `${BASE_URL}/api/message/all-message`;
export const GET_USER_MESSAGES_LIST = `${BASE_URL}/api/message/get-user-message-list`;
export const GET_DJ_MESSAGES_LIST = `${BASE_URL}/api/message/get-dj-message-list`;
export const UPDATE_MESSAGE_REACTION = `${BASE_URL}/api/message/update-message-reaction`;
export const GET_DJ_CALENDAR = `${BASE_URL}/api/booking/get-dj-calendar`;
export const DELETE_BOOKING_DJID = `${BASE_URL}/api/booking/delete-booking`;
export const CREATE_DJ_OFF = `${BASE_URL}/api/booking/create-dj-off`;
export const SET_USER_SOUND_PREFERENCE = `${BASE_URL}/api/user/set-user-sound-preference`;
export const SEARCH_DJ = `${BASE_URL}/api/user/search-dj`;
export const GET_DJ_GRAPH = `${BASE_URL}/api/booking/get-dj-graph`;
export const UPDATE_PASSWORD = `${BASE_URL}/api/user/update-password`;
export const GET_PAYMENT_TOKEN= `${BASE_URL}/api/booking/process-booking`;
export const TRANSACTION_COMPLETE= `${BASE_URL}/api/booking/complete-transaction`;
export const GET_USER_TRANSACTION= `${BASE_URL}/api/booking/get-user-transaction`;
export const GET_DJ_TRANSACTION= `${BASE_URL}/api/booking/get-dj-transaction`;
export const POST_WAITLIST= `${BASE_URL}/api/user/create-waitlist`;   