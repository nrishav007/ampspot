import { useEffect } from "react";
import { getCurrentUser } from "../reducers/userSlice";
import { useDispatch, useSelector } from "react-redux/es/exports";

const useProfileImage = () => {
  const { currentUser } = useSelector((state) => state.currentUser);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // const base64String = btoa(
  //   String.fromCharCode(...new Uint8Array(currentUser?.data?.profileImage.data))
  // );
  // const userImage = `data:image/png;base64,${base64String}`;
  const userImage = currentUser?.data?.profileImage;
  useEffect(() => {
    if (user) {
      dispatch(getCurrentUser(user));
    }
  }, [user, dispatch]);
  return { userImage };
};

export default useProfileImage;
