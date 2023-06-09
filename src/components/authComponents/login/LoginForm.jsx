import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, reset } from "../../../reducers/authSlice";
import useLocalStorage from "../../../hooks/useLocalStorage";

const LoginForm = ({ setIsShow, setEamilResetPass }) => {
  const { email, setEmail, password, setPassword, isChecked, setIsChecked } =
    useLocalStorage();

  const [error, setError] = useState("");
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (isSuccess) {
      if (user) {
        if (user?.data?.user?.userType === "dj") {
          navigate("/dj-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }
    }
    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, dispatch, navigate]);

  const handleLoginForm = (e) => {
    e.preventDefault();
    //validating email and password
    const emailValidation = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (email.length === 0 || password.length === 0) {
      setError("This Email address/password is invalid");
      return;
    }
    if (emailValidation.test(email) === false) {
      setError("Invalid email address");
      return;
    }
    // if (password.length < 6) {
    //   setError("Password should be atleast 6 characters");
    //   return;
    // }
    const userCredentials = {
      email,
      password,
    };
    dispatch(loginUser(userCredentials));
    setError("");
  };
  const handleForgotPassword = () => {
    // validating email
    const emailValidation = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    if (email.length === 0) {
      setError("Please enter the email address");
      return;
    }
    if (emailValidation.test(email) === false) {
      setError("Invalid email address");
      return;
    }

    setIsShow(1);
    // include * to the end of the email before @
    let a = email.split("@");
    let b = a[0];
    let newStr = "";
    for (let i in b) {
      if (i > 3 && i <= b.length - 1) newStr += "*";
      else newStr += b[i];
    }
    const updatedEmail = newStr + "@" + a[1];
    setEamilResetPass(updatedEmail);
  };

  //handling remember me
  if (isChecked) {
    localStorage.setItem("check", isChecked);
    localStorage.setItem("email", email);
    localStorage.setItem("pass", password);
  } else if (!isChecked) {
    localStorage.removeItem("check");
    localStorage.removeItem("email");
    localStorage.removeItem("pass");
  }

  return (
    <div
      className="bg-white absolute 2xl:w-[33.438rem] w-[30rem] min-h-[38rem] max-lg:right-[0rem] 
      max-lg:max-w-[100%] max-sm:w-[100%] max-sm:h-[70%] max-sm:top-[-11rem]
      2xl:h-auto  overflow-auto 2xl:top-[-10.5rem] right-[2.313rem]  top-[-6rem] max-lg:top-[-5.5rem]
     text-black-darkest font-bold z-10 rounded-[50px] max-sm:rounded-none"
    >
      <div
        className="flex justify-center  flex-nowrap 2xl:mt-[5.5rem] mt-[1rem] mb-[.5rem]
       items-center  "
      >
        <h3 className="text-[3.188rem]  font-bold font-roboto p-0 text-black-darkest">
          AMP
        </h3>

        <div className="ml-[0.666rem]">
          <div
            className="w-[3.215rem] h-[3.169rem] flex flex-wrap justify-center 
            items-center relative text-2xl leading-[1.2em] font-normal bg-blue text-white"
          >
            <span className="absolute top-[0] tracking-widest">SP</span>
            <span className="absolute bottom-0 tracking-widest">OT</span>
          </div>
        </div>
      </div>

      <div className="w-[28.25rem] max-sm:w-[90%] mx-auto">
        <div>
          <p className="text-center text-black-dark font-normal text-[1.25rem]">
            Welcome back,
          </p>
          <h2 className="text-black-dark mt-4 2xl:text-[2.5rem] max-sm:text-[1.5rem] text-4xl text-center">
            Login To Your Profile
          </h2>
        </div>
        <div className=" 2xl:w-[360px] w-[95%]  mx-auto mt-[2.063rem] max-sm:mt-4">
          {error && (
            <div className="w-full font-normal text-red-light max-sm:text-sm text-center">
              {error}
            </div>
          )}
          <form className="w-full" onSubmit={handleLoginForm} method="POST">
            <div className="w-full mb-4">
              <label htmlFor="email" className="text-black-dark font-normal">
                Email <span className="text-red-light">*</span>
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="placeholder:font-normal border border-gray text-gray outline-none 
                rounded-3xl h-[3.125rem] pl-[24px] py-[15px] text-[0.875rem] w-full"
                type="text"
                placeholder="email"
                id="email"
                name="email"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-black-dark font-normal">
                Password <span className="text-red-light">*</span>
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="placeholder:font-normal border border-gray text-gray outline-none 
                rounded-3xl h-[3.125rem] pl-[1.5rem] py-[0.938rem] text-[0.875rem] w-full"
                type="Password"
                placeholder="password"
                id="password"
                name="password"
              />
            </div>
            <div className="flex flex-nowrap text-sm justify-between mt-4">
              <div className="space-x-1 flex flex-nowrap justify-between items-center">
                <input
                  onChange={() => setIsChecked(!isChecked)}
                  checked={isChecked}
                  className="checked:border-blue"
                  type="checkbox"
                  name="remember"
                  id="remember"
                />
                <label
                  className="cursor-pointer text-[0.875rem] font-normal"
                  htmlFor="remember"
                >
                  Remember me
                </label>
              </div>
              <div className="text-blue text-[0.875rem] underline font-normal">
                <span
                  className="cursor-pointer"
                  onClick={() => handleForgotPassword()}
                >
                  Forgot Password?
                </span>
              </div>
            </div>
            <button
              disabled={isLoading}
              className="w-full h-[3.125rem]
              rounded-3xl bg-blue text-center 2xl:mt-16 mt-4  mb-4 text-white"
            >
              {isLoading ? (
                <span>
                  <svg
                    role="status"
                    className="inline mr-3 w-8 h-8 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              ) : (
                "Login"
              )}
            </button>
            <button
              className="w-full h-[3.125rem] rounded-3xl 
              font-bold space-x-1 text-normal flex justify-center 
              items-center py-1 px-4 bg-purple-dark text-center text-white"
            >
              <img
                className="w-[1rem]"
                src="/assets/icons/google_icon.png"
                alt="google icon"
              />
              <span>Login with google</span>
            </button>
          </form>
          <span className="text-center block font-normal mt-8 mb-[0.781rem] 2xl:mb-[4.031rem] text-sm space-x-1">
            <span className="text-black-dark">New here?</span>
            <span>
              <Link to="/register" className="text-blue underline ">
                Register now
              </Link>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
